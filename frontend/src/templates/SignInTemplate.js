import React from 'react';

import { Heading, RightBlockSection } from 'src/atoms/';
import { SignInForm, TopNavigation } from 'src/organisms/';
import { PageLayout } from "../organisms";

export function SignInTemplate({ isLoading, error, onSubmit }) {
  return (
    <>
      <PageLayout bgClass={'background background-gym-clap'}>
        <RightBlockSection>
          <Heading>Sign In</Heading>
          <SignInForm
            isLoading={isLoading}
            errorMessage={error && error.message}
            onSubmit={onSubmit}
            className="mt3"
          />
        </RightBlockSection>
      </PageLayout>
    </>
  );
}
