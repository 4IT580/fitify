import React from 'react';

import { ErrorBanner } from 'src/atoms/';
import { Link, Button, Loading } from 'src/atoms/';
import { CardBody, Heading, List } from '../atoms';
import { fromUnixTimeStamp, secondsToTimeString } from '../utils/date';
import { Card, WorkoutHeader } from '../molecules';

export function WorkoutPlanView({ planData, isLoading, error, refetch }) {
  return (
    <>
      {isLoading && !planData && <Loading />}

      {error && (
        <ErrorBanner title={error.message}>
          <Button color="red" onClick={() => refetch()}>
            Reload
          </Button>
        </ErrorBanner>
      )}

      {planData && (
        <>
          <WorkoutHeader planData={planData} />

          <div className={'cf'}>
            <Card headerValue={'Training summary'} grid={'fl w-100 w-50-l'} className={'green'}>
              <CardBody>
                <p className={'f4 f5-ns green'}>
                  Interval length: {planData.intervalLength}s
                </p>
                <p className={'f4 f5-ns green'}>
                  Interval pause length: {planData.intervalPauseLength}s
                </p>
                <p className={'f4 f5-ns green'}>Rounds: {planData.rounds}</p>
                <p className={'f4 f5-ns green'}>
                  Rounds pause length: {planData.roundsPauseLength}s
                </p>
                <p className={'f4 f5-ns green'}>Total time:{' '}
                          {secondsToTimeString(
                            planData.rounds *
                              (planData.exercises.length *
                                (planData.intervalLength +
                                  planData.intervalPauseLength)),
                          )}{' '}
                          s
                        </p>
              </CardBody>
            </Card>

            <Card headerValue={'Exercises'} grid={'fr w-100 w-50-l'} className={'green'}>
              {planData.exercises.map((exerciseItem, index) => (
                <CardBody key={'exerciseItem' + exerciseItem.id}>
                  <Heading size={'md'} className={'green mt3'}>
                    {index + 1} : {exerciseItem.name}
                  </Heading>
                  <Heading
                    size={'sm'}
                    className={'green mt3 bg-dark pa3 br3 lh-copy'}
                  >
                    {exerciseItem.description}
                  </Heading>

                  <div className={'cf mb3'}>
                    <List
                      className={'fl w-100 w-50-ns green'}
                      headerValue={'Body parts'}
                      items={exerciseItem.bodyParts}
                    />
                    <List
                      className={'fl w-100 w-50-ns green'}
                      headerValue={'Equipment you can use'}
                      items={exerciseItem.equipment}
                    />
                  </div>
                </CardBody>
              ))}
            </Card>

            <Card headerValue={'Workout history'} grid={'fl w-100 w-50-l'} className={'green'}>
              {planData.history
                .filter((historyItem) => historyItem.status === 'finished')
                .reverse()
                .map((historyItem) => (
                  <CardBody key={'historyItem' + historyItem.id}>
                    <p className={'f4 f5-ns green'}>
                      From: {fromUnixTimeStamp(historyItem.startAt)}
                    </p>
                    <p className={'f4 f5-ns green'}>
                      Until: {fromUnixTimeStamp(historyItem.endAt)}
                    </p>
                    <p className={'f4 f5-ns green'}>
                      {historyItem.calories &&
                        ' Burnt calories: ' + historyItem.calories}
                    </p>
                  </CardBody>
                ))}
            </Card>
          </div>
        </>
      )}
    </>
  );
}
