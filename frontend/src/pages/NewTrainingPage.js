import React, { useReducer } from 'react';

import { NewTrainingTemplate } from 'src/templates/NewTrainingTemplate';
import {
  initialState,
  listExerciseReducer,
} from 'src/reducers/listExerciseReducer';

export function NewTrainingPage() {
  const [state, dispatch] = useReducer(listExerciseReducer, initialState);

  return (
    <NewTrainingTemplate
      workoutItems={state.workoutItems}
      dispatch={dispatch}
    />
  );
}
