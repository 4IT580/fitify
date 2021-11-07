import React from 'react';

import { Heading, Link, RightBlockSection } from 'src/atoms/';
import { ResetPasswordForm, TopNavigation } from 'src/organisms/';
import { route } from 'src/Routes';

export function ResetPasswordTemplate({ isLoading, error, onSubmit }) {
  return (
    <>
      <TopNavigation />
      <RightBlockSection>
        <Heading>Reset Password</Heading>

        <ResetPasswordForm
          isLoading={isLoading}
          errorMessage={error && error.message}
          onSubmit={onSubmit}
          className="mt3"
        />
      </RightBlockSection>
    </>
  );
}
