import React, { useEffect } from 'react';

import { Heading, RightBlockSection, ErrorBanner, SuccessBanner } from 'src/atoms/';
import { PageLayout } from 'src/organisms/';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export function ActivateUserTemplate({
  error,
  onLoad,
}) {

  useEffect(
    () => {
      onLoad();
    }
  )

  return (
    <div>
      <PageLayout>
        <RightBlockSection>
          <Heading className={'pb2'}>Activate User</Heading>

          {(error && error.message) && <ErrorBanner title={error.message} className="mb3" />}
          <SuccessBanner title={'Your registration is being finished.\nPlease wait a moment, You are being redirected to the Sign In page.'} className="mb3" />

          <div className={'tc pt4'}>
            <FontAwesomeIcon icon={faSpinner} spin size={'2x'} />
          </div>

        </RightBlockSection>
      </PageLayout>
    </div>
  );
}
