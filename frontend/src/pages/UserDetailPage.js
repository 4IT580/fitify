import React, { useCallback, useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

import { UserDetailTemplate } from 'src/templates/UserDetailTemplate';
import { PageNotFound } from './PageNotFound';
import { useAuth } from 'src/utils/auth';

const USER_DETAIL_QUERY = gql`
  query UserDetail($id: Int!) {
    user(id: $id) {
      id
      name
      surname
      email
      password
      height
      weight
      sex
      birthdate
    }
  }
`;

const USER_DETAIL_MUTATION = gql`
  mutation SetUserDetail(
    $id: Int!
    $name: String!
    $surname: String!
    $height: Int!
    $weight: Float!
    $sex: String!
    $birthdate: String!
  ) {
    setUserDetail(
      id: $id
      name: $name
      surname: $surname
      height: $height
      weight: $weight
      sex: $sex
      birthdate: $birthdate
    )
  }
`;

const USER_PASSWORD_CHANGE_MUTATION = gql`
  mutation ChangePassword(
    $id: Int!
    $currentPassword: String!
    $newPassword: String!
  ) {
    changePassword(
      id: $id
      currentPassword: $currentPassword
      newPassword: $newPassword
    )
  }
`;

export function UserDetailPage() {
  const { user } = useAuth();

  const userFetcher = useQuery(USER_DETAIL_QUERY, {
    variables: { id: user.id },
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [userDetailRequest, userDetailRequestState] = useMutation(
    USER_DETAIL_MUTATION,
    {
      onCompleted: (data) => {
        setSuccessMessage(
          'Your account details have been changed succesfully.',
        );
      },
      onError: (e) => {
        console.log('error', e);
      },
    },
  );

  const [userPasswordRequest, userPasswordRequestState] = useMutation(
    USER_PASSWORD_CHANGE_MUTATION,
    {
      onCompleted: (data) => {
        setSuccessMessage('Your password has been succesfully changed.');
      },
      onError: (e) => {
        console.log('error', e);
      },
    },
  );

  const handleUserDetailSubmit = useCallback(
    (values) => {
      userDetailRequest({
        variables: {
          id: user.id,
          name: values.name,
          surname: values.surname,
          password: values.password,
          height: values.height,
          weight: values.weight,
          sex: values.sex,
          birthdate: values.birthdate,
        },
      });
    },
    [userDetailRequest, user],
  );

  const handleUserPasswordChange = useCallback(
    (values) => {
      userPasswordRequest({
        variables: {
          id: user.id,
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        },
      });
    },
    [userPasswordRequest, user],
  );

  if (userFetcher.data && userFetcher.data.user === null) {
    return <PageNotFound />;
  }

  return (
    <UserDetailTemplate
      data={userFetcher.data}
      loading={userFetcher.loading}
      errorDetail={userDetailRequestState.error}
      errorPassword={userPasswordRequestState.error}
      successMessage={successMessage}
      onSubmit={handleUserDetailSubmit}
      onPasswordChange={handleUserPasswordChange}
      onReload={() => userFetcher.refetch()}
    />
  );
}
