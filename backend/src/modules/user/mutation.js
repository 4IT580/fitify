import * as argon2 from 'argon2';
import { createToken } from '../../libs/token';
import { sendMail } from '../../libs/mailer';

export const signin = async (_, { email, password }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `SELECT * FROM user WHERE email = ? AND active = 1`,
    [email],
  );
  const user = dbResponse[0];
  const token = createToken({ id: user.id });

  if (await argon2.verify(user.password, password)) {
    const token = createToken({ id: user.id });
    return {
      user: { ...user },
      token,
    };
  }
};

export const signup = async (
  _,
  { name, surname, email, password, height, weight, sex, birthdate },
  { dbConnection },
) => {
  console.log(name);
  const userByEmail = (
    await dbConnection.query(`SELECT * FROM user WHERE email = ?`, [email])
  )[0];

  if (userByEmail) {
    throw new Error('Email already registered');
  }

  const passwordHash = await argon2.hash(password);

  const dbResponse = await dbConnection.query(
    `INSERT INTO user (name, surname, email, password, role, active, height, weight, sex, birthdate)
    VALUES (?, ?, ?, ?, 'user', 1, ?, ?, ? ,?);`,
    [name, surname, email, passwordHash, height, weight, sex, birthdate],
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

  let argonResponse = await argon2.hash(Date.now().toString());
  let lostPasswordHash = argonResponse.substr(argonResponse.length - 10);
  let goToUrl = appOrigin + '/auth/reset-password/?__token=' + lostPasswordHash;

  await dbConnection.query(
    `UPDATE user SET lostPasswordHash = ? WHERE id = ?`,
    [lostPasswordHash, userByUserName.id],
  );

  let info = await sendMail(
    mailer,
    userByUserName.email,
    'Fitify reset hesla',
    'For password reset go to ' + goToUrl,
  );

  console.log('Message sent: %s', info.messageId);

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

  const token = createToken({ id:
    user.id
     });

  let argonHash = await argon2.hash(newPassword);
  await dbConnection.query(`UPDATE user SET password = ?,lostPasswordHash = ? WHERE id = ?`, [
    argonHash,
    null,
    user.id,
  ]);
  console.log(user);
  return {
    user: { ...user },
    token,
  };
};
