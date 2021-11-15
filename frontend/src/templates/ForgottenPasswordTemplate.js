import React from 'react';

import { Heading, Link, RightBlockSection } from 'src/atoms/';
import { TopNavigation, ForgottenPasswordForm } from 'src/organisms/';

export function ForgottenPasswordTemplate({
  isLoading,
  error,
  onSubmit,
  successMessage,
}) {
  return (
    <>
      <TopNavigation />
      <RightBlockSection>
        <Heading>Forgotten password</Heading>
        <div className="mv2 f3 f5-ns">
          Please insert your email in the form below and we will send you link
          for password reset.
        </div>
        <ForgottenPasswordForm
          isLoading={isLoading}
          errorMessage={error && error.message}
          successMessage={successMessage}
          onSubmit={onSubmit}
          className="pt3"
        />
      </RightBlockSection>
    </>
  );
}
