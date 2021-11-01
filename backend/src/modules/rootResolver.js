import { queries as BodyQueries, mutations as BodyMutations } from './body';
import { queries as EquipmentQueries, mutations as EquipmentMutations } from './equipment';
import { queries as ExerciseQueries, mutations as ExerciseMutations } from './exercise';
import { queries as UserQueries, mutations as UserMutations } from './user';
import { queries as WorkoutHistoryQueries, mutations as WorkoutHistoryMutations } from './workout-history';
import { queries as WorkoutPlanQueries, mutations as WorkoutPlanMutations } from './workout-plan';

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
    //dodelat relationy
  },
};
