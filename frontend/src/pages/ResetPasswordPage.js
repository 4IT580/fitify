import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';

import queryString from 'query-string';

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;

export function ResetPasswordPage() {
  const queryParams = queryString.parse(window.location.search);
  const token = queryParams.__token;

  const [resetPasswordRequest, resetPasswordRequestState] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      onCompleted: () => {
        console.log('Pro nastavení nového hesla klikněte na odkaz v emailu.');
      },
      onError: (error) => {
        console.error(error);
      },
    },
  );

  const handleResetPasswordFormSubmit = useCallback(
    (formVariables) => {
      resetPasswordRequest({
        variables: { newPassword: formVariables.newPassword, token: token },
      });
    },
    [resetPasswordRequest],
  );

  return (
    <div>
      call this in graphql:
      <pre>
        {`
    resetPassword(token: "`}
        {token}
        {`", newPassword: "foobar"){
      user {
        id
          }
      token
    }
      `}
      </pre>
    </div>
  );
}
