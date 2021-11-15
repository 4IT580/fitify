//import React from 'react';
import React, { Fragment, useEffect, useState } from 'react';
import { MainSectionDashboard, Button, Heading } from 'src/atoms/';
import { ReloadButton } from 'src/molecules/';
import { TopNavigation,NewWorkoutForm } from 'src/organisms/';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMove } from 'react-sortable-hoc';
import List from 'src/organisms/ListExercises';



export function NewTrainingTemplate({ workoutItems, dispatch }) {
  //const [counter, setCounter] = useState(0);
  console.log('action');
  return (
    <>
      <TopNavigation />
      <MainSectionDashboard>
        <Heading>New Training</Heading>

        <main className="flex grid-container-left br2 ml3 pa2 ">
          <a
            className="f3 tc link dim br-pill ph4 pv3 mt4 dib green bg-dark"
            href="#0"
          >
            <div>Add new training</div>
          </a>
          <div className="right-offset"></div>
          <div>
            <h2></h2>
          </div>
        </main>

        <form className=" flex grid-container-left ml3 mt mb5 flb w-35-l w-50 br2 pa2 ">
          <p style={{ padding: 0, margin: 0 }}>
            <NewWorkoutForm />
            <div className="mb6  left bg-dark">
              <List workoutItem={workoutItems} dispatch={dispatch} />
            </div>
          </p>
        </form>

      </MainSectionDashboard>
    </>
  );
}
