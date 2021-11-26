import React, { useEffect, useState } from 'react';

import {
  Button,
  Heading,
  Link,
  ErrorBanner,
  Loading,
  MainSectionWorkout,
  CardBody,
  TextInput,
} from 'src/atoms/';

import { TopNavigation } from 'src/organisms/';

import { Card } from 'src/molecules';

import { route } from 'src/Routes';
import { fromUnixTimeStamp, secondsToTimeString } from '../utils/date';

export function DashboardTemplate({
  data,
  isLoading,
  error,
  refetch,
  currentUser,
}) {
  const [workoutData, setWorkoutData] = useState([]);
  const [workoutHistory, setWorkoutHistory] = useState([]);

  function normalizeString(string) {
    return string
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  function filterWorkoutDataBasedOnValue(searchedValue) {
    if (isLoading === true) {
      setWorkoutData([]);
    } else {
      setWorkoutData(
        data.user.workouts.filter((item) => {
          if (searchedValue === undefined) {
            return true;
          }

          return normalizeString(item.name).includes(
            normalizeString(searchedValue),
          );
        }),
      );
    }
  }

  useEffect(() => {
    filterWorkoutDataBasedOnValue();
  }, [isLoading, data]);

  useEffect(() => {
    let workoutHistoryItems = [];

    //better do this by custom request to BE when mocked data are not used
    workoutData.forEach((item) =>
      item.history
        .filter((item) => item.status === 'finished')
        .forEach((activeItem) =>
          workoutHistoryItems.push({
            ...activeItem,
            parentId: item.id,
            parentName: item.name,
          }),
        ),
    );

    setWorkoutHistory(workoutHistoryItems);
  }, [workoutData]);

  return (
    <>
      <TopNavigation />

      <MainSectionWorkout>
        <Heading size={'lg'}>Dashboard</Heading>

        <div className={'dit w-100 mt3 w-auto-ns fr-ns'}>
          <Link
            to={route.newTraining()}
            className={
              'bg-animate dim bg-green br-pill ph4 mv0 f3 f5-ns fr-ns w-100 fl tc'
            }
          >
            New training
          </Link>
        </div>

        <div className={'dit w-100 mt3 w-auto-ns fl-ns'}>
          <TextInput
            placeholder={'Filter trainings'}
            id={'filterInput'}
            onChange={(e) => {
              filterWorkoutDataBasedOnValue(e.target.value);
            }}
          />
        </div>

        {isLoading && !workoutData && <Loading />}

        {error && (
          <ErrorBanner title={error.message}>
            <Button color="red" onClick={() => refetch()}>
              Reload
            </Button>
          </ErrorBanner>
        )}

        {workoutData && (
          <>
            <div className={'dit w-100 mt3'}>
              {workoutData.map((item) => (
                <div
                  className={'fl w-100 w-third-l'}
                  key={'workoutPlan' + item.id}
                >
                  <Link
                    className="f7 green mv0 mw5"
                    to={route.workout(item.id)}
                    noUnderline={true}
                  >
                    <div
                      className={
                        'dim tc workout-pill br-pill pv2 ph4 ma2 ba b--green'
                      }
                    >
                      <Heading size={'md'} className={'mt2 mb3'}>
                        {item.name}
                      </Heading>
                      <p className={'f4 f5-ns green'}>
                        {item.intervalLength}s heat - {item.intervalPauseLength}
                        s break
                      </p>
                      <p className={'f4 f5-ns green'}>
                        {item.exercises.length} exercises,{' '}
                        {item.roundsPauseLength}s round break
                      </p>
                      <p className={'f4 f5-ns green'}>{item.rounds} rounds</p>
                      <p className={'f4 f5-ns green'}>
                        {secondsToTimeString(
                          item.rounds *
                            (item.exercises.length *
                              (item.intervalLength + item.intervalPauseLength) +
                              item.roundsPauseLength),
                        )}{' '}
                        total
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div>
              <Card
                headerValue={'Training history'}
                className={'mt4 mb6'}
                grid={'w-100 w-50-l center-l mw6-l'}
              >
                {workoutHistory
                  .sort(function (a, b) {
                    return b.startAt - a.startAt;
                  })
                  .map((historyItem) => (
                    <CardBody
                      key={
                        'plan' +
                        historyItem.parentId +
                        'historyItem' +
                        historyItem.id
                      }
                    >
                      <Heading size={'sm'} className={'mt3'}>
                        {historyItem.parentName}
                      </Heading>
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

                      <div className={'tc'}>
                        <Link
                          className={
                            'dit bg-animate mb3 br-pill bg-green ph5 tc tr-ns f3 f5-ns'
                          }
                          noUnderline={true}
                          to={'/'}
                        >
                          Repeat workout
                        </Link>
                      </div>
                    </CardBody>
                  ))}
              </Card>
            </div>
          </>
        )}
      </MainSectionWorkout>
    </>
  );
}
