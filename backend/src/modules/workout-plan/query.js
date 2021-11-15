import { getMockedWorkoutPlans } from "../../__mocks__/workoutMocks";

export const workoutPlans = async (_, __, {dbConnection}) => {
  // const workoutPlans = await dbConnection.query('SELECT * FROM workoutPlan');
  return getMockedWorkoutPlans();
};

export const workoutPlan = async (_, parameters, {dbConnection}) => {
  // const workoutPlans = await dbConnection.query('SELECT * FROM workoutPlan');

  if (getMockedWorkoutPlans()[parameters.id] !== undefined) {
    return getMockedWorkoutPlans()[parameters.id];
  }

  return null;
};
