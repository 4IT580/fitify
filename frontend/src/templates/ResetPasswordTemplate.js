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
      <PageLayout>
        <RightBlockSection>
          <Heading>Reset Password</Heading>

          <ResetPasswordForm
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
