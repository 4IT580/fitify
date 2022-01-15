import React from 'react';
import { Button, Link } from 'src/atoms';

import { HomePage } from 'src/molecules/';
import { PageLayout } from 'src/organisms/';
import { route } from 'src/Routes';

export function HomeTemplate() {
  return (
    <>
      <PageLayout bgClass={'background background-gym-clap'}>
        <HomePage>
          <h1 className='green'>FITIFY</h1>
          <h3 className='white'>Aplikace, která bude cvičit s vámi!</h3>

          <h3 className='white'>Zaregistrujte se a začněte s tréninkem.</h3>
          <Link exact to={route.signIn()} >
          <Button className={'ma2'}>
            Sign In
          </Button>
          </Link>
          <Link exact to={route.signUp()} >
          <Button className={'ma2'}>
            Sign Up
          </Button>
          </Link>
        </HomePage>

      </PageLayout>
    </>
  );
}
