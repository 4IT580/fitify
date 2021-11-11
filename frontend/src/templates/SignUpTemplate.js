import React from 'react';

import { Heading, Link, RightBlockSection } from 'src/atoms/';
import { SignUpForm, TopNavigation, MobileTopNavigation } from 'src/organisms/';
import { route } from 'src/Routes';

export function SignUpTemplate({ isLoading, error, onSubmit }) {
  return (
    <>
      <TopNavigation />
      <MobileTopNavigation />
      <RightBlockSection>
        <Heading>Sign Up</Heading>

        <SignUpForm
          isLoading={isLoading}
          errorMessage={error && error.message}
          onSubmit={onSubmit}
          className="mt3"
        />
      </RightBlockSection>
    </>
  );
}
