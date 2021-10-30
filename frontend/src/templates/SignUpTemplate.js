import React from 'react';

import { Heading, Link, RightBlockSection } from 'src/atoms/';
import { SignUpForm, TopNavigation } from 'src/organisms/';
import { route } from 'src/Routes';

export function SignUpTemplate({ isLoading, error, onSubmit }) {
  return (
    <>
      <TopNavigation />
      <RightBlockSection>
        <Heading>Sign Up</Heading>

        <SignUpForm
          isLoading={isLoading}
          errorMessage={error && error.message}
          onSubmit={onSubmit}
          className="mt3"
        ></SignUpForm>
      </RightBlockSection>
    </>
  );
}
