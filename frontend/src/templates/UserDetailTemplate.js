import React from 'react';

import {
  Button,
  ErrorBanner,
  Heading,
  Loading,
  MainSection,
} from 'src/atoms/';
import { ReloadButton } from 'src/molecules/';
import { PageLayout } from 'src/organisms/';

export function UserDetailTemplate({
  userName,
  data,
  loading,
  error,
  onReload,
  currentUser,
}) {

  return (
    <>
      <PageLayout>
        <MainSection>
          {loading && !data && <Loading />}

          {error && (
            <ErrorBanner title={error.message}>
              <Button color="red" onClick={onReload}>
                Reload
              </Button>
            </ErrorBanner>
          )}

          {data && (
            <>
              <header>
                <Heading size="lg">{data.user.name}</Heading>
                <Heading size="sm" className="fw4 gray">
                  {data.user.email}
                </Heading>
              </header>

              <ReloadButton
                onClick={onReload}
                isLoading={loading}
                className="fr"
              />
            </>
          )}
        </MainSection>
      </PageLayout>
    </>
  );
}
