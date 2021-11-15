//import React from 'react';
import React, { Fragment, useEffect, useState } from 'react';
import { MainSectionDashboard, Button } from 'src/atoms/';
import { ReloadButton } from 'src/molecules/';
import { TopNavigationLogged, NewWorkoutForm } from 'src/organisms/';
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
        <h1 style={{ color: 'greenyellow' }}>New training</h1>
        <main className="flex grid-container-left br2 pa2">
          <Button>
            <div>
              <h2>Create new training</h2>
            </div>
          </Button>
          <div>
            <h2></h2>
          </div>
        </main>

        <form className=" flex grid-container-left mt flb w-35-l w-50 br2 pa2 ">
          <p style={{ padding: 0, margin: 0 }}>
            <NewWorkoutForm />
            <div className="mw 8 left bg-dark">
              <List workoutItem={workoutItems} dispatch={dispatch} />
            </div>
          </p>
        </form>
      </MainSectionDashboard>
    </>
  );
}
