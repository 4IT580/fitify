import dotenv from 'dotenv-flow';
import express from 'express';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { getConnection } from './libs/connection';
import { getMailer } from './libs/mailer';

import rootResolver from './modules/rootResolver';

dotenv.config();

const MOCKS = process.env.MOCKS === 'false';

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    surname: String!
    email: String!
    password: String!
    role: String!
    active: Boolean!
    height: Int!
    weight: Int!
    sex: String!
    birthdate: String!
    lostPasswordHash: String!
    lastLoginAt: String!
    createdAt: String!
    quacks: [Quack!]!
  }

  type WorkoutPlan {
    id: Int!
    name: String!
    rounds: Int!
    intervalLength: Int!
    intervalPauseLength: Int!
    roundsPauseLength: Int!
    workoutLength: Int!
    createdAt: String!
    exercises: [Excercise!]!
    history: [WorkoutHistory!]!
  }

  type WorkoutHistory {
    id: Int!
    calories: Int!
    status: String!
    startAt: String!
    endAt: String
  }

  type Excercise {
    id: Int!
    name: String!
    description: String!
    bodyParts: [BodyPart!]!
    equipment: [Equipment!]!
  }

  type BodyPart {
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
    email: String!
  }

  type AuthInfo {
    user: AuthUser!
    token: String!
  }

  type Quack {
    id: Int!
    createdAt: String!
    user: User!
    userId: Int!
    text: String!
  }

  type Query {
    users: [User!]!
    user(userName: String!): User
    quacks: [Quack!]!
    workoutPlan(id: Int!): WorkoutPlan!
    workoutPlans: [WorkoutPlan!]!
  }

  type Mutation {
    signin(email: String!, password: String!): AuthInfo!

    signup(
      email: String!
      password: String!
      name: String!
      surname: String!
      height: Int!
      weight: Int!
      sex: String!
      birthdate: String!
    ): Boolean!

    forgottenPassword(email: String!, appOrigin: String!): Boolean!
    resetPassword(passwordToken: String!, newPassword: String!): AuthInfo!

    addQuack(userId: Int!, text: String!): Quack!
  }
`;

const main = async () => {
  const app = express();

  app.disable('x-powered-by');
  app.use(cors());

  const dbConnection = await getConnection();
  const mailer = await getMailer();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: rootResolver,
    context: async ({ req, res }) => {
      const auth = req.headers.Authorization || '';

      return {
        req,
        res,
        dbConnection,
        mailer,
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
