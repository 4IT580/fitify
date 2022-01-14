import React, { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { FormikField, LoadingButton } from 'src/molecules/';
import { ErrorBanner, SuccessBanner } from 'src/atoms/';
import { CardBody } from '../atoms';

const initialValues = {
  name: '',
  rounds: '',
  intervalLength: '',
  intervalPauseLength: '',
  roundsPauseLength: '',
};

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
}) {
  initialValues.exercises = [];
  let currentList = workout.map((value) => {
    return {
      id: value.id,
      sequence: value.position,
    };
  });

  const [notEnoughExercisesMessage, setNotEnoughExercisesMessage] =
    useState('');
  useEffect(() => {
    if (workout.length === 0) {
      setNotEnoughExercisesMessage('Choose some exercises');
    } else {
      setNotEnoughExercisesMessage('');
    }
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
      initialValues={initialValues}
      validationSchema={schema}
      validateOnBlur={false}
    >
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
            id="roundsPauseLength"
            name="roundsPauseLength"
            label="Pause between workout item in seconds"
            type="number"
          />
          <FormikField
            id="intPauseLength"
            name="intervalPauseLength"
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
            Create New Training
          </LoadingButton>
          {children}
        </CardBody>
      </Form>
    </Formik>
  );
}
