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

const ARCHIVE_WORKOUT_MUTATION = gql`
  mutation ArchiveWorkout($workoutPlanId: Int!) {
    archiveWorkout(workoutPlanId: $workoutPlanId)
  }
`;

export function ArchiveWorkoutPage() {
  const { workoutPlanId } = useParams();
  const history = useHistory();
  const [message, setMessage] = useState(null);

  const [setArchivedWorkout, setArchivedWorkoutState] = useMutation(
    ARCHIVE_WORKOUT_MUTATION,
    {
      onCompleted: () => {
        setMessage(
          <SuccessMessage>
            Training archived, redirecting to training Detail
          </SuccessMessage>,
        );

        setTimeout(function () {
          history.replace(route.workout(workoutPlanId));
        }, 2000);
      },
      onError: (error) => {
        setMessage(<ErrorMessage>Something broke....</ErrorMessage>);
      },
    },
  );

  useEffect(() => {
    setArchivedWorkout({
      variables: {
        workoutPlanId: parseInt(workoutPlanId),
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageLayout bgClass={'background background-gym-dumbbell'}>
        {(setArchivedWorkoutState.loading === true && <Loading />) || (
          <RightBlockSection>
            <SuccessBanner>{message}</SuccessBanner>
          </RightBlockSection>
        )}
      </PageLayout>
    </>
  );
}
