import React from 'react';

import {
  MainSectionDashboard,
  Button,
  NavLink,
  Heading,
  Link,
} from 'src/atoms/';
import { ReloadButton } from 'src/molecules/';
import { TopNavigationLogged } from 'src/organisms/';
import { Dashboard } from 'src/pages/Dashboard';
import { route } from 'src/Routes';

//import {  TopNavigation } from 'src/organisms/';

export function DashboardTemplate({}) {
  return (
    <>
      <TopNavigationLogged />
      <MainSectionDashboard>
        <div>
          <div className="ph3">
            <h1 className="f2 fw8 tracked">
              Dashboard
            </h1>
              <h2 className="f3 fw5 tracked-tight">
                New Training
              <Link to={route.newTraining('tt123')} className="f4 tc link dim br-pill ph4 pv2 mb2 dib green bg-dark ml3">
                  <div>Add new </div>
              </Link>
              <div className="right-offset"></div>
              </h2>
            <a className="f7 tc link dim br-pill ph4 pv2 mb2 ma2 dib green bg-dark"
              href="#0"
            >
              <div>
                <h2>Morning HIIT</h2>
                <p>3 rounds - 10 exercises - 30 minutes</p>
                <p>30s exercise - 10s break</p>
              </div>
            </a>
            <a className="f7 tc link dim br-pill ph4 pv2 mb2 ma2 dib green bg-dark"
              href="#0"
            >
              <div>
                <h2>Circuit training</h2>
                <p>5 rounds - 6 exercises - 45 minutes</p>
                <p>1min exercise - 10s break</p>
              </div>
            </a>
            <a className="f7 tc link dim br-pill ph4 pv2 mb2 ma2 dib green bg-dark"
              href="#0"
            >
              <div>
                <h2>Evening HIIT</h2>
                <p>6 rounds - 8 exercises - 40 minutes</p>
                <p>40s exercise - 10s break</p>
              </div>
            </a>
          </div>
        </div>


        <div>
          <div className="ph3">
            <h2 className="f3 fw5 tracked">
              Training history
            </h2>
            <a className="f7 tc link dim br-pill ph4 pv2 mb2 ma2 dib green bg-dark"
              href="#0"
            >
              <div>
                <h2>Morning HIIT</h2>
                <p>638 Kcal</p>
                <p>
                  <b>30.10.2021</b> 8:00-8:35</p>
              </div>
            </a>
            <a className="f7 tc link dim br-pill ph4 pv2 mb2 ma2 dib green bg-dark"
              href="#0"
            >
              <div>
                <h2>Circuit training</h2>
                <p>876 Kcal</p>
                <p>
                  <b>22.10.2021</b> 13:24-14:10</p>
              </div>
            </a>
            <a className="f7 tc link dim br-pill ph4 pv2 mb2 ma2 dib green bg-dark"
              href="#0"
            >
              <div>
                <h2>Evening HIIT</h2>
                <p>1001 Kcal</p>
                <p>
                  <b>11.10.2021</b> 21:13-22:01</p>
              </div>
            </a>
          </div>
        </div>
      </MainSectionDashboard>
    </>
  );
}
