import React from 'react';
import { Heading, Link } from '../atoms';
import { fromUnixTimeStamp } from '../utils/date';
import { route } from '../Routes';
import classNames from 'classnames';

export function WorkoutHeader ({planData, className}) {
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
      <div className={'fr-ns mb3-ns'}>
        <Link
          className={'mv3 mv0-ns mh1-ns dt w-100 w-auto-ns tc  dib-ns bg-animate br-pill ph4 f3 f5-ns bg-green'}
          to={route.activeWorkout(planData.id)}
        >
          Start workout
        </Link>
        <div className={'mv3 mb0-ns mh1-ns db w-100 w-auto-ns tc tr-ns'}>
          <div className={'w-50 w-auto-ns dtig mb15-ns ml-auto-ns'}>
            <Link
              className={'bg-animate br-pill ph4 mh1-ns f3 f5-ns bg-green'}
              noUnderline={true}
              to={route.editWorkout(planData.id)}
            >
              Edit
            </Link>
          </div>
          <div className={'w-50 w-auto-ns dtig ml-auto-ns'}>
            <Link
              className={'bg-animate br-pill ph4 mh1-ns f3 f5-ns bg-red'}
              noUnderline={true}
              to={route.editWorkout(planData.id)}
            >
              {planData.history.length > 0
                && (<span>Archive</span>)
                || (<span>Delete</span>)
              }
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
