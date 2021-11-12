import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { ErrorBanner } from 'src/atoms/';
import { LoadingButton } from 'src/molecules/';
import { FormikField } from 'src/molecules/';
import { Link, Button, Loading } from 'src/atoms/';
import { Heading } from "../atoms";
import { fromUnixTime, fromUnixTimeStamp } from "../utils/date";
import { route } from "../Routes";


export function WorkoutPlanView ({planData, isLoading, error, refetch}) {
  console.log(planData);
  let latestActiveWorkout = planData && planData.history
    .filter((historyItem) => (historyItem.status === 'active'))
    .sort(function (first, second) {
      return second.startAt - first.startAt
    })
    [0]

  return (
    <>
      {isLoading && !planData && <Loading/>}

      {error && (
        <ErrorBanner title={error.message}>
          <Button color="red" onClick={() => refetch()}>
            Reload
          </Button>
        </ErrorBanner>
      )}

      {planData && (
        <div className="cf">
          <div className={'tr cf'}>
            <div>
              <Link to={route.workoutTimer('tt123', planData.id, latestActiveWorkout.id)} className={'bg-green br-pill ph5 mr7'}>
                Continue workout
              </Link>
            </div>
            <Heading size={'lg'} className={'green mt-2 nt4'}>
              {planData.name}
            </Heading>
            <small className={'white'}>Created at: {fromUnixTimeStamp(planData.createdAt)}</small>
          </div>


          <div className={'cf'}>
            <div className={'w-100 w-50-l  fl'}>
              <article className="hidden ba ma4">
                <h1 className="f1 bg-dark white mv0 pv2 ph3">Train</h1>
                <div className="pa3 bt bg-white tl">
                  <p className={'f2 f5-ns dark'}>Interval length: {planData.intervalLength}</p>
                  <p className={'f2 f5-ns dark'}>Interval pause length: {planData.intervalPauseLength}</p>
                  <p className={'f2 f5-ns dark'}>rounds: {planData.rounds}</p>
                  <p className={'f2 f5-ns dark'}>rounds pause length: {planData.roundsPauseLength}</p>
                  <Link className={'dib bg-animate pv2 br-pill bg-green dim ph5'} noUnderline={true} to={'/'}>Edit</Link>
                </div>
              </article>
            </div>

            <div className={'w-100 w-50-l  fr'}>
              <article className="hidden ba ma4">
                <h1 className="f1 bg-dark white mv0 pv2 ph3">Exercises</h1>
                {planData.exercises.map((exerciseItem) => (
                  <div key={'exerciseItem' + exerciseItem.id} className="pa3 bt bg-white tl">
                    <Heading size={'md'} className={'green'}>
                      {exerciseItem.name}
                    </Heading>
                    <p className="f2 f5-ns lh dark-copy measure mv0 pb3 dark">
                      {exerciseItem.description}
                    </p>
                    <div className={'cf'}>
                      <div className='w-100 w-50-ns mt3 fl'>
                        {exerciseItem.bodyParts.length > 0 && (
                          <>
                            <Heading size={'md'}>Body parts</Heading>
                            {exerciseItem.bodyParts.map((bodyPart) => (
                              <p key={'bodyPart' + bodyPart.id} className="f2 f5-ns lh-copy measure mv0 dark">{bodyPart.name}</p>
                            ))}
                          </>
                        )
                        || <span className={'dn db-ns'}>&nbsp;</span>
                        }

                      </div>
                      <div className='w-100 w-50-ns mt3 fl'>
                        {exerciseItem.equipment.length > 0 && (
                          <>
                            <Heading size={'md'}>Equipment you can use</Heading>
                            {exerciseItem.equipment.map((equipmentItem) => (
                              <p key={'equipmentItem' + equipmentItem.id} className="f2 f5-ns lh-copy measure mv0 dark">{equipmentItem.name}</p>
                            ))}
                          </>
                        )
                        || <span className={'dn db-ns'}>&nbsp;</span>
                        }
                      </div>
                    </div>
                  </div>
                ))}
              </article>
            </div>


            <div className={'w-100 w-50-l  fl'}>
              <article className="hidden ba ma4">
                <h1 className="f1 bg-dark white mv0 pv2 ph3">Workout history</h1>
                {planData.history.filter((historyItem) => (historyItem.status === 'finished')).map((historyItem) => (
                  <div key={'historyItem' + historyItem.id} className="pa3 bt bg-white tl">
                    <p className={'f2 f5-ns dark'}>From: {fromUnixTimeStamp(historyItem.startAt)}</p>
                    <p className={'f2 f5-ns dark'}>{historyItem.endAt && ' Until: ' + fromUnixTimeStamp(historyItem.endAt)}</p>
                    <p className={'f2 f5-ns dark'}>{historyItem.calories && ' Burnt calories: ' + historyItem.calories}</p>
                    {historyItem.status === 'finished'
                    && (
                      <Link className={'dib bg-animate pv2 br-pill bg-green dim ph5'} noUnderline={true} to={'/'}>Repeat workout</Link>
                    )
                    || (
                      <Link className={'dib bg-animate pv2 br-pill bg-green dim ph5'} noUnderline={true} to={'/'}>Start workout</Link>
                    )}
                  </div>
                ))}
              </article>
            </div>
          </div>


        </div>
      )
      }

    </>
  );
}
