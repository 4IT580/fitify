export const initialState = {
  lastId: 4,
  workoutItems: [
    {
      name: 'Klik',
      description: '',
      position: 0,
      id: 0,
    },
    {
      name: 'Dřep',
      description: '',
      position: 1,
      id: 1,
    },
    {
      name: 'Bicák',
      description: '',
      position: 2,
      id: 2,
    },
    {
      name: 'Výskok',
      description: '',
      position: 3,
      id: 3,
    },
    {
      name: 'Mlácení hlavou o zeď',
      description: '',
      position: 4,
      id: 4,
    },
  ],
};

export function listExerciseReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { name } = action;
      const id = state.lastId + 1;

      const newWorkItem = { name, description: '', id, id };

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
      const { oldIndex, newIndex, oldWorkoutItems } = action;
      const workoutItems2 = [...state.workoutItems];
      const oldItem = workoutItems2[oldIndex];
      const newItem = workoutItems2[newIndex];
      workoutItems2[oldIndex] = newItem;
      workoutItems2[newIndex] = oldItem;
      console.log('A', JSON.stringify(workoutItems2, null, '  '));
      // console.log('B', JSON.stringify(state.workoutItems, null, '  '));
      // state.workoutItems = workoutItems;
      // console.log('C', JSON.stringify(state.workoutItems, null, '  '));

      let workoutItems = workoutItems2.filter(
        (workoutItem) => workoutItem.id !== 0,
      );
      console.log('D', JSON.stringify(workoutItems, null, '  '));
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

export function swapItems(oldIndex, newIndex, oldWorkoutItems) {
  return { type: 'SWAP', oldIndex, newIndex, oldWorkoutItems };
}
