import React, { useReducer, useEffect } from 'react';

import {
  NewTrainingTemplate,
  WorkoutTemplate,
} from 'src/templates/NewTrainingTemplate';
import {
  initialState,
  listExerciseReducer,
} from 'src/reducers/listExerciseReducer';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useAuth } from 'src/utils/auth';
const EXERCISES_QUERY = gql`
  query Exercises {
    exercises {
      id
      name
    }
  }
`;
export function NewTrainingPage() {
  const { user } = useAuth();
  let arrayOfItems;
  console.log('NewTrainingPage');
  const exercises = useQuery(EXERCISES_QUERY);

  const { id, name, data } = exercises;
  const [state, dispatch] = useReducer(listExerciseReducer, initialState);
  console.log('user of page', user.id);
  console.log('exercises', exercises);
  console.log('exercises.data', exercises.data);
  console.log('exercises.variables', exercises.variables);
  //console.log('exercises.values', exercises.data.values);
  console.log('data v state.workoutitems', state.workoutItems);
  //setTimeout(function () {}, 1000);
  if (exercises.data != null) {
    const result4 = Object.keys(exercises.data).map(
      (key) => exercises.data[key],
    );
    console.log('result 4', result4[0]);
    arrayOfItems = result4[0];
    arrayOfItems.slice().sort();
  }

  useEffect(() => {
    console.log(
      'inside new training page',
      JSON.stringify(state.workoutItems, null, ' '),
    );
  }, [state]);
  if (arrayOfItems !== null) {
    state.workoutitems = arrayOfItems;
  }
  return (
    <NewTrainingTemplate
      workoutItems={state.workoutItems}
      dispatch={dispatch}
    />
  );
}
