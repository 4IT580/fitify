import React, { useCallback, useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';
import { route } from 'src/Routes';
import { FinishWorkoutTemplate } from '../templates/FinishWorkoutTemplate';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FINISH_WORKOUT_MUTATION = gql`
  mutation FinishWorkout($workoutPlanId: Int!, $startTime: Float!) {
    finishWorkout(workoutPlanId: $workoutPlanId, startTime: $startTime)
  }
`;

const SET_FINISHED_WORKOUT_CALORIES = gql`
  mutation SetFinishedWorkoutCalories($workoutPlanId: Int!, $calories: Int!) {
    setCaloriesFinishedWorkout(
      workoutPlanId: $workoutPlanId
      calories: $calories
    )
  }
`;

const WORKOUT_PLAN_QUERY = gql`
  query WorkoutPlanDetail($id: Int!) {
    workoutPlan(id: $id) {
      name
    }
  }
`;

export function FinishWorkoutPage() {
  const { workoutPlanId, startTime } = useParams();

  const [successMessage, setSuccessMessage] = useState(
    <FontAwesomeIcon icon={faDumbbell} spin />,
  );
  const [isWaiting, setIsWaiting] = useState(false);
  const history = useHistory();

  const workoutPlanState = useQuery(WORKOUT_PLAN_QUERY, {
    variables: { id: parseInt(workoutPlanId) },
  });
  const [workoutName, setWorkoutName] = useState('');

  useEffect(() => {
    if (workoutPlanState.loading === false) {
      setWorkoutName(workoutPlanState.data.workoutPlan.name);
    }
  }, [workoutPlanState]);

  const [setFinishedWorkoutCalories, setFinishedWorkoutCaloriesState] =
    useMutation(SET_FINISHED_WORKOUT_CALORIES, {
      onCompleted: () => {
        setSuccessMessage(
          'Your calories are saved. You are now being redirected to dashboard page',
        );
        setIsWaiting(true);
        setTimeout(function () {
          history.replace(route.dashboard());
        }, 5000);
      },
      onError: (error) => {
        console.error(error);
      },
    });

  const [setFinishedWorkout] = useMutation(FINISH_WORKOUT_MUTATION, {
    onCompleted: () => {
      setSuccessMessage(
        'Your training has been finished. If you wish to, you can set your calories',
      );
      console.log('done');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSetFinishedWorkoutCaloriesFormSubmit = useCallback(
    (values) => {
      setFinishedWorkoutCalories({
        variables: {
          workoutPlanId: parseInt(workoutPlanId),
          calories: values.calories,
        },
      });
    },
    [setFinishedWorkoutCalories, workoutPlanId],
  );

  useEffect(() => {
    setTimeout(function () {
      setFinishedWorkout({
        variables: {
          workoutPlanId: parseInt(workoutPlanId),
          startTime: parseFloat(startTime),
        },
      });
    }, 5000);
  }, [setFinishedWorkout, workoutPlanId, startTime]);

  return (
    <FinishWorkoutTemplate
      isLoading={setFinishedWorkoutCaloriesState.loading || isWaiting === true}
      error={setFinishedWorkoutCaloriesState.error}
      successMessage={successMessage}
      onSubmit={handleSetFinishedWorkoutCaloriesFormSubmit}
      workoutName={workoutName}
    />
  );
}
