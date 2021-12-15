export const finishWorkout = async (
  _,
  { workoutPlanId, startTime },
  { dbConnection },
) => {

  await dbConnection.query(
    `INSERT INTO workoutHistory
       (status, startAt, endAt, workoutPlanId)
     VALUES ('finished', ?, ?, ?)`,
    [new Date(startTime), new Date(), workoutPlanId],
  );

  return true;
};

export const setCaloriesFinishedWorkout = async (
  _,
  { workoutPlanId, calories },
  { dbConnection },
) => {
  console.log(workoutPlanId, calories);

  const lastIdRequest = await dbConnection.query(`SELECT wh.id FROM workoutHistory wh WHERE wh.workoutPlanId = ? ORDER BY wh.endAt DESC LIMIT 1`, [workoutPlanId]);

  await dbConnection.query(`UPDATE workoutHistory SET calories = ? WHERE id = ?;`, [calories, lastIdRequest[0].id]);

  return true;
};

