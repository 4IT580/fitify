import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { FormikField, LoadingButton } from 'src/molecules/';

const initialValues = {
  currentPassword: '',
  newPassword: '',
  passwordConfirmation: '',
};

const schema = yup.object().shape({
  newPassword: yup
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
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .label('Password Confirmation'),
});

export function PasswordChangeForm({
  isLoading,
  className,
  onSubmit,
  children,
}) {
  return (
    <Formik
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
        window.scrollTo(0, 0);
      }}
      initialValues={initialValues}
      validationSchema={schema}
      validateOnBlur={false}
    >
      <Form className={className}>
        <FormikField
          id="currentPassword"
          name="currentPassword"
          label="Current password"
          type="password"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormikField
          id="newPassword"
          name="newPassword"
          label="New password"
          type="password"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormikField
          id="passwordConfirmation"
          name="passwordConfirmation"
          label="New password confirmation"
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
          Change password
        </LoadingButton>
        {children}
      </Form>
    </Formik>
  );
}
