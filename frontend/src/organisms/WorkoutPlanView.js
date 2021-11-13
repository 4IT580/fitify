import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { ErrorBanner } from 'src/atoms/';
import { LoadingButton } from 'src/molecules/';
import { FormikField } from 'src/molecules/';
import { Link, Button, Loading } from 'src/atoms/';
import { Heading } from "../atoms";


export function WorkoutPlanView ({planData, isLoading, error, refetch}) {
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
          <div className={'tr'}>
            <Heading size={'lg'} className={'green'}>
              {planData.name}
            </Heading>
            <small className={'green'}>Created at: {planData.createdAt}</small>
          </div>


          <div className={'cf'}>
            <div className={'w-100 w-50-l  fl'}>
              <article className="hidden ba ma4 br4">
                <h1 className="f1 bg-dark green br4 mv0 pv2 ph3">Train</h1>
                <div className="pa3 bt bg-dark o-70 tl">
                  <p className={'f2 f5-ns green'}>Interval length: {planData.intervalLength}</p>
                  <p className={'f2 f5-ns green'}>Interval pause length: {planData.intervalPauseLength}</p>
                  <p className={'f2 f5-ns green'}>rounds: {planData.rounds}</p>
                  <p className={'f2 f5-ns green'}>rounds pause length: {planData.roundsPauseLength}</p>
                  <Link className={'dib bg-animate pv2 br-pill bg-green dim'} noUnderline={true} to={'/'}>Edit</Link>
                </div>
              </article>
            </div>

            <div className={'w-100 w-50-l  fr'}>
              <article className="hidden ba ma4 br4">
                <h1 className="f1 bg-dark green br4 mv0 pv2 ph3">Exercises</h1>
                {planData.exercises.map((exerciseItem) => (
                  <div key={'exerciseItem'+exerciseItem.id} className="pa3 bt bg-dark o-70 tl">
                    <Heading size={'md'} className={'green'}>
                      {exerciseItem.name}
                    </Heading>
                    <p className="f2 f5-ns lh dark-copy measure mv0 pb3 green">
                      {exerciseItem.description}
                    </p>
                    <div className={'cf'}>
                      <div className='w-100 w-50-ns mt3 fl'>
                        {exerciseItem.bodyParts.length > 0 && (
                          <>
                            <Heading size={'md'}>Body parts</Heading>
                            {exerciseItem.bodyParts.map((bodyPart) => (
                              <p key={'bodyPart'+bodyPart.id} className="f2 f5-ns lh-copy measure mv0 green">{bodyPart.name}</p>
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
                              <p key={'equipmentItem'+equipmentItem.id} className="f2 f5-ns lh-copy measure mv0 green">{equipmentItem.name}</p>
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
              <article className="hidden ba ma4 br4">
                <h1 className="f1 bg-dark green br4 mv0 pv2 ph3">Workout history</h1>
                {planData.history.map((historyItem) => (
                  <div key={'historyItem'+historyItem.id} className="pa3 bt bg-dark o-70 tl">
                    <p className={'f2 f5-ns green'}>Status: {historyItem.status}</p>
                    <p className={'f2 f5-ns green'}>From: {historyItem.startAt}</p>
                    <p className={'f2 f5-ns green'}>{historyItem.endAt && ' Until: ' + historyItem.endAt}</p>
                    <p className={'f2 f5-ns green'}>{historyItem.calories && ' Burnt calories: ' + historyItem.calories}</p>
                    {historyItem.status === 'finished'
                    && (
                      <Link className={'dib bg-animate pv2 br-pill bg-green dim'} noUnderline={true} to={'/'}>Repeat workout</Link>
                    )
                    || (
                      <Link className={'dib bg-animate pv2 br-pill bg-green dim'} noUnderline={true} to={'/'}>Start workout</Link>
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
