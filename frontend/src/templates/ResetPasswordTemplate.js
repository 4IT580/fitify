import React from 'react';

import { Heading, RightBlockSection } from 'src/atoms/';
import { ResetPasswordForm, PageLayout } from 'src/organisms/';

export function ResetPasswordTemplate({
  isLoading,
  error,
  onSubmit,
  successMessage,
}) {
  return (
    <>
      <PageLayout bgClass={'background background-gym-clap'}>
        <RightBlockSection>
          <Heading className={'green'}>Reset Password</Heading>

          <ResetPasswordForm
            isLoading={isLoading}
            errorMessage={error && error.message}
            successMessage={successMessage}
            onSubmit={onSubmit}
            className="mt3 green"
          />
        </RightBlockSection>
      </PageLayout>
    </>
  );
}
