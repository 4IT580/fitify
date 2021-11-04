import React from 'react';

import { MainSectionDashboard, button, ButtonReverse } from 'src/atoms/';
import { ReloadButton } from 'src/molecules/';
import { TopNavigationLogged } from 'src/organisms/';
//import {  TopNavigation } from 'src/organisms/';

export function NewTrainingTemplate({}) {
  return (
    <>
      <TopNavigationLogged />
      <MainSectionDashboard>
        <h1 style={{ color: 'greenyellow' }}>Nový trénink</h1>
        <main className="grid-container-left pt7">
          <ButtonReverse>
            <div>
              <h2>Založení nového tréninku</h2>
            </div>
          </ButtonReverse>
          <div>
            <h2></h2>
          </div>
        </main>
        <p style={{ padding: 20, margin: 20 }}></p>
      </MainSectionDashboard>
    </>
  );
}
