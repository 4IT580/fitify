import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { FormikField, LoadingButton } from 'src/molecules/';
import { ErrorBanner, SuccessBanner } from 'src/atoms/';
import { CardBody } from '../atoms';
import { secondsToTimeString } from '../utils/date';

const schema = yup.object().shape({
  name: yup.string().required().label('Name'),
  rounds: yup.number().required().integer(),
  intervalLength: yup.number().min(5).required().integer(),
  intervalPauseLength: yup.number().min(5).required().integer(),
  roundsPauseLength: yup.number().min(5).required().integer(),
});

export function NewWorkoutForm({
  isLoading,
  errorMessage,
  successMessage,
  className,
  onSubmit,
  children,
  workout,
  workoutPlan,
}) {
  let currentList = workout.map((value) => {
    return {
      id: value.id,
      sequence: value.position,
    };
  });

  const [notEnoughExercisesMessage, setNotEnoughExercisesMessage] =
    useState('');

  useEffect(() => {
    setNotEnoughExercisesMessage('');
  }, [workout]);

  return (
    <Formik
      onSubmit={function (values, actions) {
        if (currentList.length > 1) {
          onSubmit({ ...values, exercises: currentList });
        } else {
          setNotEnoughExercisesMessage('Cannot submit without exercises');
        }
      }}
      enableReinitialize={true}
      initialValues={{
        name: workoutPlan?.name ?? '',
        rounds: workoutPlan?.rounds ?? '',
        intervalLength: workoutPlan?.intervalLength ?? '',
        intervalPauseLength: workoutPlan?.intervalPauseLength ?? '',
        roundsPauseLength: workoutPlan?.roundsPauseLength ?? '',
      }}
      validationSchema={schema}
      validateOnBlur={false}
    >
      {({ values }) => (
        <Form className={className}>
          {errorMessage && <ErrorBanner title={errorMessage} />}
          {successMessage && <SuccessBanner title={successMessage} />}
          {notEnoughExercisesMessage && (
            <ErrorBanner title={notEnoughExercisesMessage} />
          )}
          <CardBody className={'pv3'}>
            <FormikField
              id="name"
              name="name"
              label="Name of workout"
              type="text"
              autoFocus="autofocus"
            />
            <FormikField
              id="rounds"
              name="rounds"
              label="Number of laps"
              type="number"
            />
            <FormikField
              id="intLength"
              name="intervalLength"
              label="Length of workout item in seconds"
              type="number"
            />
            <FormikField
              id="intPauseLength"
              name="intervalPauseLength"
              label="Pause between workout item in seconds"
              type="number"
            />
            <FormikField
              id="roundsPauseLength"
              name="roundsPauseLength"
              label="Pause between laps in seconds"
              type="number"
            />
          </CardBody>
          <CardBody>
            <LoadingButton
              type="submit"
              className="mv3 tc w-100"
              loading={isLoading}
              color="green"
            >
              Create training (
              {secondsToTimeString(
                (values.rounds || 0) *
                  (workout.length *
                    ((values.intervalLength || 0) +
                      (values.intervalPauseLength || 0))) -
                  (values.intervalPauseLength || 0),
              )}
              )
            </LoadingButton>
            {children}
          </CardBody>
        </Form>
      )}
    </Formik>
  );
}
