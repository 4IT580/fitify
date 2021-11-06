import React from 'react';

import { MainSectionDashboard, button } from 'src/atoms/';
import { ReloadButton } from 'src/molecules/';
import { TopNavigationLogged } from 'src/organisms/';
//import {  TopNavigation } from 'src/organisms/';

export function NewTrainingTemplate({}) {
  return (
    <>
      <TopNavigationLogged />
      <MainSectionDashboard>
        <h1 className="f2 fw8 tracked">
          New Training
        </h1>
           <a className="f3 tc link dim br-pill ph4 pv3 mt4 dib green bg-dark" href="#0">
              <div>Add new training</div>
           </a>
          <div className="right-offset"></div>
          <div>
            <h2></h2>
          </div>
        <p style={{ padding: 20, margin: 20 }}></p>
      </MainSectionDashboard>
    </>
  );
}

