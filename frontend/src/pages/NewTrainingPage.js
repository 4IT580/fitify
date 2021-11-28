import React, { useReducer, useEffect } from 'react';

import { NewTrainingTemplate } from 'src/templates/NewTrainingTemplate';
import {
  initialState,
  listExerciseReducer,
} from 'src/reducers/listExerciseReducer';
import { gql, useMutation, useQuery } from '@apollo/client';

const EXERCISES_QUERY = gql`
  query Exercises {
    exercises {
      id
      name
    }
  }
`;
export function NewTrainingPage() {
  console.log('NewTrainingPage');
  const exercises = useQuery(EXERCISES_QUERY);
  const { id, name, data } = exercises;
  const [state, dispatch] = useReducer(listExerciseReducer, initialState);
  console.log('sfsfdsdsd', exercises.data);

  console.log('data v state.workoutitems', state.workoutItems);

  //  exercises.map((item) =>(((id: item.id), (name: item.name)));

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
