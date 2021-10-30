import React from 'react';

import { Heading, Link, RightBlockSection } from 'src/atoms/';
import { TopNavigation, ForgottenPasswordForm } from 'src/organisms/';

export function ForgottenPasswordTemplate({ isLoading, error, onSubmit }) {
  return (
    <>
      <TopNavigation />
      <RightBlockSection>
        <Heading>Forgotten password</Heading>
        <div className="mv2 f3 f5-ns">
          Insert your email, well send you link for password reset
        </div>
        <ForgottenPasswordForm
          isLoading={isLoading}
          errorMessage={error && error.message}
          onSubmit={onSubmit}
          className="pt3"
        />
      </RightBlockSection>
    </>
  );
}
