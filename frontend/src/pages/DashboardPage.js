import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';

import { DashboardTemplate } from 'src/templates/DashboardTemplate';
import { PageNotFound } from './PageNotFound';
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
        exercises{
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

export function DashboardPage () {
  const {user} = useAuth();

  let userId = null
  if (user !== null) {
    userId = user.id;
  }

  console.log(user);
  console.log(userId);

  const userFetcher = useQuery(USER_WORKOUTS_QUERY, {
    // variables: {id: userId},
    variables: {id: 4},
  });

  if (userFetcher.data && userFetcher.data.user === null) {
    return <PageNotFound/>;
  }

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
