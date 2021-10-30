import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { ErrorBanner } from 'src/atoms/';
import { LoadingButton } from 'src/molecules/';
import { FormikField } from 'src/molecules/';
import { route } from '../Routes';
import { Link } from 'src/atoms/';
import { Button } from '../atoms';

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
      onSubmit={function (values, actions) {
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
        <FormikField
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <div className="cf">
          <div className="tl-ns tc fl w-100 w-50-ns dib-ns">
            <LoadingButton
              type="submit"
              className="mt2 mb3"
              loading={isLoading}
              color="green"
            >
              Login
            </LoadingButton>
          </div>
          <div className="tl-ns tc fr-ns w-100 w-50-ns dib-ns mt6 mt3-ns">
            <Link
              to={route.forgottenPassword()}
              color="dark"
              noUnderline={true}
            >
              Zapomněli jste si heslo?
            </Link>
          </div>
        </div>

        {children}
      </Form>
    </Formik>
  );
}
