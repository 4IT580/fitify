import React from 'react';
import { Heading } from 'src/atoms';

import { HomePage } from 'src/molecules/';
import { PageLayout } from 'src/organisms/';

export function HomeTemplate() {
  return (
    <>
      <PageLayout bgClass={'background background-gym-clap'}>
        <HomePage>
          <Heading className="green" size="xxl">
            FITIFY
          </Heading>
          <Heading className="white mt2 mb3" size="l">
            Aplikace, která bude cvičit s vámi!
          </Heading>

          <Heading className="white mt2 mb3 " size="l">
            Zaregistrujte se a začněte s tréninkem.
          </Heading>
        </HomePage>
      </PageLayout>
    </>
  );
}
