import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { ErrorBanner } from 'src/atoms/';
import { LoadingButton } from 'src/molecules/';
import { FormikField } from 'src/molecules/';
import { Link, Button, Loading } from 'src/atoms/';
import { CardBody, Heading, List, ListItem } from "../atoms";
import { fromUnixTime, fromUnixTimeStamp } from "../utils/date";
import { route } from "../Routes";
import { Card, WorkoutHeader } from "../molecules";


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
        <>
          <WorkoutHeader planData={planData}/>

          <div className={'cf'}>
            <Card headerValue={'Train'} className={''}>
              <CardBody>
                <p className={'f5 f7-ns green'}>Interval length: {planData.intervalLength}s</p>
                <p className={'f5 f7-ns green'}>Interval pause length: {planData.intervalPauseLength}s</p>
                <p className={'f5 f7-ns green'}>rounds: {planData.rounds}</p>
                <p className={'f5 f7-ns green'}>rounds pause length: {planData.roundsPauseLength}s</p>
              </CardBody>
            </Card>

            <Card headerValue={'Exercises'} float={'fr'}>
              {planData.exercises.map((exerciseItem) => (
                <CardBody key={'exerciseItem'+ exerciseItem.id}>
                  <Heading size={'md'} className={'green mt3'}>
                    {exerciseItem.name}
                  </Heading>
                  <Heading size={'xs'} className={'green f7-ns mt3 bg-dark pa3 br3 lh-copy'}>
                    {exerciseItem.description}
                  </Heading>

                  <div className={'cf mb3'}>
                    <List className={'fl w-100 w-50-ns'} headerValue={'Body parts'} items={exerciseItem.bodyParts}/>
                    <List className={'fl w-100 w-50-ns'} headerValue={'Equipment you can use'} items={exerciseItem.equipment}/>
                  </div>
                </CardBody>
              ))
              }
            </Card>

            <Card headerValue={'Workout history'}>
              {planData.history.filter((historyItem) => (historyItem.status === 'finished')).map((historyItem) => (
                <CardBody key={'historyItem' + historyItem.id}>
                  <p className={'f5 f7-ns green'}>From: {fromUnixTimeStamp(historyItem.startAt)}</p>
                  <p className={'f5 f7-ns green'}>Until: {fromUnixTimeStamp(historyItem.endAt)}</p>
                  <p className={'f5 f7-ns green'}>{historyItem.calories && ' Burnt calories: ' + historyItem.calories}</p>

                  <Link className={'dit bg-animate mb3 br-pill bg-green dim ph5 tr-ns f3 f7-ns'} noUnderline={true} to={'/'}>Repeat workout</Link>
                </CardBody>

              ))
              }
            </Card>

          </div>

        </>
      )
      }

    </>
  );
}
