import React from 'react';

import { Heading, HomePage, Footer } from 'src/atoms/';
import { QuackForm, ReloadButton } from 'src/molecules/';
import { QuackList, TopNavigation } from 'src/organisms/';

export function HomeTemplate({
}) {
  return (
    <>
      <TopNavigation />
      <HomePage>
        <h1>FITIFY</h1>
        <h3>Aplikace, která bude cvičit s vámi!</h3>

        <h3>Zaregistrujte se a začněte s tréninkem.</h3>
      </HomePage>
      <Footer />
    </>
  );
}
