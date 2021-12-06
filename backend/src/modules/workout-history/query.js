export const workoutHistory = async (_, __, { dbConnection }) => {
  const workoutHistory = await dbConnection.query(
    'SELECT * FROM workout_history',
  );
  return workoutHistory;
};
