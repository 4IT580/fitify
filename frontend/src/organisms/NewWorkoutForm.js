import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { LoadingButton } from 'src/molecules/';

import { ErrorBanner, SuccessBanner } from 'src/atoms/';
import { FormikField } from 'src/molecules/';

const initialValues = {
  name: '',
  rounds: '',
  intLength: '',
  intPauseLength: '',
  roundsPauseLength: '',
  exercises: [
    {
      id: 0,
      sequence: 3,
    },
    {
      id: 1,
      sequence: 2,
    },
    {
      id: 6,
      sequence: 6,
    },
  ],
};

const schema = yup.object().shape({
  name: yup.string().required().label('Name'),
  rounds: yup.number().required().positive().integer(),
  intLength: yup.number().required().positive().integer(),
  intPauseLength: yup.number().required().positive().integer(),
  roundsPauseLength: yup.number().required().positive().integer(),
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
  // initialValues.exercises = [
  //   {
  //     id: 0,
  //     sequence: 3,
  //   },
  //   {
  //     id: 1,
  //     sequence: 2,
  //   },
  // ];
  let currentList = workout.map((value) => {
    let list = {
      id: value.id,
      sequence: value.position,
    };
    return list;
  });
  initialValues.exercises = currentList;
  console.log('666666666666666', initialValues.exercises);
  console.log('666666666666666 workout je', workout);
  console.log('99999999 workout je', currentList);
  return (
    <Formik
      onSubmit={function (values, actions) {
        onSubmit(values);
      }}
      initialValues={initialValues}
      validationSchema={schema}
      validateOnBlur={false}
    >
      <Form className={className}>
        {errorMessage && <ErrorBanner title={errorMessage} className="mb3" />}
        {successMessage && (
          <SuccessBanner title={successMessage} className="mb3" />
        )}
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
          label="number of laps"
          type="number"
        />
        <FormikField
          id="intLength"
          name="intLength"
          label="length of workout item in seconds"
          type="number"
        />
        <FormikField
          id="roundsPauseLength"
          name="roundsPauseLength"
          label="pause between workout item in seconds"
          type="number"
        />
        <FormikField
          id="intPauseLength"
          name="intPauseLength"
          label="pause between laps in seconds"
          type="number"
        />
        <LoadingButton
          type="submit"
          className="mt2 mb3 tc w-100"
          loading={isLoading}
          color="green"
        >
          Create New Training
        </LoadingButton>

        {children}
      </Form>
    </Formik>
  );
}
