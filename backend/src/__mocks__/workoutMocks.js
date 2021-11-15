export function getMockedWorkoutPlans (userId) {

  return {
    1: {
      id: 1,
      name: 'Ranní HIIT',
      rounds: userId,
      intervalLength: 100,
      intervalPauseLength: 20,
      roundsPauseLength: 50,
      workoutLength: 30,
      createdAt: new Date('2021-10-10'),
    },
    2: {
      id: 2,
      name: 'Úterní kruháč',
      rounds: userId,
      intervalLength: 50,
      intervalPauseLength: 40,
      roundsPauseLength: 50,
      workoutLength: 30,
      createdAt: new Date('2021-10-11'),
    },
    3: {
      id: 1,
      name: 'Večerní HIIT',
      rounds: userId,
      intervalLength: 50,
      intervalPauseLength: 40,
      roundsPauseLength: 50,
      workoutLength: 30,
      createdAt: new Date('2021-10-12'),
    }
  };
}

export function getMockedExercises () {
  return {
    1: {
      id: 1,
      name: 'Zadní dřepy',
      description: 'Dřep, nahoru a dolů, kolena se nerozjíždějí. Rovný záda',
    },
    2: {
      id: 2,
      name: 'Mrtvé tahy',
      description: 'Jako na houpačce, táhnu osu podél těla',
    },
    3: {
      id: 3,
      name: 'Horolezec',
      description: 'Klik u kterého vypadáš jako pavouk co se snaží dotknout kolenem loktu',
    }
  }
}

export function getMockedHistory () {
  return {
    12: {
      id: 12,
      calories: 666,
      status: 'finished',
      startAt: new Date('2021-11-09 08:00:00'),
      endAt: new Date('2021-11-09 08:30:00'),
    },
    14: {
      id: 14,
      calories: 1234,
      status: 'finished',
      startAt: new Date('2021-11-10 08:00:00'),
      endAt: new Date('2021-11-10 08:30:00'),
    },
    13: {
      id: 13,
      calories: null,
      status: 'active',
      startAt: new Date('2021-11-10 08:00:00'),
      endAt: null,
    },
    123: {
      id: 123,
      calories: null,
      status: 'active',
      startAt: new Date('2021-11-20 08:00:00'),
      endAt: null,
    }
  }
}

export function getMockedEquipment (exerciseId) {
  let barbell = {
    id: 10,
    name: 'Osa'
  }
  let dumbbell = {
    id: 11,
    name: 'Jednoručky'
  }
  let kettlebell = {
    id: 12,
    name: 'Kettlebel'
  }

  if (exerciseId === 1) {
    return [
      barbell,
      dumbbell,
      kettlebell
    ]
  }

  if (exerciseId === 2) {
    return [
      barbell,
      kettlebell
    ]
  }

  return [];
}

export function getMockedBodyParts (exerciseId) {
  let legs = {
    id: 1,
    name: 'Nohy'
  };
  let ass = {
    id: 2,
    name: 'Zadek'
  };
  let abs = {
    id: 3,
    name: 'Břicho'
  };
  let shoulders = {
    id: 4,
    name: 'Ramena'
  };

  if (exerciseId === 1) {
    return [
      legs,
      ass,
      abs,
    ]
  }

  if (exerciseId === 3) {
    return [
      shoulders,
      abs,
    ]
  }

  return [];
}
