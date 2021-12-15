import React from 'react';
import { Heading, Link } from '../atoms';
import { fromUnixTimeStamp } from '../utils/date';
import { route } from '../Routes';
import classNames from 'classnames';

export function WorkoutHeader({ planData, className }) {
  let latestActiveWorkout =
    planData &&
    planData.history
      .filter((historyItem) => historyItem.status === 'active')
      .sort(function (first, second) {
        return second.startAt - first.startAt;
      })[0];

  return (
    <div className={'dit w-100'}>
      <div className={classNames('fl-ns mb4', className)}>
        <Heading size={'xl'} className={'green'}>
          {planData.name}
        </Heading>
        <small className={'green'}>
          Created at: {fromUnixTimeStamp(planData.createdAt)}
        </small>
      </div>
      <div className={'fr-ns ml0 tc items-center tr-ns mb4 mb0-ns'}>
        <div className={'w-100'}>
          <Link
            className={'bg-animate dim bg-green br-pill ph4 mv0 f3 f5-ns '}
            to={route.activeWorkout(planData.id)}
          >
            Start workout
          </Link>
        </div>
        <div className={'w-100 mt4'}>
          <Link
            className={'bg-animate dim bg-green br-pill ph3 f3 f5-ns'}
            noUnderline={true}
            to={'/'}
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
