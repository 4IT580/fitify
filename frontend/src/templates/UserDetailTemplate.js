import React from 'react';

import {
  SuccessBanner,
  ErrorBanner,
  Loading,
  MainSection,
  CardBody,
} from 'src/atoms/';
import { UserDetailForm, PasswordChangeForm } from 'src/organisms/';
import { PageLayout } from '../organisms';
import { Card } from 'src/molecules';

export function UserDetailTemplate({
  data,
  loading,
  errorDetail,
  errorPassword,
  onSubmit,
  onPasswordChange,
  successMessage,
}) {
  return (
    <>
      <PageLayout bgClass={'background background-gym-dumbbell'}>
        <MainSection>
          {loading && !data && <Loading />}

          {errorDetail && <ErrorBanner title={errorDetail.message} className="mb3" />}
          {errorPassword && <ErrorBanner title={errorPassword.message} className="mb3" />}
          {successMessage && (
            <span>
              <SuccessBanner title={successMessage} className="mb3" />
            </span>
          )}

          {data && (
            <div className={'tc'}>
              <Card
                headerValue={'User Info: '+data.user.email+''}
                className={'green'}
                grid={'w-third-l w-100 center-m fl ph2'}
              >
                <CardBody>
                  <UserDetailForm
                    data={data}
                    isLoading={loading}
                    onSubmit={onSubmit}
                    className="mt3 green"
                  />
                </CardBody>
              </Card>

              <Card
                headerValue={'Password Change'}
                className={'green'}
                grid={'w-third-l w-100 center-m fl ph2'}
              >
                <CardBody>
                  <PasswordChangeForm
                    isLoading={loading}
                    onSubmit={onPasswordChange}
                    className="mt3 green"
                  />
                </CardBody>
              </Card>
            </div>
          )}
        </MainSection>
      </PageLayout>
    </>
  );
}
