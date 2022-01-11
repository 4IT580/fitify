export const initialState = {
  //workoutItems = items from database
  workoutItems: [
    // {
    //   id: 0,
    //   name: 'Klik',
    //   position: 0,
    //   selected: false,
    //   index: 0,
    // },
  ],
  // exercise: [
  //   {
  //     id: 0,
  //     sequence: 3,
  //   },
  //   {
  //     id: 1,
  //     sequence: 2,
  //   },
  // ],
  //workout = items from workoutItems after adding
  workout: [
    // {
    //   id: 0,
    //   name: 'Dřep',
    //   position: 0,
    //   index: 0,
    // },
    // {
    //   id: 1,
    //   name: 'Klik',
    //   position: 1,
    //   index: 1,
    // },
    // {
    //   id: 2,
    //   name: 'Bicák',
    //   position: 2,
    //   index: 2,
    // },
    // {
    //   id: 3,
    //   name: 'Výskok',
    //   position: 3,
    //   index: 3,
    // },
    // {
    //   id: 4,
    //   name: 'Výrazy',
    //   position: 4,
    //   index: 4,
    // },
  ],
};

export function listExerciseReducer(state, action) {
  switch (action.type) {
    case 'LOADED_DATA': {
      const { data } = action;
      //console.log('data.exercises v reduceru sou', data);
      return {
        ...state,
        workoutItems: data.exercises.map((item, index) => ({
          ...item,
          position: index,
          selected: false,
        })),
      };
    }

    case 'TRANSFER_DATA': {
      const workoutItems = [...state.workoutItems];
      return {
        ...state,
        workout: workoutItems.filter((item) => item.selected),
      };
    }
    case 'SET_SELECTED': {
      const { id, selected } = action;
      //console.log('sem tady', id, selected);
      return {
        ...state,
        workoutItems: state.workoutItems.map((item) => {
          if (item.id !== id) return item;
          return { ...item, selected };
        }),
      };
    }

    case 'DELETE': {
      const { id } = action;
      const workout = state.workout.filter(
        (workoutItem) => workoutItem.id !== id,
      );
      return {
        ...state,
        workout,
      };
    }
    case 'SWAP': {
      const { oldIndex, newIndex } = action;
      console.log('před swapem je oldIndex', oldIndex, 'a newindex', newIndex);
      const workout = [...state.workout];
      const oldItem = workout[oldIndex];
      const newItem = workout[newIndex];
      workout[oldIndex] = newItem;
      workout[newIndex] = oldItem;
      console.log('po swapu je oldIndex', oldIndex, 'a newindex', newIndex);
      console.log('pole po swapu je', workout);
      return {
        ...state,
        workout,
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
export function loadedData(data) {
  return { type: 'LOADED_DATA', data };
}
export function transferData() {
  return { type: 'TRANSFER_DATA' };
}
export function setWorkoutItemSelected(id, selected) {
  return { type: 'SET_SELECTED', id, selected };
}
