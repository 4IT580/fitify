import React from 'react';

import { Heading, Link, RightBlockSection } from 'src/atoms/';
import { SignInForm, TopNavigation } from 'src/organisms/';

export function SignInTemplate({ isLoading, error, onSubmit }) {
  return (
    <>
      <TopNavigation />
      <RightBlockSection>
        <Heading>Sign In</Heading>
        <SignInForm
          isLoading={isLoading}
          errorMessage={error && error.message}
          onSubmit={onSubmit}
          className="mt3"
<<<<<<< HEAD
        />
      </RightBlockSection>
=======
        >
          <div className="lh-copy">
            or{' '}
            <Link className="f5 dark green" to={route.signUp()}>
              Sign Up
            </Link>
          </div>
        </SignInForm>
      </MainSection>
    </>
  );
}
