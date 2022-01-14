import ActiveWorkoutPage from 'src/pages/ActiveWorkoutPage';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import store from '../utils/store';
import { useEffect, useState } from 'react';
import {
  addExercise,
  initialState,
  setStartTime,
  updateSets,
  updateTime,
} from '../utils/Actions';
import types from '../utils/types';
import { planEta } from '../utils/date';

const WORKOUT_PLAN_QUERY = gql`
  query WorkoutPlanDetail($id: Int!) {
    workoutPlan(id: $id) {
      id
      name
      rounds
      roundsPauseLength
      intervalLength
      intervalPauseLength
      workoutLength
      createdAt
      exercises {
        id
        name
        description
        bodyParts {
          id
          name
        }
        equipment {
          id
          name
        }
      }
      history {
        id
        calories
        status
        startAt
        endAt
      }
    }
  }
`;

export function TimerWrapperPage() {
  const { workoutPlanId } = useParams();
  const workoutPlanState = useQuery(WORKOUT_PLAN_QUERY, {
    variables: { id: parseInt(workoutPlanId) },
  });

  const [workoutName, setWorkoutName] = useState('');
  const [totalTime, setTotalWorkoutTime] = useState(0);

  useEffect(() => {
    if (workoutPlanState.loading === false) {
      store.dispatch(initialState());

      workoutPlanState.data.workoutPlan.exercises.forEach((item) => {
        store.dispatch(addExercise(item.name));
      });

      store.dispatch(setStartTime(new Date()));

      store.dispatch(updateSets('', workoutPlanState.data.workoutPlan.rounds));
      store.dispatch(
        updateTime(
          types.UPDATE_WORK_TIME,
          workoutPlanState.data.workoutPlan.intervalLength,
        ),
      );
      store.dispatch(
        updateTime(
          types.UPDATE_REST_TIME,
          workoutPlanState.data.workoutPlan.intervalPauseLength,
        ),
      );

      setWorkoutName(workoutPlanState.data.workoutPlan.name);
      setTotalWorkoutTime(planEta(workoutPlanState.data.workoutPlan));
    }
  }, [workoutPlanState]);

  return (
    <ActiveWorkoutPage
      workoutName={workoutName}
      workoutPlanId={workoutPlanId}
      workoutTotalTime={totalTime}
    />
  );
}
