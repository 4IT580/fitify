import { queries as BodyQueries, mutations as BodyMutations } from './body';
import {
  queries as EquipmentQueries,
  mutations as EquipmentMutations,
} from './equipment';
import {
  queries as ExerciseQueries,
  mutations as ExerciseMutations,
} from './exercise';
import { queries as UserQueries, mutations as UserMutations } from './user';
import {
  queries as WorkoutHistoryQueries,
  mutations as WorkoutHistoryMutations,
} from './workout-history';
import {
  queries as WorkoutPlanQueries,
  mutations as WorkoutPlanMutations,
} from './workout-plan';

import { queries as QuackQueries, mutations as QuackMutations } from './quack';

export default {
  Query: {
    ...BodyQueries,
    ...EquipmentQueries,
    ...ExerciseQueries,
    ...UserQueries,
    ...WorkoutHistoryQueries,
    ...WorkoutPlanQueries,

    ...QuackQueries,
  },
  Mutation: {
    ...BodyMutations,
    ...EquipmentMutations,
    ...ExerciseMutations,
    ...UserMutations,
    ...WorkoutHistoryMutations,
    ...WorkoutPlanMutations,

    ...QuackMutations,
  },
  User: {
    async quacks(parent, _, { dbConnection }) {
      return await dbConnection.query(`SELECT * FROM quack WHERE userId = ?`, [
        parent.id,
      ]);
    },
  },
  Quack: {
    async user(parent, _, { dbConnection }) {
      return (
        await dbConnection.query(`SELECT * FROM user WHERE id = ?`, [
          parent.userId,
        ])
      )[0];
    },
  },
  WorkoutPlan: {
    async exercises(parent, _, {dbConnection}) {
      return [
        {
          id: 1,
          name: 'Zadní dřepy',
          description: 'Dřep, nahoru a dolů, kolena se nerozjíždějí. Rovný záda',
        },
        {
          id: 2,
          name: 'Mrtvé tahy',
          description: 'Jako na houpačce, táhnu osu podél těla',
        },
        {
          id: 3,
          name: 'Horolezec',
          description: 'Klik u kterého vypadáš jako pavouk co se snaží dotknout kolenem loktu',
        }
      ];
    },
    async history(parent, _, {dbConnection}){
      return [
        {
          id: 12,
          calories: 666,
          status: 'finished',
          startAt: new Date('2021-11-09 08:00:00'),
          endAt: new Date('2021-11-09 08:30:00'),
        },
        {
          id: 14,
          calories: 1234,
          status: 'finished',
          startAt: new Date('2021-11-10 08:00:00'),
          endAt: new Date('2021-11-10 08:30:00'),
        },
        {
          id: 13,
          calories: null,
          status: 'active',
          startAt: new Date('2021-11-10 08:00:00'),
          endAt: null,
        },
        {
          id: 123,
          calories: null,
          status: 'active',
          startAt: new Date('2021-11-20 08:00:00'),
          endAt: null,
        }
      ];
    }
  },
  Excercise: {
    async bodyParts(parent, _, {dbConnection}) {
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

      if (parent.id === 1) {
        return [
          legs,
          ass,
          abs,
        ]
      }

      if (parent.id === 3) {
        return [
          shoulders,
          abs,
        ]
      }

      return [];
    },
    equipment(parent, _, {dbConnection}) {
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

      if (parent.id === 1) {
        return [
          barbell,
          dumbbell,
          kettlebell
        ]
      }

      if (parent.id === 2) {
        return [
          barbell,
          kettlebell
        ]
      }

      return [];
    }
  }
};
