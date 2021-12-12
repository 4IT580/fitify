import React, { useEffect, useState } from 'react';

import {
  Button,
  Heading,
  Link,
  ErrorBanner,
  Loading,
  MainSection,
  CardBody,
  TextInput,
} from 'src/atoms/';

import { PageLayout } from 'src/organisms/';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <PageLayout bgClass={'background background-gym-dumbbell'}>
        <MainSection>
          <Heading size={'xl'} className={'green'}>
            Dashboard
          </Heading>

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
                          'dim tc workout-pill br4 ba pv2 ph4 ma2 ba b--green'
                        }
                      >
                        <Heading size={'md'} className={'mt2 mb3'}>
                          {item.name}
                        </Heading>
                        <p className={'f4 f5-ns green'}>
                          {item.intervalLength}s heat -{' '}
                          {item.intervalPauseLength}s break
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
                                (item.intervalLength +
                                  item.intervalPauseLength) +
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
                  className={'mt4 mb6 green'}
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
                        <Heading size={'sm'} className={'mt3 green'}>
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
                      </CardBody>
                    ))}
                </Card>
              </div>
            </>
          )}
        </MainSection>
      </PageLayout>
    </>
  );
}
