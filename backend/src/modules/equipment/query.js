export const allEquipment = async (_, __, { dbConnection }) => {
    const equipment = await dbConnection.query('SELECT * FROM equipment');
    return equipment;
};