import React, { useReducer, useEffect } from 'react';

import { NewTrainingTemplate } from 'src/templates/NewTrainingTemplate';
import {
  initialState,
  listExerciseReducer,
} from 'src/reducers/listExerciseReducer';

export function NewTrainingPage() {
  console.log('NewTrainingPage');

  const [state, dispatch] = useReducer(listExerciseReducer, initialState);

  useEffect(() => {
    console.log(
      'inside new training page',
      JSON.stringify(state.workoutItems, null, ' '),
    );
  }, [state]);

  return (
    <NewTrainingTemplate
      workoutItems={state.workoutItems}
      dispatch={dispatch}
    />
  );
}
