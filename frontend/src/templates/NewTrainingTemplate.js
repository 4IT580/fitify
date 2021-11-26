import React from 'react';
import { MainSection, Heading } from 'src/atoms/';
import { PageLayout, NewWorkoutForm } from 'src/organisms/';
import { MainSectionDashboard } from 'src/atoms/';
import { TopNavigation } from 'src/organisms/';
import List from 'src/organisms/ListExercises';

export function NewTrainingTemplate({ workoutItems, dispatch }) {
  return (
    <>
      <PageLayout bgClass={'background background-gym-dumbbell'}>
        <MainSection>
          <Heading size={'lg'}>New Training</Heading>

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
            <div className="mb6  left bg-dark">
              <NewWorkoutForm />
              <List workoutItem={workoutItems} dispatch={dispatch} />
            </div>
          </form>
      </MainSection>
      </PageLayout>
    </>
  );
}
