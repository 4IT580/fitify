import React, { useReducer, useCallback, useState } from 'react';
import { EditWorkoutTemplate } from 'src/templates/EditWorkoutTemplate';
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

const EDITWORKOUT_MUTATION = gql`
  mutation EditWorkout(
    $workoutPlanId: Int!
    $name: String!
    $rounds: Int!
    $intLength: Int!
    $intPauseLength: Int!
    $roundsPauseLength: Int!
    $workoutLength: Int!
    $exercises: [ExerciseInput]!
  ) {
    editWorkout(
      workoutPlanId: $workoutPlanId
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
        console.log('edit error');
      },
    },
  );
  const exercises = useQuery(EXERCISES_QUERY, {
    onCompleted(data) {
      dispatch(loadedData(data));
    },
  });

  const [state, dispatch] = useReducer(listExerciseReducer, initialState);
  let currentList = state.workout.map((value) => {
    let list = {
      id: value.id,
      sequence: value.position,
    };
    return list;
  });

  const handleEditWorkoutFormSubmit = useCallback(
    (values) => {
      editWorkoutRequest({
        variables: {
          workoutPlanId: values.workoutPlanId,
          name: values.name,
          rounds: values.rounds,
          intLength: values.intLength,
          intPauseLength: values.intPauseLength,
          roundsPauseLength: values.roundsPauseLength,
          workoutLength: 0,
          exercises: [],
        },
      });
    },
    [editWorkoutRequest, currentList],
  );

  return (
    <EditWorkoutTemplate
      workout={state.workout}
      workoutItems={state.workoutItems}
      dispatch={dispatch}
      isLoading={editWorkoutRequestState.loading}
      error={editWorkoutRequestState.error}
      onSubmit={handleEditWorkoutFormSubmit}
    />
  );
}
