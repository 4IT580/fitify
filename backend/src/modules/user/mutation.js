import * as argon2 from 'argon2';
import { createToken } from '../../libs/token';
import { sendMail } from '../../libs/mailer';

export const signin = async (_, { email, password }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `SELECT * FROM user WHERE email = ? AND active = 1`,
    [email],
  );
  const user = dbResponse[0];

  if (user === undefined) {
    //user does not exist
    throw Error('Incorrect credentials');
  }

  if (await argon2.verify(user.password, password)) {
    const token = createToken({ id: user.id });
    return {
      user: { ...user },
      token,
    };
  }

  throw Error('Incorrect credentials');
};

export const signup = async (
  _,
  { name, surname, email, password, height, weight, sex, birthdate, appOrigin },
  { dbConnection, mailer },
) => {
  const userByEmail = (
    await dbConnection.query(`SELECT * FROM user WHERE email = ?`, [email])
  )[0];

  if (userByEmail) {
    throw new Error('Email already registered');
  }

  const passwordHash = await argon2.hash(password);

  const argonResponse = await argon2.hash(Date.now().toString());
  const userActivateHash = argonResponse.substr(argonResponse.length - 10);
  const goToUrl = appOrigin + '/auth/activate/?__token=' + userActivateHash;

  await dbConnection.query(
    `INSERT INTO user (name, surname, email, password, role, active, activationHash, height, weight, sex, birthdate)
    VALUES (?, ?, ?, ?, 'user', 0, ?, ?, ?, ? ,?);`,
    [
      name,
      surname,
      email,
      passwordHash,
      userActivateHash,
      height,
      weight,
      sex,
      birthdate,
    ],
  );

  const info = await sendMail(
    mailer,
    email,
    'Fitify aktivace účtu',
    'For account activation go to ' + goToUrl,
  );
  return true;
};

export const forgottenPassword = async (
  _,
  { email, appOrigin },
  { dbConnection, mailer },
) => {
  const userByUserName = (
    await dbConnection.query(`SELECT * FROM user WHERE email = ?`, [email])
  )[0];

  if (userByUserName === undefined) {
    //user does not exist, no need to send email
    throw Error('User does not exist');
  }

  const argonResponse = await argon2.hash(Date.now().toString());
  const lostPasswordHash = argonResponse.substr(argonResponse.length - 10);
  const goToUrl =
    appOrigin + '/auth/reset-password/?__token=' + lostPasswordHash;

  await dbConnection.query(
    `UPDATE user SET lostPasswordHash = ? WHERE id = ?`,
    [lostPasswordHash, userByUserName.id],
  );

  const info = await sendMail(
    mailer,
    userByUserName.email,
    'Fitify reset hesla',
    'For password reset go to ' + goToUrl,
  );

  return true;
};

export const resetPassword = async (
  _,
  { newPassword, passwordToken },
  { dbConnection, mailer },
) => {
  let user = (
    await dbConnection.query(`SELECT * FROM user WHERE lostPasswordHash = ?`, [
      passwordToken,
    ])
  )[0];

  if (user === undefined) {
    //user does not exist, no need to send email
    throw Error('Invalid request');
  }

  const token = createToken({ id: user.id });

  let argonHash = await argon2.hash(newPassword);
  await dbConnection.query(
    `UPDATE user SET password = ?,lostPasswordHash = ? WHERE id = ?`,
    [argonHash, null, user.id],
  );
  return {
    user: { ...user },
    token,
  };
};

export const activateUser = async (
  _,
  { activateToken },
  { dbConnection, mailer },
) => {
  let user = (
    await dbConnection.query(
      `SELECT * FROM user WHERE activationHash = ? AND active = ?`,
      [activateToken, false],
    )
  )[0];

  if (user === undefined) {
    return false;
  }

  await dbConnection.query(
    `UPDATE user SET active = ?, activationHash = ? WHERE id = ?`,
    [true, null, user.id],
  );

  return true;
};
