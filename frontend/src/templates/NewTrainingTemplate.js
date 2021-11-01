import React from 'react';

import {
  MainSection,
  Button
} from 'src/atoms/';
import {  ReloadButton } from 'src/molecules/';
import {  TopNavigationLogged } from 'src/organisms/';
//import {  TopNavigation } from 'src/organisms/';

export function NewTrainingTemplate({}) {


  return (
    <>
      <TopNavigationLogged />
          <MainSection>
      <h1>Nový trening</h1>
      <p style={{padding: 10, marging: 10}}>
      </p>
    <main className="grid-container-left">
    <Button>
        <div>
            <h2>Založení nového treningu</h2>
        </div>
        </Button>
        <div>
            <h2></h2>
        </div>
    </main>

    <p style={{padding: 20, marging: 20}}>


      </p>
      </MainSection>
    </>
  );
}
