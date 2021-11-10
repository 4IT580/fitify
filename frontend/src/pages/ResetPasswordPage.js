import React, { useCallback, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import { useHistory } from 'react-router-dom';

import queryString from 'query-string';
import { ResetPasswordTemplate } from 'src/templates/ResetPasswordTemplate';

import { route } from 'src/Routes';

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword( $token: String!, $newPassword: String!){
    resetPassword( token: $token, newPassword: $newPassword){
      token
    }
  }
  `;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

export function ResetPasswordPage() {
  const queryParams = queryString.parse(window.location.search);
  const [successMessage,setSuccessMessage]=useState(null);
  const token = queryParams.__token;
  const history = useHistory();

  const [resetPasswordRequest, resetPasswordRequestState] = useMutation(
    RESET_PASSWORD_MUTATION,
    {
      onCompleted: () => {
        setSuccessMessage("OK");
        //setTimeout(() => {  route.signIn(); }, 5000);
        sleep(5000).then(() => { route.signIn(); });
        //přidat 5sec delay
        history.replace('/');
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
        values: { newPassword: values.newPassword, token: token },
      });
    },
    [resetPasswordRequest],
  );

  /*
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
  */
  return (
    <ResetPasswordTemplate
      isLoading={resetPasswordRequestState.loading}
      error={resetPasswordRequestState.error}
      successMessage={successMessage}
      onSubmit={handleResetPasswordFormSubmit}
    />
  );

}
