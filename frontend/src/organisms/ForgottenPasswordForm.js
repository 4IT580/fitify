import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { ErrorBanner,SuccessBanner } from 'src/atoms/';
import { LoadingButton } from 'src/molecules/';
import { FormikField } from 'src/molecules/';
import { Link } from 'src/atoms/';

const initialValues = {
  email: '',
};

const schema = yup.object().shape({
  email: yup.string().email().required().label('Email'),
});

export function ForgottenPasswordForm({
  isLoading,
  errorMessage,
  successMessage,
  className,
  onSubmit,
  children,
}) {
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={schema}
      validateOnBlur={false}
    >
      <Form className={className}>
        {errorMessage && <ErrorBanner title={errorMessage} className="mb3" />}
        {successMessage && <SuccessBanner title={successMessage} className="mb3" />}
        <FormikField
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="e.g. john@doe.com"
          autoFocus="autofocus"
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <div>
          <span>
            <LoadingButton
              type="submit"
              className="mt2 mb3"
              loading={isLoading}
              color="green"
            >
              Reset password
            </LoadingButton>
          </span>
        </div>

        {children}
      </Form>
    </Formik>
  );
}
