import React, { useCallback, useReducer, useState } from 'react';
import { NewTrainingTemplate } from 'src/templates/NewTrainingTemplate';
import { useHistory, useParams } from 'react-router-dom';
import {
  initialState,
  listExerciseReducer,
  loadedData,
  loadedPlanData,
} from 'src/reducers/listExerciseReducer';

import { gql, useMutation, useQuery } from '@apollo/client';
import { route } from '../Routes';

const EXERCISES_QUERY = gql`
  query Exercises {
    exercises {
      id
      name
    }
  }
`;

const WORKOUT_PLAN_LOAD_QUERY = gql`
  query WorkoutPlan($id: Int!) {
    workoutPlan(id: $id) {
      name
      rounds
      roundsPauseLength
      intervalLength
      intervalPauseLength
      exercises {
        name
        id
        sequence
      }
    }
  }
`;

const EDIT_WORKOUT_MUTATION = gql`
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

export function EditTrainingPage() {
  const history = useHistory();
  const { workoutPlanIdToEdit } = useParams();

  const [successMessage, setSuccessMessage] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [editWorkoutRequest, editWorkoutRequestState] = useMutation(
    EDIT_WORKOUT_MUTATION,
    {
      onCompleted: (data) => {
        setSuccessMessage('Training was successfully edited.');

        setIsWaiting(true);
        setTimeout(function () {
          history.replace(route.workout(data.editWorkout));
        }, 5000);
      },
      onError: (error) => {
        console.error(error);
      },
    },
  );

  useQuery(EXERCISES_QUERY, {
    onCompleted(data) {
      dispatch(loadedData(data));
    },
  });

  useQuery(WORKOUT_PLAN_LOAD_QUERY, {
    variables: { id: parseInt(workoutPlanIdToEdit) },
    onCompleted(data) {
      dispatch(loadedPlanData(data.workoutPlan));
    },
  });

  const [state, dispatch] = useReducer(listExerciseReducer, initialState);

  const handleCreateWorkoutFormSubmit = useCallback(
    (values) => {
      editWorkoutRequest({
        variables: {
          workoutPlanId: parseInt(workoutPlanIdToEdit),
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
    [editWorkoutRequest, workoutPlanIdToEdit],
  );

  return (
    <NewTrainingTemplate
      workout={state.workout}
      workoutItems={state.workoutItems}
      workoutPlan={state.workoutPlan}
      dispatch={dispatch}
      successMessage={successMessage}
      isLoading={editWorkoutRequestState.loading || isWaiting === true}
      error={editWorkoutRequestState.error}
      onSubmit={handleCreateWorkoutFormSubmit}
      submitText={'Save training'}
    />
  );
}
