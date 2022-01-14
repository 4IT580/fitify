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

          <div className={'mt4 mt4-ns'}>
            <Card
              headerValue={'Step 1 - select exercise'}
              className={'green'}
              grid={'w-third-l w-100 center-m fl ph2'}
            >
              <CardBody>
                <ListAllWorkoutItems
                  workoutItems={workoutItems}
                  dispatch={dispatch}
                />
              </CardBody>
              <CardBody>
                <Button
                  className="w-100 mv3"
                  onClick={() => dispatch(transferData())}
                >
                  Select chosen
                </Button>
              </CardBody>
            </Card>

            <Card
              headerValue={'Step 2 - order, remove, manipulate'}
              className={'green'}
              grid={'w-third-l w-100 center-m fl ph2'}
            >
              <CardBody>
                <List workoutItems={workout} dispatch={dispatch} />
              </CardBody>
            </Card>

            <Card
              headerValue={'Step 3 - save workout'}
              className={'green'}
              grid={'w-third-l w-100 center-m fl ph2'}
            >
              <NewWorkoutForm
                isLoading={isLoading}
                errorMessage={error && error.message}
                successMessage={successMessage}
                onSubmit={onSubmit}
                className=""
                workout={workout}
              />
            </Card>
          </div>
        </MainSection>
      </PageLayout>
    </>
  );
}
