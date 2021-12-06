import React from 'react';

import { HomePage } from 'src/molecules/';
import { PageLayout } from 'src/organisms/';

export function HomeTemplate() {
  return (
    <>
      <PageLayout bgClass={'background background-gym-clap'}>
        <HomePage>
          <h1>FITIFY</h1>
          <h3>Aplikace, která bude cvičit s vámi!</h3>

          <h3>Zaregistrujte se a začněte s tréninkem.</h3>
        </HomePage>
      </PageLayout>
    </>
  );
}
