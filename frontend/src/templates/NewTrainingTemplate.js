import React from 'react';
import { MainSection, Heading, Button, CardBody } from 'src/atoms/';
import { NewWorkoutForm, PageLayout } from 'src/organisms/';
import List from 'src/organisms/ListExercises';
import { Card } from 'src/molecules';
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
          <Heading size={'xl'} className={'green'}>
            New Training
          </Heading>
          <div
            className={'fl w-100 w-two-l'}>
          <Card
            headerValue={
              <Button
                className="w-100"
                onClick={() => dispatch(transferData())}
              >
                set workout list
              </Button>
            }
            className={'mt4 mb6 green'}
            grid={'w-100 w-50-l center-m mw6-l fl'}
          >
            <CardBody>
              <ListAllWorkoutItems
                workoutItems={workoutItems}
                dispatch={dispatch}
              />
              <List workoutItems={workout} dispatch={dispatch} />
            </CardBody>
          </Card>

            <Card
              headerValue={<List workoutItems={workout} dispatch={dispatch} />}
              className={'mt4 mb6 green'}
              grid={'w-100 w-50-l center-m mw6-l fr'}
            >
              <CardBody>
                <NewWorkoutForm
                  isLoading={isLoading}
                  errorMessage={error && error.message}
                  successMessage={successMessage}
                  onSubmit={onSubmit}
                  className="mt3"
                  workout={workout}
                />
              </CardBody>
            </Card>
          </div>
        </MainSection>
      </PageLayout>
    </>
  );
}
