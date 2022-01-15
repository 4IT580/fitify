import React from 'react';
import { Button } from 'src/atoms';

import { HomePage } from 'src/molecules/';
import { PageLayout } from 'src/organisms/';

export function HomeTemplate() {
  return (
    <>
      <PageLayout bgClass={'background background-gym-clap'}>
        <HomePage>
          <h1 className='green'>FITIFY</h1>
          <h3 className='white'>Aplikace, která bude cvičit s vámi!</h3>

          <h3 className='white'>Zaregistrujte se a začněte s tréninkem.</h3>
          <Button>
            Sign In
          </Button>
        </HomePage>

      </PageLayout>
    </>
  );
}
