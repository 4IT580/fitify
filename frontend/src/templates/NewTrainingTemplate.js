import React from 'react';

import {
  MainSectionDashboard,
  button,
  ButtonReverse
} from 'src/atoms/';
import {  ReloadButton } from 'src/molecules/';
import {  TopNavigationLogged } from 'src/organisms/';
//import {  TopNavigation } from 'src/organisms/';

export function NewTrainingTemplate({}) {


  return (
    <>
      <TopNavigationLogged />
          <MainSectionDashboard>
        <h1 style={{ color: 'greenyellow' }}>Nový trening</h1>
        <p style={{padding: 10, marging: 10}}>
       </p>
    <main className="grid-container-left">
    <ButtonReverse>
        <div>
            <h2>Založení nového treningu</h2>
        </div>
        </ButtonReverse>
          <div>
            <h2></h2>
          </div>
    </main>
        <p style={{ padding: 60, margin: 60 }}>


        </p>

      </MainSectionDashboard>
    </>
  );
}
