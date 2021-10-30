export const workoutPlans = async (_, __, { dbConnection }) => {
    const workoutPlans = await dbConnection.query('SELECT * FROM workout_plan');
    return workoutPlans;
};