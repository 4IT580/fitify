export const initialState = {
  lastId: 5,
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
      return {
        ...state,
        workoutItems: state.workoutItems.filter(
          (workoutItem) => workoutItem.id !== id,
        ),
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
      console.log('A', JSON.stringify(workoutItems, null, '  '));
      console.log('B', JSON.stringify(state.workoutItems, null, '  '));

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
