import React, { useCallback, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import { useHistory } from 'react-router-dom';

import queryString from 'query-string';
import { ResetPasswordTemplate } from 'src/templates/ResetPasswordTemplate';

import { route } from 'src/Routes';

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword( $newPassword: String!, $passwordToken: String!){
    resetPassword( newPassword: $newPassword, passwordToken: $passwordToken){
      token
      user{
        id
        name
      }
    }
  }`;

export function ResetPasswordPage() {
  const queryParams = queryString.parse(window.location.search);
  const [successMessage,setSuccessMessage]=useState(null);
  const token = queryParams.__token;
  const history = useHistory();

  const [resetPasswordRequest, resetPasswordRequestState] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      onCompleted: () => {
        setSuccessMessage("Your password is reset.\nNow You are being redirected to the Sign In page.");
        setTimeout(function(){ window.location.href = route.signIn();}, 5000);
        setTimeout(function(){ history.replace('/');}, 6000);
      },
      onError: (error) => {
        console.error(error);
      },
    },
  );

  const handleResetPasswordFormSubmit = useCallback(
    (values) => {
      console.log(values);
      resetPasswordRequest({
        variables: { newPassword: values.password, passwordToken: token },
      });
    },
    [resetPasswordRequest],
  );

  return (
    <ResetPasswordTemplate
      isLoading={resetPasswordRequestState.loading}
      error={resetPasswordRequestState.error}
      successMessage={successMessage}
      onSubmit={handleResetPasswordFormSubmit}
    />
  );

}
