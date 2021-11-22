import { createToken } from '../libs/token';
import { users } from './mocks';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const MOCK_DATA_DELAY = 300;

function getAuthUser(dbUser) {
  return {
    id: dbUser.id,
    name: dbUser.name,
    userName: dbUser.userName,
    profileImageUrl: dbUser.profileImageUrl,
  };
}

export default {
  Query: {
    async users() {
      await sleep(MOCK_DATA_DELAY);

      return users;
    },
    async user(_, { userName }) {
      await sleep(MOCK_DATA_DELAY);

      return users.find((user) => user.userName === userName);
    },
  },
  Mutation: {
    async signin() {
      await sleep(MOCK_DATA_DELAY);
      const user = getAuthUser(users[0]);
      const token = createToken(user);

      return {
        user,
        token,
      };
    },
    async signup(_, { email, password, name, userName }) {
      await sleep(MOCK_DATA_DELAY);

      if (
        users.find(
          (user) =>
            user.userName.toLowerCase() === userName.trim().toLowerCase(),
        )
      ) {
        throw Error('This username is already taken');
      }

      if (
        users.find(
          (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
        )
      ) {
        throw Error('User with this email is already registered');
      }

      const id = users.length + 1;
      const profileImageUrl = `https://eu.ui-avatars.com/api/?size=128&name=${encodeURIComponent(
        name.trim(),
      )}`;

      const dbUser = {
        id,
        name: name.trim(),
        userName: userName.trim(),
        email: email.trim(),
        profileImageUrl,
      };

      const user = getAuthUser(dbUser);
      const token = createToken(user);

      users.push(dbUser);

      return { user, token };
    },
  },
  User: {
  },
};
