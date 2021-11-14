export const workoutPlans = async (_, __, {dbConnection}) => {
  // const workoutPlans = await dbConnection.query('SELECT * FROM workoutPlan');
  return [
    {
      id: 1,
      name: 'fist plan',
      rounds: 0,
      intervalLength: 100,
      intervalPauseLength: 20,
      roundsPauseLength: 50,
      workoutLength: 30, //deprecated field, remove from DB
      createdAt: (new Date('2021-10-10')).toLocaleString(),
    },
    {
      id: 2,
      name: 'second plan',
      rounds: 2,
      intervalLength: 190,
      intervalPauseLength: 102,
      roundsPauseLength: 11,
      workoutLength: 22, //deprecated field, remove from DB
      createdAt: (new Date('2021-10-12')).toLocaleString(),
    },
  ];
};

export const workoutPlan = async (_, parameters, {dbConnection}) => {
  // const workoutPlans = await dbConnection.query('SELECT * FROM workoutPlan');

  if(parameters.id === 1){
    return {
      id: 1,
      name: 'Ranní HIIT',
      rounds: 6,
      intervalLength: 100,
      intervalPauseLength: 20,
      roundsPauseLength: 50,
      workoutLength: 30,
      createdAt: (new Date('2021-10-10')).toLocaleString(),
    };
  }

  if(parameters.id === 2){
    return {
      id: 2,
      name: 'Úterní kruháč',
      rounds: 1,
      intervalLength: 50,
      intervalPauseLength: 40,
      roundsPauseLength: 50,
      workoutLength: 30,
      createdAt: (new Date('2021-10-11')).toLocaleString(),
    };
  }

  if(parameters.id === 3){
    return {
      id: 1,
      name: 'Večerní HIIT',
      rounds: 5,
      intervalLength: 50,
      intervalPauseLength: 40,
      roundsPauseLength: 50,
      workoutLength: 30,
      createdAt: (new Date('2021-10-12')).toLocaleString(),
    };
  }



};
