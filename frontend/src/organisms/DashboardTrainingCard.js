import { CardLink, Card } from 'src/molecules';
import { CardBody } from 'src/atoms';
import { route } from '../Routes';
import { fromUnixTimeStamp, planEta, secondsToTimeString } from '../utils/date';
import React from 'react';

export function DashboardTrainingCard({ item }) {
  return (
    <div className={'dit ph2 w-100 mw6'} key={'workoutPlan' + item.id}>
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
            {item.intervalLength}s interval - {item.intervalPauseLength}s break
            - {item.roundsPauseLength}s round break
          </p>
          <p className={'f4 f5-ns green tc'}>
            total time: {secondsToTimeString(planEta(item))} s
          </p>
        </CardBody>
      </CardLink>

      <div className={'overflow-y-auto-ns max-vh-50-ns ph2 mb3'}>
        {item.history.length > 0 && (
          <Card className={'dn db-ns green'}>
            {item.history.map((historyItem, index) => (
              <CardBody
                className={'green'}
                key={'workoutPlan' + item.id + 'history' + historyItem.id}
                hasTopBorder={index+1 !== item.history.length}
              >
                <p className={'f4 f5-ns green'}>
                  From: {fromUnixTimeStamp(historyItem.startAt)}
                </p>
                <p className={'f4 f5-ns green'}>
                  Until: {fromUnixTimeStamp(historyItem.endAt)}
                </p>
                <p className={'f4 f5-ns green'}>
                  {historyItem.calories &&
                    ' Burnt calories: ' + historyItem.calories + ' kcal'}
                </p>
              </CardBody>
            )).reverse()}
          </Card>
        )}
      </div>
    </div>
  );
}
