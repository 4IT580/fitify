import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { ErrorBanner } from 'src/atoms/';
import { FormikField } from 'src/molecules/';

const initialValues = {
  name: '',
  numberLaps: '',
  lengthOfWorkoutItem: '',
  pauseBetweenLap: '',
  pauseBetweenWorkoutItem: '',
};

const schema = yup.object().shape({
  email: yup.string().email().required().label('Email'),
  password: yup.string().required().label('Password'),
});

export function NewWorkoutForm({
  isLoading,
  errorMessage,
  className,
  onSubmit,
  children,
}) {
  return (
    <Formik
      onSubmit={(values, actions) => {
        onSubmit(values);
      }}
      initialValues={initialValues}
      validationSchema={schema}
      validateOnBlur={false}
    >
      <Form className={className}>
        {errorMessage && <ErrorBanner title={errorMessage} className="mb3" />}
        <FormikField
          id="name"
          name="name"
          label="Name of workout"
          type="text"
          autoFocus="autofocus"
        />
        <FormikField
          id="numberLaps"
          name="numberLaps"
          label="number of laps"
          type="number"
        />
        <FormikField
          id="lengthOfWorkoutItem"
          name="lengthOfWorkoutItem"
          label="length of workout item in seconds"
          type="number"
        />
        <FormikField
          id="pauseBetweenWorkoutItem"
          name="pauseBetweenWorkoutItem"
          label="pause between workout item in seconds"
          type="number"
        />
        <FormikField
          id="pauseBetweenLap"
          name="pauseBetweenLap"
          label="pause between laps in seconds"
          type="number"
        />

        {children}
      </Form>
    </Formik>
  );
}
