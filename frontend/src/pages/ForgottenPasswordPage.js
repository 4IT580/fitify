import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

import { ForgottenPasswordTemplate } from 'src/templates/ForgottenPasswordTemplate';

const FORGOTTEN_PASSWORD_MUTATION = gql`
  mutation ForgottenPassword($email: String!) {
    forgotten_password(email: $email)
  }
`;

export function ForgottenPasswordPage() {
  const history = useHistory();
  const [forgottenPasswordRequest, forgottenPasswordRequestState] = useMutation(
    FORGOTTEN_PASSWORD_MUTATION,
    {
      onCompleted: () => {
        history.replace('/');
      },
      onError: () => {},
    },
  );

  const handleForgottenPasswordFormSubmit = useCallback(
    (variables) => {
      forgottenPasswordRequest({ variables });
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
