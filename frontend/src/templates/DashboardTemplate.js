import React from 'react';

import {
  MainSection,
  Button,
  NavLink
} from 'src/atoms/';
import {  ReloadButton } from 'src/molecules/';
import {  TopNavigationLogged } from 'src/organisms/';
import { route } from 'src/Routes';

//import {  TopNavigation } from 'src/organisms/';

export function DashboardTemplate({}) {


  return (
    <>
      <TopNavigationLogged />
          <MainSection>
      <h1>Dashboard</h1>
      <h2 style={{textAlign: "left",}}>Nové tréninky
<NavLink to={route.newTraining('tt123')} className="pa3">
      <Button>
      Nový trénink
      </Button>
</NavLink>
      </h2>
    <main className="grid-container-left">
    <Button>
        <div>
            <h2>Ranní HIIT</h2>
            <p>3 kola - 10 cviků - 30 minut</p>
            <p>30s cvik - 10s pauza</p>
        </div>
        </Button>
        <Button>
        <div>
            <h2>Úterní kruháč</h2>
            <p>5 kol - 6 cviků - 45 minut</p>
            <p>1min cvik - 10s pauza</p>
        </div>
        </Button>
        <Button>
        <div>
            <h2>Večerní HIIT</h2>
            <p>6 kol - 8 cviků - 40 minut</p>
            <p>40s cvik - 10s pauza</p>
        </div>
        </Button>
    </main>
    <h2 style={{textAlign: "left",}}>Histore tréninků</h2>
    <main className="grid-container-right">
        <Button>
        <div>
            <h2>Ranní HIIT</h2>
            <p>638 Kcal</p>
            <p><b>30.10.2021</b> 8:00-8:35</p>
        </div>
        </Button>
        <Button>
        <div>
            <h2>Úterní kruháč</h2>
            <p>876 Kcal</p>
            <p><b>22.10.2021</b> 13:24-14:10</p>
        </div>
        </Button>
        <Button>
        <div>
            <h2>Večerní HIIT</h2>
            <p>1001 Kcal</p>
            <p><b>11.10.2021</b> 21:13-22:01</p>
        </div>
        </Button>
    </main>
      </MainSection>
    </>
  );
}