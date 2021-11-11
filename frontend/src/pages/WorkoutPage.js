import React from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';

import { WorkoutTemplate } from "../templates/WorkoutTemplate";
import { useParams } from "react-router-dom";
import { useAuth } from "../utils/auth";

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

export function WorkoutPage () {
  const { user } = useAuth();
  const { userName, workoutPlanId } = useParams();

  const workoutPlanState = useQuery(WORKOUT_PLAN_QUERY, {
    variables: {id: parseInt(workoutPlanId)}
  });

  return <WorkoutTemplate
    data={workoutPlanState.data}
    error={workoutPlanState.error}
    loading={workoutPlanState.loading}
    refetch={() => workoutPlanState.refetch()}
    currentUser={user}
  />;
}
