export const createWorkout = async (
  _,
  {
    userId,
    name,
    rounds,
    intLength,
    intPauseLength,
    roundsPauseLength,
    workoutLength,
    exercises,
  },
  { dbConnection },
) => {
  const workoutPlanResponse = await dbConnection.query(
    `INSERT INTO workoutPlan(name, rounds, 	intervalLength, intervalPauseLength, roundsPauseLength, workoutLength) VALUES(?, ?, ?, ?, ?, ?)`,
    [name, rounds, intLength, intPauseLength, roundsPauseLength, workoutLength],
  );
  let workoutPlanId = workoutPlanResponse.insertId;

  await dbConnection.query(
    `INSERT INTO userWorkoutPlan(userId, workoutPlanId) VALUES(?, ?)`,
    [userId, workoutPlanId],
  );

  exercises.map((exercise) =>
    insertExercises(workoutPlanId, exercise, dbConnection),
  );

  return workoutPlanId;
};

export const editWorkout = async (
  _,
  {
    workoutPlanId,
    name,
    rounds,
    intLength,
    intPauseLength,
    roundsPauseLength,
    workoutLength,
    exercises,
  },
  { dbConnection },
) => {
  await dbConnection.query(
    `UPDATE workoutPlan SET name = ?, rounds = ?, intervalLength = ?, intervalPauseLength = ?, roundsPauseLength = ?, workoutLength = ?
			WHERE id = ?`,
    [
      name,
      rounds,
      intLength,
      intPauseLength,
      roundsPauseLength,
      workoutLength,
      workoutPlanId,
    ],
  );

  await dbConnection.query(
    `DELETE FROM workoutPlanExercise WHERE workoutPlanId = ?`,
    [workoutPlanId],
  );

  exercises.map((exercise) =>
    insertExercises(workoutPlanId, exercise, dbConnection),
  );

  return true;
};

export const deleteWorkout = async (_, { workoutPlanId }, { dbConnection }) => {
  await dbConnection.query(`DELETE FROM workoutPlan WHERE id = ?`, [
    workoutPlanId,
  ]);

  return true;
};

export const archiveWorkout = async (
  _,
  { workoutPlanId },
  { dbConnection },
) => {
  await dbConnection.query(`UPDATE workoutPlan SET isArchived=1 WHERE id = ?`, [
    workoutPlanId,
  ]);

  return true;
};

function insertExercises(workoutPlanId, exercise, dbConnection) {
  const workoutExerciseResponse = dbConnection.query(
    `INSERT INTO workoutPlanExercise(workoutPlanId, exerciseId, sequence)  VALUES (?, ?, ?)`,
    [workoutPlanId, exercise.id, exercise.sequence],
  );
}
