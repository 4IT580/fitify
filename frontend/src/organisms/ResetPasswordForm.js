import {React,useState} from 'react';
import { Form, Formik, Field } from 'formik';
import * as yup from 'yup';

import { ErrorBanner, SuccessBanner } from 'src/atoms/';
import { FormikField, LoadingButton } from 'src/molecules/';

const initialValues = {
  password: '',
  passwordConfirmation: '',
};

const schema = yup.object().shape({
  password: yup.string().required().label('Password'),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .label('Password Confirmation'),
});

export function ResetPasswordForm({
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
        {successMessage && <SuccessBanner title={successMessage} className="mb3" />}
        <FormikField
          id="password"
          name="password"
          label="New Password"
          type="password"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormikField
          id="passwordConfirmation"
          name="passwordConfirmation"
          label="New Password Confirmation"
          type="password"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <LoadingButton type="submit" className="mt2 mb3" loading={isLoading}>
          Reset Password
        </LoadingButton>
        {children}
      </Form>
    </Formik>
  );
}
