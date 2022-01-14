import { mutations as BodyMutations, queries as BodyQueries } from './body';
import {
  mutations as EquipmentMutations,
  queries as EquipmentQueries,
} from './equipment';
import {
  mutations as ExerciseMutations,
  queries as ExerciseQueries,
} from './exercise';
import { mutations as UserMutations, queries as UserQueries } from './user';
import {
  mutations as WorkoutHistoryMutations,
  queries as WorkoutHistoryQueries,
} from './workout-history';
import {
  mutations as WorkoutPlanMutations,
  queries as WorkoutPlanQueries,
} from './workout-plan';

export default {
  Query: {
    ...BodyQueries,
    ...EquipmentQueries,
    ...ExerciseQueries,
    ...UserQueries,
    ...WorkoutHistoryQueries,
    ...WorkoutPlanQueries,
  },
  Mutation: {
    ...BodyMutations,
    ...EquipmentMutations,
    ...ExerciseMutations,
    ...UserMutations,
    ...WorkoutHistoryMutations,
    ...WorkoutPlanMutations,
  },
  User: {
    async workouts(parent, _, { dbConnection }) {
      return await dbConnection.query(
        'SELECT wP.* FROM userWorkoutPlan JOIN workoutPlan wP ON userWorkoutPlan.workoutPlanId = wP.id WHERE userId = ?',
        [parent.id],
      );
    },
  },
  WorkoutPlan: {
    async exercises(parent, _, { dbConnection }) {
      return await dbConnection.query(
        'SELECT exercise.* FROM workoutPlanExercise JOIN exercise ON workoutPlanExercise.exerciseId = exercise.id WHERE workoutPlanId = ?;',
        [parent.id],
      );
    },
    async history(parent, _, { dbConnection }) {
      return await dbConnection.query(
        'SELECT * FROM workoutHistory wHere workoutPlanId = ?;',
        [parent.id],
      );
    },
  },
  Exercise: {
    async bodyParts(parent, _, { dbConnection }) {
      return await dbConnection.query(
        'SELECT body.* FROM body JOIN exerciseBody eB ON body.id = eB.bodyId and exerciseId = ?;',
        [parent.id],
      );
    },
    async equipment(parent, _, { dbConnection }) {
      return await dbConnection.query(
        'SELECT equipment.* FROM equipment JOIN exerciseEquipment eB ON equipment.id = eB.equipmentId and exerciseId = ?;',
        [parent.id],
      );
    },
  },
};
