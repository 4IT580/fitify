import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { ErrorBanner } from 'src/atoms/';
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
  className,
  onSubmit,
  children,
}) {
  return (
    <Formik
      onSubmit={function (values, actions){
        alert(JSON.stringify(values, null, 2));
        // onSubmit();
      }}
      initialValues={initialValues}
      validationSchema={schema}
      validateOnBlur={false}
    >
      <Form className={className}>
        {errorMessage && <ErrorBanner title={errorMessage} className="mb3" />}
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
