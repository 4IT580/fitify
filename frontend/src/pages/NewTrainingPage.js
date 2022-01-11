import React, { useReducer, useCallback, useState } from 'react';
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
  const auth = useAuth();
  const history = useHistory();
  const { user } = useAuth();
  let arrayOfItems = [];
  const [initial, isInitial] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const [createWorkoutRequest, createWorkoutRequestState] = useMutation(
    CREATEWORKOUT_MUTATION,
    {
      onCompleted: (date) => {
        setSuccessMessage('Training was successfully created.');
        history.replace(route.dashboard());
      },
      onError: () => {
        console.log('login error');
      },
    },
  );

  //  const exercises = useQuery(EXERCISES_QUERY);
  const exercises = useQuery(EXERCISES_QUERY, {
    onCompleted(data) {
      console.log('data z querry jsou', data);
      dispatch(loadedData(data));
      console.log('data po ', state.workoutItems);
    },
  });
  //const { id, name, data } = exercises;
  const [state, dispatch] = useReducer(listExerciseReducer, initialState);

  // if (exercises.data != null && initial === true) {
  //   const result4 = Object.keys(exercises.data).map(
  //     (key) => exercises.data[key],
  //   );
  //
  //   arrayOfItems = result4[0];
  //   state.workoutItems = arrayOfItems;
  //   isInitial(false);
  // }

  let currentList = state.workout.map((value) => {
    let list = {
      id: value.id,
      sequence: value.position,
    };
    return list;
  });
  console.log('current list je', currentList);
  console.log('workout list je', state.workout);
  const handleCreateWorkoutFormSubmit = useCallback(
    (values) => {
      console.log('ve formu odesilam', values);
      createWorkoutRequest({
        variables: {
          userId: user.id,
          name: values.name,
          rounds: values.rounds,
          intLength: values.intLength,
          intPauseLength: values.intPauseLength,
          roundsPauseLength: values.roundsPauseLength,
          workoutLength: 0,
          exercises: values.exercises,
        },
      });
    },
    [createWorkoutRequest, currentList],
  );

  return (
    <NewTrainingTemplate
      workout={state.workout}
      workoutItems={state.workoutItems}
      dispatch={dispatch}
      isLoading={createWorkoutRequestState.loading}
      error={createWorkoutRequestState.error}
      onSubmit={handleCreateWorkoutFormSubmit}
    />
  );
}
