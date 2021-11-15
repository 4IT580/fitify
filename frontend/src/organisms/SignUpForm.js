import React from 'react';
import { Form, Formik, Field } from 'formik';
import * as yup from 'yup';

import { ErrorBanner, SuccessBanner } from 'src/atoms/';
import { FormikField, LoadingButton } from 'src/molecules/';

const initialValues = {
  name: '',
  surname: '',
  height: '',
  weight: '',
  gender: '',
  birthdate: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

const schema = yup.object().shape({
  name: yup.string().required().label('Name'),
  surname: yup.string().required().label('Surname'),
  height: yup
    .number()
    .required()
    .test(
      'Is positive?',
      'ERROR: The number must be greater than 0 and whole!',
      (value) => value > 0 && value % 1 === 0,
    )
    .label('Height'),
  weight: yup
    .number()
    .required()
    .test(
      'Is positive?',
      'ERROR: The number must be greater than 0!',
      (value) => value > 0,
    )
    .label('Weight'),
  sex: yup.string().required().oneOf(['male', 'female']).label('Gender'),
  birthdate: yup.date().required().label('Birth date'),
  email: yup.string().email().required().label('Email'),
  password: yup
    .string()
    .required()
    .label('Password')
    .test(
      'Has min lenght?',
      'ERROR: Minimum password length is 8 characters!',
      (value) => value && value.length >= 8,
    ),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .label('Password Confirmation'),
});

export function SignUpForm({
  isLoading,
  errorMessage,
  successMessage,
  className,
  onSubmit,
  children,
}) {
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
          label="Name"
          type="text"
          autoFocus="autofocus"
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormikField
          id="surname"
          name="surname"
          label="Surname"
          type="text"
          autoFocus="autofocus"
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormikField
          id="height"
          name="height"
          label="Height (cm)"
          type="number"
          autoFocus="autofocus"
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormikField
          id="weight"
          name="weight"
          label="Weight (kg)"
          type="number"
          autoFocus="autofocus"
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormikField
          id="sex"
          name="sex"
          label="Gender"
          as="radio"
          radioOptions={['male', 'female']}
          autoFocus="autofocus"
        />
        <FormikField
          id="birthdate"
          name="birthdate"
          label="Birth Date"
          type="date"
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormikField
          id="email"
          name="email"
          label="Email"
          type="text"
          placeholder="e.g. john@doe.com"
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormikField
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormikField
          id="passwordConfirmation"
          name="passwordConfirmation"
          label="Password Confirmation"
          type="password"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <LoadingButton
          type="submit"
          className="mt2 mb3 tc w-100"
          loading={isLoading}
        >
          Sign Up
        </LoadingButton>
        {children}
      </Form>
    </Formik>
  );
}
