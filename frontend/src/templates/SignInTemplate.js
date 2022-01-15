import React from 'react';

import { Heading, RightBlockSection } from 'src/atoms/';
import { SignInForm } from 'src/organisms/';
import { PageLayout } from '../organisms';

export function SignInTemplate({ isLoading, error, onSubmit }) {
  return (
    <>
      <PageLayout bgClass={'background background-gym-clap'}>
        <RightBlockSection>
          <Heading className={'green'}>Sign In</Heading>
          <SignInForm
            isLoading={isLoading}
            errorMessage={error && error.message}
            onSubmit={onSubmit}
            className="mt3 green"
          />
        </RightBlockSection>
      </PageLayout>
    </>
  );
}
