import React from 'react';

import {
  MainSectionDashboard,
  Button,
  ButtonReverse,
  NavLink,
  Heading,
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
        <h1 style={{ textAlign: 'left', color: 'greenyellow' }}>Dashboard</h1>
        <h2 style={{ textAlign: 'left', color: 'greenyellow' }}>
          Nové tréninky
          <NavLink to={route.newTraining('tt123')} className="pa3">
            <div className="right-offset pt4">
              <ButtonReverse>Nový trénink</ButtonReverse>
            </div>
          </NavLink>
        </h2>
        <main className="grid-container-left">
          <div className="right-offset">
            <ButtonReverse>
              <div>
                <h2>Ranní HIIT</h2>
                <p>3 kola - 10 cviků - 30 minut</p>
                <p>30s cvik - 10s pauza</p>
              </div>
            </ButtonReverse>
            <ButtonReverse>
              <div>
                <h2>Úterní kruháč</h2>
                <p>5 kol - 6 cviků - 45 minut</p>
                <p>1min cvik - 10s pauza</p>
              </div>
            </ButtonReverse>
            <ButtonReverse>
              <div>
                <h2>Večerní HIIT</h2>
                <p>6 kol - 8 cviků - 40 minut</p>
                <p>40s cvik - 10s pauza</p>
              </div>
            </ButtonReverse>
          </div>
        </main>
        <h2 style={{ textAlign: 'left', color: 'greenyellow' }}>
          Histore tréninků
        </h2>
        <main className="grid-container-left">
          <div className="right-offset">
            <ButtonReverse>
              <div>
                <h2>Ranní HIIT</h2>
                <p>638 Kcal</p>
                <p>
                  <b>30.10.2021</b> 8:00-8:35
                </p>
              </div>
            </ButtonReverse>
            <ButtonReverse>
              <div>
                <h2>Úterní kruháč</h2>
                <p>876 Kcal</p>
                <p>
                  <b>22.10.2021</b> 13:24-14:10
                </p>
              </div>
            </ButtonReverse>
            <ButtonReverse>
              <div>
                <h2>Večerní HIIT</h2>
                <p>1001 Kcal</p>
                <p>
                  <b>11.10.2021</b> 21:13-22:01
                </p>
              </div>
            </ButtonReverse>
          </div>
        </main>
      </MainSectionDashboard>
    </>
  );
}
