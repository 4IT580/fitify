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
import { Card, CardLink } from 'src/molecules';
import { route } from 'src/Routes';

import { fromUnixTimeStamp, planEta, secondsToTimeString } from '../utils/date';
import { Label } from "../atoms";

export function DashboardTemplate({ data, isLoading, error, refetch }) {
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
          <Heading size={'xxl'} className={'green'}>
            Dashboard
            <Button className={'dit w-100 w-auto-ns fr-ns mt1'}>
              <Link
                to={route.newTraining()}
                className={
                  'bg-animate dim bg-green br-pill mv0 f3 f5-ns fr-ns w-100 fl tc'
                }
              >
                New Training
              </Link>
            </Button>
          </Heading>

          <div className={'dit w-100 mt4 f4 w-auto-ns fr-ns'}>
            <Label className={'green'}>
              Filter trainings by name
            </Label>
            <TextInput
              placeholder={'name...'}
              id={'filterInput'}
              onChange={(e) => {
                filterWorkoutDataBasedOnValue(e.target.value);
              }}
            />
          </div>

          <Heading size={'xl'} className={'green pb4 mt4'}>
            Trainings
          </Heading>

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
              <div className={'mt3 overflow-x-auto nowrap-ns'}>
                {workoutData.map((item) => (
                  <div
                    className={'dit ph2 w-100 mw6'}
                    key={'workoutPlan' + item.id}
                  >
                    <CardLink
                      headerValue={item.name}
                      grid={'tc'}
                      className={'green'}
                      to={route.workout(item.id)}
                    >
                      <CardBody className={'green'}>
                        <p className={'f4 f5-ns green tc'}>
                          {item.exercises.length} exercises - {item.rounds}
                          rounds
                        </p>
                        <p className={'f4 f5-ns green tc'}>
                          {item.intervalLength}s interval -{' '}
                          {item.intervalPauseLength}s break -{' '}
                          {item.roundsPauseLength}s round break
                        </p>
                        <p className={'f4 f5-ns green tc'}>
                          total time: {secondsToTimeString(planEta(item))} s
                        </p>
                      </CardBody>
                    </CardLink>

                    <div className={'overflow-y-auto-ns vh-50-ns ph2 mb3'}>
                      {item.history.length > 0 && (
                        <Card className={'dn db-ns green'}>
                          {item.history.map((historyItem, index) => (
                            <CardBody
                              className={'green'}
                              key={
                                'workoutPlan' +
                                item.id +
                                'history' +
                                historyItem.id
                              }
                              hasTopBorder={index > 0}
                            >
                              <p className={'f4 f5-ns green'}>
                                From: {fromUnixTimeStamp(historyItem.startAt)}
                              </p>
                              <p className={'f4 f5-ns green'}>
                                Until: {fromUnixTimeStamp(historyItem.endAt)}
                              </p>
                              <p className={'f4 f5-ns green'}>
                                {historyItem.calories &&
                                  ' Burnt calories: ' +
                                    historyItem.calories +
                                    ' kcal'}
                              </p>
                            </CardBody>
                          ))}
                        </Card>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className={'dit w-100 mt3 dn-ns db'}>
                <Heading size={'xl'} className={'green pb4'}>
                  Training history
                </Heading>
                {workoutHistory
                  .sort(function (a, b) {
                    return b.startAt - a.startAt;
                  })
                  .map((historyItem) => (
                    <div
                      className={'fl ph2 w-100 w-third-l green o-80'}
                      key={'workoutPlan' + historyItem.id}
                    >
                      <Card
                        headerValue={historyItem.parentName}
                        grid={'w-100 w-100-l mw6-l tc'}
                        className={'green'}
                      >
                        <CardBody>
                          <p className={'f4 f5-ns green'}>
                            From: {fromUnixTimeStamp(historyItem.startAt)}
                          </p>
                          <p className={'f4 f5-ns green'}>
                            Until: {fromUnixTimeStamp(historyItem.endAt)}
                          </p>
                          <p className={'f4 f5-ns green'}>
                            {historyItem.calories &&
                              ' Burnt calories: ' +
                                historyItem.calories +
                                ' kcal'}
                          </p>
                        </CardBody>
                      </Card>
                    </div>
                  ))}
              </div>
            </>
          )}
        </MainSection>
      </PageLayout>
    </>
  );
}
