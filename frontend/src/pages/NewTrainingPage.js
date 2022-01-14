import React, { useCallback, useReducer, useState } from 'react';
import { NewTrainingTemplate } from 'src/templates/NewTrainingTemplate';
import { useHistory } from 'react-router-dom';
import {
  initialState,
  listExerciseReducer,
  loadedData,
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
  const history = useHistory();
  const { user } = useAuth();
  const [successMessage, setSuccessMessage] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [createWorkoutRequest, createWorkoutRequestState] = useMutation(
    CREATEWORKOUT_MUTATION,
    {
      onCompleted: (date) => {
        setSuccessMessage('Training was successfully created.');

        setIsWaiting(true);
        setTimeout(function () {
          history.replace(route.dashboard());
        }, 5000);
      },
      onError: () => {
        console.log('login error');
      },
    },
  );

  useQuery(EXERCISES_QUERY, {
    onCompleted(data) {
      dispatch(loadedData(data));
    },
  });

  const [state, dispatch] = useReducer(listExerciseReducer, initialState);

  const handleCreateWorkoutFormSubmit = useCallback(
    (values) => {
      createWorkoutRequest({
        variables: {
          userId: user.id,
          name: values.name,
          rounds: values.rounds,
          intLength: values.intervalLength,
          intPauseLength: values.intervalPauseLength,
          roundsPauseLength: values.roundsPauseLength,
          workoutLength: 0,
          exercises: values.exercises,
        },
      });
    },
    [createWorkoutRequest, user.id],
  );

  return (
    <NewTrainingTemplate
      workout={state.workout}
      workoutItems={state.workoutItems}
      dispatch={dispatch}
      successMessage={successMessage}
      isLoading={createWorkoutRequestState.loading || isWaiting === true}
      error={createWorkoutRequestState.error}
      onSubmit={handleCreateWorkoutFormSubmit}
    />
  );
}
