export const initialState = {
  //workoutItems = items from database
  workoutItems: [
    {
      id: 0,
      name: 'Klik',
      position: 0,
      selected: false,
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
  //workout = items from workoutItems after adding
  workout: [
    {
      id: 0,
      name: 'Dřep',
      position: 0,
    },
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
    case 'SETLIST': {
      const { list } = action;
      return {
        ...state,
        list,
      };
    }
    case 'TRANSFER_DATA': {
      const workoutItems = [...state.workoutItems];

      // console.log(workoutItems, ' je workoutItems v transfer data');
      //
      // const workout = workoutItems.map((item, index) => {
      //   if (item.selected === true) {
      //     return item;
      //   }
      //   return {
      //     ...item,
      //     position: index,
      //   };
      // });
      // console.log(workout, ' je work v transfer data');

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
      const workout = [...state.workout];
      const oldItem = workout[oldIndex];
      const newItem = workout[newIndex];
      workout[oldIndex] = newItem;
      workout[newIndex] = oldItem;
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
