import React from 'react';

import { Heading, Link, RightBlockSection } from 'src/atoms/';
import { SignInForm, TopNavigation, MobileTopNavigation } from 'src/organisms/';

export function SignInTemplate({ isLoading, error, onSubmit }) {
  return (
    <>
      <TopNavigation />
      <MobileTopNavigation />
      <RightBlockSection>
        <Heading>Sign In</Heading>
        <SignInForm
          isLoading={isLoading}
          errorMessage={error && error.message}
          onSubmit={onSubmit}
          className="mt3"
        />
      </RightBlockSection>
    </>
  );
}
