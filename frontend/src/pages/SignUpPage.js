import React, { useCallback, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import { SignUpTemplate } from 'src/templates/SignUpTemplate';

const SIGNUP_MUTATION = gql`
  mutation SignUp(
    $email: String!
    $password: String!
    $name: String!
    $surname: String!
    $height: Int!
    $weight: Int!
    $sex: String!
    $birthdate: String!
    $appOrigin: String!
  ) {
    signup(
      email: $email
      password: $password
      name: $name
      surname: $surname
      height: $height
      weight: $weight
      sex: $sex
      birthdate: $birthdate
      appOrigin: $appOrigin
    )
  }
`;

export function SignUpPage() {
  const [successMessage, setSuccessMessage] = useState(null);
  const [signupRequest, signupRequestState] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      setSuccessMessage(
        'Your account has been created successfully. An email with activation link has been sent to provided email address.',
      );
    },
    onError: () => {
      console.log('error');
    },
  });

  const handleSignUpFormSubmit = useCallback(
    (values) => {
      signupRequest({
        variables: {
          name: values.name,
          surname: values.surname,
          email: values.email,
          password: values.password,
          height: values.height,
          weight: values.weight,
          sex: values.sex,
          birthdate: values.birthdate,
          appOrigin: window.location.origin,
        },
      });
    },
    [signupRequest],
  );

  return (
    <SignUpTemplate
      isLoading={signupRequestState.loading}
      error={signupRequestState.error}
      successMessage={successMessage}
      onSubmit={handleSignUpFormSubmit}
    />
  );
}
