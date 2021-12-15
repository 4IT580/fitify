import React, { useReducer, useCallback, useState } from 'react';
import { EditWorkoutTemplate } from 'src/templates/EditWorkoutTemplate';
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

const EDITWORKOUT_MUTATION = gql`
  mutation EditWorkout(
    $userId: Int!
    $name: String!
    $rounds: Int!
    $intLength: Int!
    $intPauseLength: Int!
    $roundsPauseLength: Int!
    $workoutLength: Int!
    $exercises: [ExerciseInput]!
  ) {
    editWorkout(
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

export function EditWorkoutPage() {
  const auth = useAuth();
  const history = useHistory();
  const { user } = useAuth();
  let arrayOfItems = [];
  const [initial, isInitial] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const [editWorkoutRequest, editWorkoutRequestState] = useMutation(
    EDITWORKOUT_MUTATION,
    {
      onCompleted: (date) => {
        setSuccessMessage('Training was successfully created.');
      },
      onError: () => {
        console.log('login error');
      },
    },
  );

  const exercises = useQuery(EXERCISES_QUERY);
  const { id, name, data } = exercises;
  const [state, dispatch] = useReducer(listExerciseReducer, initialState);

  if (exercises.data != null && initial === true) {
    const result4 = Object.keys(exercises.data).map(
      (key) => exercises.data[key],
    );

    arrayOfItems = result4[0];
    state.workoutItems = arrayOfItems;
    isInitial(false);
  }

  const currentList = state.workoutItems.map((value) => {
    const list = {
      id: value.id,
      sequence: value.id,
    };
    return list;
  });

  const handleEditWorkoutFormSubmit = useCallback(
    (values) => {
      editWorkoutRequest({
        variables: {
          userId: user.id,
          name: values.name,
          rounds: values.rounds,
          intLength: values.intLength,
          intPauseLength: values.intPauseLength,
          roundsPauseLength: values.roundsPauseLength,
          workoutLength: 60,
          exercises: currentList,
        },
      });
    },
    [editWorkoutRequest],
  );

  return (
    <EditWorkoutTemplate
      workoutItems={state.workoutItems}
      dispatch={dispatch}
      isLoading={editWorkoutRequestState.loading}
      error={editWorkoutRequestState.error}
      onSubmit={handleEditWorkoutFormSubmit}
    />
  );
}