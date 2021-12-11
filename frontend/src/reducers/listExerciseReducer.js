import { gql, useMutation, useQuery } from '@apollo/client';

const EXERCISES_QUERY = gql`
  query Exercises {
    exercises {
      id
      name
    }
  }
`;

export const initialState = {
  workoutItems: [
    {
      id: 0,
      name: 'Klik',
      position: 0,
    },
    // {
    //   id: 1,
    //   name: 'Dřep',
    //   position: 1,
    // },
    // {
    //   id: 2,
    //   name: 'Bicák',
    //   position: 2,
    // },
    // {
    //   id: 3,
    //   name: 'Výskok',
    //   position: 3,
    // },
    // {
    //   id: 4,
    //   name: 'Výrazy',
    //   position: 4,
    // },
  ],
};

export function listExerciseReducer(state, action) {
  switch (action.type) {
    case 'REPLACE': {
      console.log('WATAFAK', action.state);
      return action.state;
    }
    case 'SETLIST': {
      const { name } = action;
      const id = state.lastId + 1;

      const newWorkItem = { name, id, id };

      return {
        ...state,
        lastId: newWorkItem.id,
        workoutItems: [newWorkItem, ...state.workoutItems],
      };
    }
    case 'ADD': {
      const { name } = action;
      const id = state.lastId + 1;

      const newWorkItem = { name, id, id };

      return {
        ...state,
        lastId: newWorkItem.id,
        workoutItems: [newWorkItem, ...state.workoutItems],
      };
    }
    case 'DELETE': {
      const { id } = action;
      console.log(id);
      const workoutItems = state.workoutItems.filter(
        (workoutItem) => workoutItem.id !== id,
      );
      return {
        ...state,
        workoutItems,
      };
    }
    case 'SWAP': {
      console.log('SWAP');
      const { oldIndex, newIndex } = action;
      const workoutItems = [...state.workoutItems];
      const oldItem = workoutItems[oldIndex];
      const newItem = workoutItems[newIndex];
      workoutItems[oldIndex] = newItem;
      workoutItems[newIndex] = oldItem;

      // workoutItems[oldIndex].position = oldIndex;
      // workoutItems[newIndex].position = newIndex;
      console.log('A', JSON.stringify(workoutItems, null, '  '));

      return {
        ...state,
        workoutItems,
      };
    }
    default:
      throw new Error('Unknown action');
  }
}

export function addWorkoutItem(name) {
  return { type: 'ADD', name };
}
export function deleteWorkoutItem(id) {
  return { type: 'DELETE', id };
}

export function swapItems(oldIndex, newIndex) {
  return { type: 'SWAP', oldIndex, newIndex };
}
export function setList(list) {
  return { type: 'SWAP', list };
}
export function replace(state) {
  return { type: 'REPLACE', state };
}
