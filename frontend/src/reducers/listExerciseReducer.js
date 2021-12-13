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
      const { list } = action;
      return {
        ...state,
        list,
      };
    }
    case 'ADD': {
      const { name } = action;
      const id = state.lastId + 1;

      const newWorkItem = { name, id };

      return {
        ...state,
        lastId: newWorkItem.id,
        workoutItems: [newWorkItem, ...state.workoutItems],
      };
    }
    case 'DELETE': {
      const { id } = action;

      const workoutItems = state.workoutItems.filter(
        (workoutItem) => workoutItem.id !== id,
      );
      return {
        ...state,
        workoutItems,
      };
    }
    case 'SWAP': {
      const { oldIndex, newIndex } = action;
      const workoutItems = [...state.workoutItems];
      const oldItem = workoutItems[oldIndex];
      const newItem = workoutItems[newIndex];
      workoutItems[oldIndex] = newItem;
      workoutItems[newIndex] = oldItem;
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
  return { type: 'SETLIST', list };
}
export function replace(state) {
  return { type: 'REPLACE', state };
}
