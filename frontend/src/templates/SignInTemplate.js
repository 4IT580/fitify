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
        </>
      </RightBlockSection>
       <>
          <div className="lh-copy">
            or{' '}
<<<<<<< HEAD
            <Link className="f5 dark green" to={route.signUp()}>

=======
            <Link className="f5 gray" to={route.signUp()}>
>>>>>>> accfeb964ef39717cac706bdb185dcd3e783db30
              Sign Up
            </Link>
          </div>
        </SignInForm>
      </MainSection>
    </>
  );
}
