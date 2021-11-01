import { queries as BodyQueries, mutations as BodyMutations } from './body';
import { queries as EquipmentQueries, mutations as EquipmentMutations } from './equipment';
import { queries as ExerciseQueries, mutations as ExerciseMutations } from './exercise';
import { queries as UserQueries, mutations as UserMutations } from './user';
import { queries as WorkoutHistoryQueries, mutations as WorkoutHistoryMutations } from './workout-history';
import { queries as WorkoutPlanQueries, mutations as WorkoutPlanMutations } from './workout-plan';

import { queries as QuackQueries, mutations as QuackMutations } from './quack';

export default {
  Query: {
    ...BodyQueries,
    ...EquipmentQueries,
    ...ExerciseQueries,
    ...UserQueries,
    ...WorkoutHistoryQueries,
    ...WorkoutPlanQueries,

    ...QuackQueries,
  },
  Mutation: {
    ...BodyMutations,
    ...EquipmentMutations,
    ...ExerciseMutations,
    ...UserMutations,
    ...WorkoutHistoryMutations,
    ...WorkoutPlanMutations,

    ...QuackMutations,
  },
  User: {
    async quacks(parent, _, { dbConnection }) {
      return await dbConnection.query(`SELECT * FROM quack WHERE userId = ?`, [
        parent.id,
      ]);
    },
  },
  Quack: {
    async user(parent, _, { dbConnection }) {
      return (
        await dbConnection.query(`SELECT * FROM user WHERE id = ?`, [
          parent.userId,
        ])
      )[0];
    },
  },
};