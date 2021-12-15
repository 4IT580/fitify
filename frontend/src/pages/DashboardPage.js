import React from 'react';
import { gql, useQuery } from '@apollo/client';

import { DashboardTemplate } from 'src/templates/DashboardTemplate';
import { useAuth } from 'src/utils/auth';

const USER_WORKOUTS_QUERY = gql`
  query UserDetail($id: Int!) {
    user(id: $id) {
      id
      workouts {
        id
        name
        intervalLength
        intervalPauseLength
        rounds
        roundsPauseLength
        exercises {
          id
        }
        history {
          id
          status
          startAt
          endAt
          calories
        }
      }
    }
  }
`;

export function DashboardPage() {
  const { user } = useAuth();

  let userId = null;
  if (user !== null) {
    userId = user.id;
  }

  const userFetcher = useQuery(USER_WORKOUTS_QUERY, {
    variables: {id: userId},
  });

  return (
    <DashboardTemplate
      data={userFetcher.data}
      error={userFetcher.error}
      isLoading={userFetcher.loading}
      refetch={() => userFetcher.refetch()}
      currentUser={user}
    />
  );
}
