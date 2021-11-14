//import React from 'react';
import React, { Fragment, useEffect, useState } from 'react';
import { MainSectionDashboard, Button } from 'src/atoms/';
import { ReloadButton } from 'src/molecules/';
import { TopNavigationLogged } from 'src/organisms/';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMove } from 'react-sortable-hoc';
import List from 'src/organisms/ListExercises';

export function NewTrainingTemplate({ workoutItems, dispatch }) {
  //const [counter, setCounter] = useState(0);
  console.log('action');
  return (
    <>
      <TopNavigationLogged />
      <MainSectionDashboard>
        <h1 style={{ color: 'greenyellow' }}>Nový trénink</h1>
        <main className="flex grid-container-left br2">
          <Button>
            <div>
              <h2>Založení nového tréninku</h2>
            </div>
          </Button>
          <div>
            <h2></h2>
          </div>
        </main>
        <form className="flex grid-container-left mt fl w-50-l w-100 bg-white br2 pa5">
          <p style={{ padding: 0, margin: 0 }}>
            <div className="mw 8 left bg-gray">
              <List workoutItem={workoutItems} dispatch={dispatch} />
            </div>
          </p>
        </form>
      </MainSectionDashboard>
    </>
  );
}
