import * as argon2 from 'argon2';
import { createToken } from '../../libs/token';
import { user } from "./query";

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

export const forgottenPassword = async (_, {email}, {dbConnection, mailer}) => {
  const userByUserName = (await dbConnection.query(`SELECT * FROM user WHERE email = ?`, [email]))[0];

  if (userByUserName === null) {
    //user does not exist, no need to send email
    throw new Error('user does not exist');
  }

  let info = await mailer.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "mico00@vse.cz.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  })

  console.log("Message sent: %s", info.messageId);

  throw new Error(JSON.stringify(userByUserName));
};
