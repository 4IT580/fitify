import { getMockedWorkoutPlans } from '../../__mocks__/workoutMocks';

export const workoutPlans = async (_, __, { dbConnection }) => {
  // const workoutPlans = await dbConnection.query('SELECT * FROM workoutPlan');
  return getMockedWorkoutPlans(43);
};

export const workoutPlan = async (parent, parameters, { dbConnection }) => {
  // const workoutPlans = await dbConnection.query('SELECT * FROM workoutPlan');
  if (getMockedWorkoutPlans(1234)[parameters.id] !== undefined) {
    return getMockedWorkoutPlans(1234)[parameters.id];
  }

  return null;
};
