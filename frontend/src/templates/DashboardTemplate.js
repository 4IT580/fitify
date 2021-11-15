import React from 'react';

import {
  MainSectionDashboard,
  Button,
  NavLink,
  Heading,
  Link,
  ErrorBanner,
  Loading,
  MainSectionWorkout,
} from 'src/atoms/';
import { ReloadButton } from 'src/molecules/';
import { TopNavigation } from 'src/organisms/';
import { DashboardPage } from 'src/pages/DashboardPage';
import { route } from 'src/Routes';
import { CardBody } from '../atoms';
import { fromUnixTimeStamp, secondsToTimeString } from '../utils/date';
import { Card } from '../molecules';

export function DashboardTemplate({
  data,
  isLoading,
  error,
  refetch,
  currentUser,
}) {
  let workoutData = undefined;
  let workoutHistory = [];

  if (data !== undefined && data.user !== null && data.user !== undefined) {
    workoutData = data.user.workouts;

    workoutData.forEach((item) =>
      item.history
        .filter((item) => item.status === 'finished')
        .forEach((activeItem) =>
          workoutHistory.push({
            ...activeItem,
            parentId: item.id,
            parentName: item.name,
          }),
        ),
    );
  }

  return (
    <>
      <TopNavigation />

      <MainSectionDashboard>
        <Heading size={'lg'}>Dashboard</Heading>
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
                <div className={'fl w-100 w-50-ns w-25-l'}>
                  <Link
                    key={'workoutPlan' + item.id}
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
                grid={'w-100 w-50-l ma2 mw6-l'}
              >
                {workoutHistory
                  .sort(function (a, b) {
                    return a.startAt - b.startAt;
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
      </MainSectionDashboard>
    </>
  );
}
