import React from 'react';

import { HomePage, Footer } from 'src/atoms/';
import { TopNavigation } from 'src/organisms/';

export function HomeTemplate() {
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
