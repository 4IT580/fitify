export const workoutPlans = async (_, __, { dbConnection }) => {
  return await dbConnection.query(
    'SELECT workoutPlan.* FROM workoutPlan JOIN userWorkoutPlan uWP ON workoutPlan.id = uWP.workoutPlanId',
  );
};

export const workoutPlan = async (parent, parameters, { dbConnection }) => {
  let result = await dbConnection.query(
    'SELECT workoutPlan.* FROM workoutPlan WHERE id = ?',
    [parameters.id],
  );

  if (result.length > 0) {
    return result[0];
  }

  return null;
};
