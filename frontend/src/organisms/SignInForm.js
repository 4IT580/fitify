import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { ErrorBanner } from 'src/atoms/';
import { LoadingButton } from 'src/molecules/';
import { FormikField } from 'src/molecules/';
import { route } from '../Routes';
import { Link } from 'src/atoms/';

const initialValues = {
  email: '',
  password: '',
};

const schema = yup.object().shape({
  email: yup.string().email().required().label('Email'),
  password: yup.string().required().label('Password'),
});

export function SignInForm({
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
        <FormikField
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <LoadingButton
          type="submit"
          className="mt2 mb3 tc w-100"
          loading={isLoading}
          color="green"
        >
          Login
        </LoadingButton>
        <div className={'mv0 w-100 tc'}>
          <Link to={route.forgottenPassword()} color="dark" noUnderline={false}>
            Did you forget password?
          </Link>
        </div>

        {children}
      </Form>
    </Formik>
  );
}
