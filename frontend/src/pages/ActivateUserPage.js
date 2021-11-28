import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';

import { useHistory } from 'react-router-dom';

import queryString from 'query-string';

import { route } from 'src/Routes';
import { ActivateUserTemplate } from '../templates/ActivateUserTemplate';

const RESET_PASSWORD_MUTATION = gql`
  mutation ActivateUser($activateToken: String!) {
    activateUser(activateToken: $activateToken)
  }
`;

export function ActivateUserPage() {
  const queryParams = queryString.parse(window.location.search);
  const token = queryParams.__token;
  const history = useHistory();

  const [activateUserRequest, activateUserRequestState] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      onCompleted: () => {
        setTimeout(function () {
          history.replace(route.signIn());
        }, 5000);
      },
      onError: (error) => {
        console.error(error);
      },
    },
  );

  const handleResetPasswordFormSubmit = useCallback(() => {
    activateUserRequest({
      variables: { activateToken: token },
    });
  }, [activateUserRequest, token]);

  return (
    <ActivateUserTemplate
      error={activateUserRequestState.error}
      onLoad={handleResetPasswordFormSubmit}
    />
  );
}
