import dotenv from 'dotenv-flow';
import express from 'express';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import { getConnection } from './libs/connection';
import { getMailer } from './libs/mailer';

import { queries as BodyQueris } from './modules/body';

import rootResolver from './modules/rootResolver';

dotenv.config();

const MOCKS = process.env.MOCKS === 'false';

const typeDefs = gql`
  input ExerciseInput {
    id: Int!
    sequence: Int!
  }

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
    workouts: [WorkoutPlan!]
  }

  type WorkoutPlan {
    id: Int!
    name: String!
    rounds: Int!
    intervalLength: Int!
    intervalPauseLength: Int!
    roundsPauseLength: Int!
    workoutLength: Int!
    isArchived: Boolean!
    createdAt: String!
    exercises: [WorkoutExercise!]!
    history: [WorkoutHistory!]!
  }

  type WorkoutHistory {
    id: Int!
    calories: Int
    status: String!
    startAt: String!
    endAt: String
  }

  type Exercise {
    id: Int!
    name: String!
    description: String
    bodyParts: [BodyPart!]!
    equipment: [Equipment!]!
  }

  type WorkoutExercise {
    id: Int!
    name: String!
    description: String
    bodyParts: [BodyPart!]!
    equipment: [Equipment!]!
    sequence: Int!
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

  type Query {
    users: [User!]!
    user(id: Int!): User
    bodies: [BodyPart!]
    workoutPlan(id: Int!): WorkoutPlan!
    workoutPlans: [WorkoutPlan!]!
    allEquipment: [Equipment!]
    exercises: [Exercise!]
    workoutHistory: [WorkoutHistory!]
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
      appOrigin: String!
    ): Boolean!

    createWorkout(
      userId: Int!
      name: String!
      rounds: Int!
      intLength: Int!
      intPauseLength: Int!
      roundsPauseLength: Int!
      workoutLength: Int!
      exercises: [ExerciseInput]!
    ): Int!

    editWorkout(
      workoutPlanId: Int!
      name: String!
      rounds: Int!
      intLength: Int!
      intPauseLength: Int!
      roundsPauseLength: Int!
      workoutLength: Int!
      exercises: [ExerciseInput]!
    ): Boolean!

    deleteWorkout(workoutPlanId: Int!): Boolean!
    archiveWorkout(workoutPlanId: Int!): Boolean!

    forgottenPassword(email: String!, appOrigin: String!): Boolean!
    resetPassword(passwordToken: String!, newPassword: String!): AuthInfo!
    activateUser(activateToken: String!): Boolean!
    finishWorkout(workoutPlanId: Int!, startTime: Float!): Boolean!
    setCaloriesFinishedWorkout(workoutPlanId: Int!, calories: Int!): Boolean!
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
