import React from 'react';
import { MainSection, Heading } from 'src/atoms/';
import { EditWorkoutForm } from 'src/organisms/';
import List from 'src/organisms/ListExercises';
import { PageLayout } from '../organisms';
export function EditWorkoutTemplate({
  workoutItems,
  dispatch,
  isLoading,
  successMessage,
  error,
  onSubmit,
}) {
  return (
    <>
      <PageLayout bgClass={'background  background-gym-dumbbell'}>
        <MainSection>
          <Heading size={'lg'} className={'green'}>
            Edit training
          </Heading>

          <main className="flex grid-container-left br2 ml3 pa2 "></main>

          <div className=" flex grid-container-left green ml3 mt mb5 flb w-50-l w-60 br2 pa2 ">
            <div className="mb6    left bg-dark">
              <EditWorkoutForm
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
