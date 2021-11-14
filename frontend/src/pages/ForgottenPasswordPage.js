import React, { useCallback,useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import { ForgottenPasswordTemplate } from 'src/templates/ForgottenPasswordTemplate';

const FORGOTTEN_PASSWORD_MUTATION = gql`
  mutation ForgottenPassword($email: String!, $appOrigin: String!) {
    forgottenPassword(email: $email, appOrigin: $appOrigin)
  }
`;

export function ForgottenPasswordPage() {
  const [successMessage,setSuccessMessage]=useState(null);

  const [forgottenPasswordRequest, forgottenPasswordRequestState] = useMutation(
    FORGOTTEN_PASSWORD_MUTATION,
    {
      onCompleted: () => {
        setSuccessMessage("A link to change your password has been sent to your email.");
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
      successMessage={successMessage}
      onSubmit={handleForgottenPasswordFormSubmit}
    />
  );
}
