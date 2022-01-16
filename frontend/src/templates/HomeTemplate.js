import React from 'react';
import { Button, Link, Heading } from 'src/atoms';

import { HomePage } from 'src/molecules/';
import { PageLayout } from 'src/organisms/';
import { route } from 'src/Routes';

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
          <Link exact to={route.signIn()}>
            <Button className={'ma2'}>Sign In</Button>
          </Link>
          <Link exact to={route.signUp()}>
            <Button className={'ma2'}>Sign Up</Button>
          </Link>
        </HomePage>
      </PageLayout>
    </>
  );
}
