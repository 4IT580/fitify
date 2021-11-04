import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';

import { ForgottenPasswordTemplate } from 'src/templates/ForgottenPasswordTemplate';

const FORGOTTEN_PASSWORD_MUTATION = gql`
  mutation ForgottenPassword($email: String!, $appOrigin: String!) {
    forgottenPassword(email: $email, appOrigin: $appOrigin)
  }
`;

export function ForgottenPasswordPage() {
  const [forgottenPasswordRequest, forgottenPasswordRequestState] = useMutation(
    FORGOTTEN_PASSWORD_MUTATION,
    {
      onCompleted: () => {
        console.log('Pro nastavení nového hesla klikněte na odkaz v emailu.');
      },
      onError: (error) => {
        console.error(error);
      },
    },
  );

  const handleForgottenPasswordFormSubmit = useCallback(
    (formVariables) => {
      forgottenPasswordRequest({
        variables: {
          email: formVariables.email,
          appOrigin: window.location.origin,
        },
      });
    },
    [forgottenPasswordRequest],
  );

  return (
    <ForgottenPasswordTemplate
      isLoading={forgottenPasswordRequestState.loading}
      error={forgottenPasswordRequestState.error}
      onSubmit={handleForgottenPasswordFormSubmit}
    />
  );
}
