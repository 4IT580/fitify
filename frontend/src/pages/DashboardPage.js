import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';

import { DashboardTemplate } from 'src/templates/DashboardTemplate';
import { PageNotFound } from './PageNotFound';
import { useAuth } from 'src/utils/auth';

const USER_WORKOUTS_QUERY = gql`
  query UserDetail($userName: String!) {
    user(userName: $userName) {
      id
      name
      surname
      profileImageUrl
      quacks {
        id
        createdAt
        text
        user {
          id
          name
          surname
          profileImageUrl
        }
      }
    }
  }
`;

const QUACK_MUTATION = gql`
  mutation Quack($userId: Int!, $text: String!) {
    addQuack(userId: $userId, text: $text) {
      id
    }
  }
`;

export function DashboardPage() {
  const { user } = useAuth();
  const { userName } = useParams();

  console.log(user);
  console.log(123);

  return(<div>das</div>)

  // const userFetcher = useQuery(USER_DETAIL_QUERY, {
  //   variables: { userName },
  // });
  //
  // const [quackFormText, setQuackFormText] = useState('');
  // const [quackMutationRequest, quackMutationRequestState] = useMutation(
  //   QUACK_MUTATION,
  //   {
  //     onCompleted: () => {
  //       setQuackFormText('');
  //       userFetcher.refetch();
  //     },
  //     onError: () => {},
  //   },
  // );
  //
  // const quackFormState = {
  //   loading: quackMutationRequestState.loading,
  //   error: quackMutationRequestState.error,
  //   text: quackFormText,
  //   setText: setQuackFormText,
  //   onSubmit: ({ text }) => {
  //     quackMutationRequest({ variables: { text, userId: user.id } });
  //   },
  // };
  //
  // if (userFetcher.data && userFetcher.data.user === null) {
  //   return <PageNotFound />;
  // }
  //
  // return (
  //   <DashboardTemplate
  //     data={userFetcher.data}
  //     loading={userFetcher.loading}
  //     error={userFetcher.error}
  //     onReload={() => userFetcher.refetch()}
  //     quackFormState={quackFormState}
  //     currentUser={user}
  //     userName={userName}
  //   />
  // );
}
