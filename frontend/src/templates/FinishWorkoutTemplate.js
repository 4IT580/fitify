import React from 'react';

import { Heading, RightBlockSection } from 'src/atoms/';
import { ResetPasswordForm, PageLayout } from 'src/organisms/';
import { FinishWorkoutForm } from "../organisms/FinishWorkoutForm";

export function FinishWorkoutTemplate({
  isLoading,
  error,
  onSubmit,
  successMessage,
  workoutName
}) {
  return (
    <>
      <PageLayout bgClass={'background background-gym-dumbbell'}>
        <RightBlockSection>
          <Heading>Training finished: {workoutName}</Heading>

          <p></p>
          <FinishWorkoutForm
            isLoading={isLoading}
            errorMessage={error && error.message}
            successMessage={successMessage}
            onSubmit={onSubmit}
            className="mt3"
          />
        </RightBlockSection>
      </PageLayout>
    </>
  );
}
