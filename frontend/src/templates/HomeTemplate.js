import React from 'react';

import { Heading, MainSection, Footer } from 'src/atoms/';
import { QuackForm, ReloadButton } from 'src/molecules/';
import { QuackList, TopNavigation } from 'src/organisms/';

export function HomeTemplate({
}) {
  return (
    <>
      <TopNavigation />
      <MainSection>
        <h1>home</h1>
      </MainSection>
    </>
  );
}
