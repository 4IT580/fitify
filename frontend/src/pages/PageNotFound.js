import React from 'react';

import { Link, Heading } from 'src/atoms/';
import { route } from 'src/Routes';
import { PageLayout } from "src/organisms";

export function PageNotFound() {
  return (
    <div className={'bg-white'}>
      <PageLayout bgClass={'background'}>
        <div className={'bg-white pa5'}>
          <Heading>Error 404</Heading>
          <p>
            Page not found, please return to <Link to={route.home()}>Home</Link>.
          </p>
        </div>
      </PageLayout>
    </div>
  );
}
