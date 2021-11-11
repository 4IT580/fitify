import React, { useCallback } from 'react';
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
    )
  }
`;

export function SignUpPage() {
  const [signupRequest, signupRequestState] = useMutation(SIGNUP_MUTATION, {
    onCompleted: ({ signup }) => {
      console.log(signup);
    },
    onError: () => {
      console.log('error');
    },
  });

  const handleSignUpFormSubmit = useCallback(
    (values) => {
      console.log(values);
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
        },
      });
    },
    [signupRequest],
  );

  return (
    <SignUpTemplate
      isLoading={signupRequestState.loading}
      error={signupRequestState.error}
      onSubmit={handleSignUpFormSubmit}
    />
  );
}
