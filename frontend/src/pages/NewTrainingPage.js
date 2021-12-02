import React, { useReducer, useEffect, useCallback, useState } from 'react';
import {
  NewTrainingTemplate,
  WorkoutTemplate,
} from 'src/templates/NewTrainingTemplate';
import { useHistory } from 'react-router-dom';
import {
  initialState,
  listExerciseReducer,
} from 'src/reducers/listExerciseReducer';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useAuth } from 'src/utils/auth';
import { route } from '../Routes';
const EXERCISES_QUERY = gql`
  query Exercises {
    exercises {
      id
      name
    }
  }
`;

const CREATEWORKOUT_MUTATION = gql`
  mutation CreateWorkout(
    $userId: Int!
    $name: String!
    $rounds: Int!
    $intLength: Int!
    $intPauseLength: Int!
    $roundsPauseLength: Int!
    $workoutLength: Int!
    $exercises: [ExerciseInput]!
  ) {
    createWorkout(
      userId: $userId
      name: $name
      rounds: $rounds
      intLength: $intLength
      intPauseLength: $intPauseLength
      roundsPauseLength: $roundsPauseLength
      workoutLength: $workoutLength
      exercises: $exercises
    )
  }
`;

export function NewTrainingPage() {
  const auth = useAuth();
  const history = useHistory();
  const { user } = useAuth();
  let arrayOfItems;

  const [successMessage, setSuccessMessage] = useState(null);
  const [createWorkoutRequest, createWorkoutRequestState] = useMutation(
    CREATEWORKOUT_MUTATION,
    {
      onCompleted: (date) => {
        setSuccessMessage(
          'Your account has been created successfully. An email with activation link has been sent to provided email address.',
        );
      },
      onError: () => {
        console.log('login error');
      },
    },
  );

  const handleCreateWorkoutFormSubmit = useCallback(
    (values) => {
      createWorkoutRequest({
        variables: {
          userId: user.id,
          name: values.name,
          rounds: values.rounds,
          intLength: values.intLength,
          intPauseLength: values.intPauseLength,
          roundsPauseLength: values.roundsPauseLength,
          workoutLength: 60,
          exercises: state.workoutItems,
        },
      });
    },
    [createWorkoutRequest],
  );

  console.log('NewTrainingPage');
  const exercises = useQuery(EXERCISES_QUERY);

  const { id, name, data } = exercises;
  const [state, dispatch] = useReducer(listExerciseReducer, initialState);
  console.log('user of page', user.id);
  //  console.log('exercises', exercises);
  //  console.log('exercises.data', exercises.data);
  //  console.log('exercises.variables', exercises.variables);
  console.log('data v state.workoutitems', state.workoutItems);

  if (exercises.data != null) {
    const result4 = Object.keys(exercises.data).map(
      (key) => exercises.data[key],
    );
    console.log('result 4', result4[0]);
    arrayOfItems = result4[0];
    //    arrayOfItems.slice().sort();
  }

  // useEffect(() => {
  //   console.log(
  //     'inside new training page',
  //     JSON.stringify(arrayOfItems, null, ' '),
  //   );
  // }, [state]);

  if (arrayOfItems !== null) {
    state.workoutitems = arrayOfItems;
  }
  console.log('data v state.workoutitems po importu', state.workoutItems);
  return (
    <NewTrainingTemplate
      workoutItems={arrayOfItems}
      dispatch={dispatch}
      isLoading={createWorkoutRequestState.loading}
      error={createWorkoutRequestState.error}
      onSubmit={handleCreateWorkoutFormSubmit}
    />
  );
}
