import React from 'react';

import { Heading, Link, RightBlockSection } from 'src/atoms/';
import { SignUpForm, TopNavigation } from 'src/organisms/';
import { route } from 'src/Routes';

export function SignUpTemplate({ isLoading, error, onSubmit, successMessage }) {
  return (
    <>
      <TopNavigation />
      <RightBlockSection>
        <Heading>Sign Up</Heading>

        <SignUpForm
          isLoading={isLoading}
          errorMessage={error && error.message}
          successMessage={successMessage}
          onSubmit={onSubmit}
          className="mt3"
        />
      </RightBlockSection>
    </>
  );
}
