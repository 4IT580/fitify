import React from 'react';

import { Heading, RightBlockSection } from 'src/atoms/';
import { SignUpForm } from 'src/organisms/';
import { PageLayout } from '../organisms';

export function SignUpTemplate({ isLoading, error, onSubmit, successMessage }) {
  return (
    <>
      <PageLayout bgClass={'background background-gym-clap'}>
        <RightBlockSection>
          <Heading className={'green'}>Sign Up</Heading>

          <SignUpForm
            isLoading={isLoading}
            errorMessage={error && error.message}
            successMessage={successMessage}
            onSubmit={onSubmit}
            className="mt3 green"
          />
        </RightBlockSection>
      </PageLayout>
    </>
  );
}
