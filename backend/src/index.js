import dotenv from 'dotenv-flow';
import express from 'express';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { getConnection } from './libs/connection';

import rootResolver from './modules/rootResolver';
import mockResolver from './__mocks__/mockResolver';

dotenv.config();

const MOCKS = process.env.MOCKS === 'false';

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    surname: String!
    email: String!
    password: String!
    role: UserRole!
    active: Boolean!
    height: Int!
    weight: Int!
    sex: UserSex!
    birthdate: String!
    lostPasswordHash: String!
    lastLoginAt: String!
    createdAt: String!
  }

  type WorkoutPlan {
    id: Int!
    name: String!
    rounds: Int!
    intervalLength: Int!
    intervalPauseLength: Int!
    roundsPauseLength: Int!
    wourkoutLength: Int!
    createdAt: String!
  }

  type WorkoutHistory {
    id: Int!
    calories: Int!
    status: WorkoutHistoryStatus!
    start_at: String!
    end_at: String!
  }

  type Excercise {
    id: Int!
    name: String!
    description: String!
  }

  type BodyPart{
    id: Int!
    name: String!
  }

  type Equipment {
  id: Int!
  name: String!
  }

  type AuthUser {
    id: Int!
    name: String!
    userName: String!
    profileImageUrl: String
  }

  type AuthInfo {
    user: AuthUser!
    token: String!
  }

  type Query {
    users: [User!]!
    user(userName: String!): User
  }

  type Mutation {
    signin(email: String!, password: String!): AuthInfo!

    signup(
      email: String!
      password: String!
      name: String!
      userName: String!
      profileImageUrl: String
    ): AuthInfo!
  }

  enum UserRole{
    admin
    user
  }
  enum UserSex{
    M
    F
  }
  enum WorkoutHistoryStatus{
    active
    finished
  }
`;

const main = async () => {
  const app = express();

  app.disable('x-powered-by');
  app.use(cors());

  const dbConnection = MOCKS ? null : await getConnection();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: MOCKS ? mockResolver : rootResolver,
    context: async ({ req, res }) => {
      const auth = req.headers.Authorization || '';

      return {
        req,
        res,
        dbConnection,
        auth,
      };
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  const port = process.env.PORT || 4000;

  app.get('/', (_, res) => res.redirect('/graphql'));

  app.listen(port, () => {
    console.info(`Server started at http://localhost:${port}/graphql`);
  });
};

main();
