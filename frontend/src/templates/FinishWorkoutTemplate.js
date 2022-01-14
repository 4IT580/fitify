import React from 'react';

import { Heading, RightBlockSection } from 'src/atoms/';
import { PageLayout } from 'src/organisms/';
import { FinishWorkoutForm } from '../organisms/FinishWorkoutForm';
import { Link } from '../atoms';
import { route } from '../Routes';

export function FinishWorkoutTemplate({
  isLoading,
  error,
  onSubmit,
  successMessage,
  workoutName,
}) {
  return (
    <>
      <PageLayout bgClass={'background background-gym-dumbbell'}>
        <RightBlockSection>
          <Heading>Training finished: {workoutName}</Heading>

          <FinishWorkoutForm
            isLoading={isLoading}
            errorMessage={error && error.message}
            successMessage={successMessage}
            onSubmit={onSubmit}
            className="mt3"
          >
            {successMessage.length > 10 && (
              <Link
                disabled={'disabled'}
                className={
                  'dim dib bg-animate pv2 ph4 br-pill pointer green bg-dark fr mt2'
                }
                noUnderline={true}
                to={route.dashboard()}
              >
                Go to dashboard
              </Link>
            )}
          </FinishWorkoutForm>
        </RightBlockSection>
      </PageLayout>
    </>
  );
}
