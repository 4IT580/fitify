import * as argon2 from 'argon2';
import { createToken } from '../../libs/token';
import { sendMail } from '../../libs/mailer';

export const signin = async (_, { email, password }, { dbConnection }) => {
  const dbResponse = await dbConnection.query(
    `SELECT * FROM user WHERE email = ?`,
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
  {
    email,
    password,
    name,
    userName,
    profileImageUrl = 'http://mrmrs.github.io/photos/p/1.jpg',
  },
  { dbConnection },
) => {
  const userByUserName = (
    await dbConnection.query(`SELECT * FROM user WHERE userName = ?`, [
      userName,
    ])
  )[0];

  if (userByUserName) {
    throw new Error('Username already taken');
  }

  const userByEmail = (
    await dbConnection.query(`SELECT * FROM user WHERE email = ?`, [email])
  )[0];

  if (userByEmail) {
    throw new Error('Email already registered');
  }

  const passwordHash = await argon2.hash(password);

  const dbResponse = await dbConnection.query(
    `INSERT INTO user (id, email, password, name, userName, profileImageUrl) 
    VALUES (NULL, ?, ?, ?, ?, ?);`,
    [email, passwordHash, name, userName, profileImageUrl],
  );

  const token = createToken({ id: dbResponse.insertId });

  const userObject = {
    id: dbResponse.insertId,
    email,
    name: name,
    userName: userName,
    profileImageUrl: profileImageUrl,
  };

  return { user: userObject, token: token };
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
  { token, newPassword },
  { dbConnection, mailer },
) => {
  let user = (
    await dbConnection.query(`SELECT * FROM user WHERE lostPasswordHash = ?`, [
      token,
    ])
  )[0];

  if (user === undefined) {
    //user does not exist, no need to send email
    throw Error('Invalid request');
  }

  let argonHash = await argon2.hash(newPassword);
  await dbConnection.query(`UPDATE user SET password = ?,lostPasswordHash = ? WHERE id = ?`, [
    argonHash,
    null,
    user.id,
  ]);

  const token = createToken({ id: user.id });
    return {
      user: { ...user },
      argonHash,
    };
};
