import React from 'react';
import { MainSection, Heading, Button } from 'src/atoms/';
import { NewWorkoutForm } from 'src/organisms/';
import List from 'src/organisms/ListExercises';
import { PageLayout } from '../organisms';
import ListAllWorkoutItems from 'src/organisms/ListAllWorkoutItems';
import { transferData } from 'src/reducers/listExerciseReducer';
export function NewTrainingTemplate({
  workoutItems,
  workout,
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
            New Training
          </Heading>
          <main className="flex grid-container-left br2 ml3 pa2 "></main>
          <div className=" flex grid-container-left green ml3 mt mb5 flb w-50-l w-60 br2 pa2 ">
            <div className="mb6    left bg-dark">
              <NewWorkoutForm
                isLoading={isLoading}
                errorMessage={error && error.message}
                successMessage={successMessage}
                onSubmit={onSubmit}
                className="mt3"
              />
              <List workoutItems={workout} dispatch={dispatch} />
              <Button
                colorScheme="red"
                onClick={() => dispatch(transferData())}
              >
                set workout list
              </Button>
              <ListAllWorkoutItems
                workoutItems={workoutItems}
                dispatch={dispatch}
              />
            </div>
          </div>
          {console.log(workoutItems)}
        </MainSection>
      </PageLayout>
    </>
  );
}
