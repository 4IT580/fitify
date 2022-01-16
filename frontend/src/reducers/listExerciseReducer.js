export const initialState = {
  //workoutItems = items from database
  workoutItems: [],

  //workout = items from workoutItems after adding
  workout: [],

  //workoutPlan = plan data for duplicate/edit
  workoutPlan: [],
};

export function listExerciseReducer(state, action) {
  switch (action.type) {
    case 'LOADED_DATA': {
      const { data } = action;

      return {
        ...state,
        workoutItems: data.exercises.map((item, index) => ({
          ...item,
          position: index,
          selected: false,
        })),
      };
    }

    case 'LOADED_PLAN_DATA': {
      const { data } = action;

      return {
        ...state,
        workoutPlan: data,
        workout: data.exercises.map((item) => {
          return { ...item, position: item.sequence };
        }),
        workoutItems: state.workoutItems.map((workoutItem) => {
          return {
            ...workoutItem,
            selected: data.exercises.filter(function (planExercise) {
              return planExercise.id === workoutItem.id;
            }).length,
          };
        }),
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

      const workout = [...state.workout];

      function move(array, from, to) {
        if( to === from ) return array;

        let target = array[from];
        let increment = to < from ? -1 : 1;

        for(let k = from; k !== to; k += increment){
          array[k] = array[k + increment];
        }
        array[to] = target;

        for(let l = 0; l<array.length; l++){
          array[l].position = l+1;
        }

        return array;
      }

      move(workout, oldIndex, newIndex)

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
export function loadedPlanData(data) {
  return { type: 'LOADED_PLAN_DATA', data };
}
export function transferData() {
  return { type: 'TRANSFER_DATA' };
}
export function setWorkoutItemSelected(id, selected) {
  return { type: 'SET_SELECTED', id, selected };
}
