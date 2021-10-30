import React from 'react';

import { Heading, Link, RightBlockSection } from 'src/atoms/';
import { TopNavigation, ForgottenPasswordForm } from 'src/organisms/';

export function ForgottenPasswordTemplate({ isLoading, error, onSubmit }) {
  return (
    <>
      <TopNavigation />
      <RightBlockSection>
        <Heading>Zapomenuté heslo</Heading>
        <div className="mv2">
          zadejte svůj email, pošleme vám odkaz na změnu hesla
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
