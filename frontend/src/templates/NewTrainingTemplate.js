import React from 'react';
import { MainSection, Heading } from 'src/atoms/';
import { TopNavigation, NewWorkoutForm } from 'src/organisms/';
import List from 'src/organisms/ListExercises';
import ListAllWorkoutItems from 'src/organisms/ListAllWorkoutItems';
import { PageLayout } from "../organisms";
export function NewTrainingTemplate({
  workoutItems,
  dispatch,
  isLoading,
  successMessage,
  error,
  onSubmit,
}) {
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

        <div className=" flex grid-container-left ml3 mt mb5 flb w-50-l w-50 br2 pa2 ">
          <div className="mb6    left bg-dark">
            <NewWorkoutForm
              isLoading={isLoading}
              errorMessage={error && error.message}
              successMessage={successMessage}
              onSubmit={onSubmit}
              className="mt3"
            />
            <List workoutItems={workoutItems} dispatch={dispatch} />
            {
              // <ListAllWorkoutItems
              //   workoutItems={workoutItems}
              //   dispatch={dispatch}
              // />
            }
          </div>
        </div>
        </MainSection>
      </PageLayout>
    </>
  );
}
