export const exercises = async (_, __, { dbConnection }) => {
  const exercises = await dbConnection.query('SELECT * FROM exercise ORDER BY name ASC');
  return exercises;
};
