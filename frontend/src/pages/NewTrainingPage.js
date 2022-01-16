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
  const { workoutPlanIdToDuplicate } = useParams();

  const [successMessage, setSuccessMessage] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);
  const [createWorkoutRequest, createWorkoutRequestState] = useMutation(
    CREATEWORKOUT_MUTATION,
    {
      onCompleted: (data) => {
        setSuccessMessage('Training was successfully created.');

        setIsWaiting(true);
        setTimeout(function () {
          history.replace(route.workout(data.createWorkout));
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
    skip: workoutPlanIdToDuplicate === undefined,
    variables: { id: parseInt(workoutPlanIdToDuplicate) },
    onCompleted(data) {
      dispatch(loadedPlanData(data.workoutPlan));
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
      workoutPlan={state.workoutPlan}
      dispatch={dispatch}
      successMessage={successMessage}
      isLoading={createWorkoutRequestState.loading || isWaiting === true}
      error={createWorkoutRequestState.error}
      onSubmit={handleCreateWorkoutFormSubmit}
    />
  );
}
