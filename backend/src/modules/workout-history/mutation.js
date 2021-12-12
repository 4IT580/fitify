export const finishWorkout = async (
  _,
  { workoutPlanId },
  { dbConnection },
) => {
  console.log(workoutPlanId);
  // const workoutPlanResponse = await dbConnection.query(
  //   `INSERT INTO workoutPlan(name, rounds, 	intervalLength, intervalPauseLength, roundsPauseLength, workoutLength) VALUES(?, ?, ?, ?, ?, ?)`,
  //   [name, rounds, intLength, intPauseLength, roundsPauseLength, workoutLength],
  // );
  // let workoutPlanId = workoutPlanResponse.insertId;
  //
  // await dbConnection.query(
  //   `INSERT INTO userWorkoutPlan(userId, workoutPlanId) VALUES(?, ?)`,
  //   [userId, workoutPlanId],
  // );
  //
  // exercises.map((exercise) =>
  //   insertExercises(workoutPlanId, exercise, dbConnection),
  // );

  return true;
};

export const setCaloriesFinishedWorkout = async (
  _,
  { workoutPlanId, calories },
  { dbConnection },
) => {
  console.log(workoutPlanId, calories);
  // const workoutPlanResponse = await dbConnection.query(
  //   `INSERT INTO workoutPlan(name, rounds, 	intervalLength, intervalPauseLength, roundsPauseLength, workoutLength) VALUES(?, ?, ?, ?, ?, ?)`,
  //   [name, rounds, intLength, intPauseLength, roundsPauseLength, workoutLength],
  // );
  // let workoutPlanId = workoutPlanResponse.insertId;
  //
  // await dbConnection.query(
  //   `INSERT INTO userWorkoutPlan(userId, workoutPlanId) VALUES(?, ?)`,
  //   [userId, workoutPlanId],
  // );
  //
  // exercises.map((exercise) =>
  //   insertExercises(workoutPlanId, exercise, dbConnection),
  // );

  return true;
};

