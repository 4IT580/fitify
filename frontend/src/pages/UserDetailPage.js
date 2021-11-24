import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

import { UserDetailTemplate } from 'src/templates/UserDetailTemplate';
import { PageNotFound } from './PageNotFound';
import { useAuth } from 'src/utils/auth';

const USER_DETAIL_QUERY = gql`
  query UserDetail($id: Int!) {
    user(id: $id) {
      name
      email
    }
  }
`;

export function UserDetailPage() {
  const { user } = useAuth();

  const userFetcher = useQuery(USER_DETAIL_QUERY, {
    variables: { id: user.id },
  });

  if (userFetcher.data && userFetcher.data.user === null) {
    return <PageNotFound />;
  }

  return (
    <UserDetailTemplate
      data={userFetcher.data}
      loading={userFetcher.loading}
      error={userFetcher.error}
      onReload={() => userFetcher.refetch()}
      currentUser={user}
      userName={''}
    />
  );
}
