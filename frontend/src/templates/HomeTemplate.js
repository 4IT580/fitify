import React from 'react';

import { Footer } from 'src/atoms/';
import { HomePage } from 'src/molecules/';
import { TopNavigation, PageLayout } from 'src/organisms/';

export function HomeTemplate() {
  return (
    <>
      <PageLayout>
        <HomePage>
          <h1>FITIFY</h1>
          <h3>Aplikace, která bude cvičit s vámi!</h3>

          <h3>Zaregistrujte se a začněte s tréninkem.</h3>
        </HomePage>
      </PageLayout>
    </>
  );
}
