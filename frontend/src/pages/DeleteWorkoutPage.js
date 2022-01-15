import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';
import { route } from 'src/Routes';
import {
  ErrorMessage,
  Loading,
  RightBlockSection,
  SuccessBanner,
  SuccessMessage,
} from '../atoms';
import { PageLayout } from '../organisms';

const DELETE_WORKOUT_MUTATION = gql`
  mutation DeleteWorkout($workoutPlanId: Int!) {
    deleteWorkout(workoutPlanId: $workoutPlanId)
  }
`;

export function DeleteWorkoutPage() {
  const { workoutPlanId } = useParams();
  const history = useHistory();
  const [message, setMessage] = useState(null);

  const [setDeletedWorkout, setDeletedWorkoutState] = useMutation(
    DELETE_WORKOUT_MUTATION,
    {
      onCompleted: () => {
        setMessage(
          <SuccessMessage>
            Training deleted, redirecting to Dashboard
          </SuccessMessage>,
        );

        setTimeout(function () {
          history.replace(route.dashboard());
        }, 2000);
      },
      onError: (error) => {
        setMessage(<ErrorMessage>Something broke....</ErrorMessage>);
      },
    },
  );

  useEffect(() => {
    setDeletedWorkout({
      variables: {
        workoutPlanId: parseInt(workoutPlanId),
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageLayout bgClass={'background background-gym-dumbbell'}>
        {(setDeletedWorkoutState.loading === true && <Loading />) || (
          <RightBlockSection>
            <SuccessBanner>{message}</SuccessBanner>
          </RightBlockSection>
        )}
      </PageLayout>
    </>
  );
}
