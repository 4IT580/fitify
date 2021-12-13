import { React } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { ErrorBanner, SuccessBanner } from 'src/atoms/';
import { FormikField, LoadingButton } from 'src/molecules/';

const initialValues = {
  calories: '',
};

const schema = yup.object().shape({
  calories: yup
    .number()
    .required()
    .test(
      'Has min lenght?',
      'ERROR: must be positive integer',
      (value) => value ? value > 0 : true,
    ),
});

export function FinishWorkoutForm({
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
          id="calories"
          name="calories"
          label="Calories burned"
          type="number"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <LoadingButton type="submit" className="mt2 mb3" loading={isLoading}>
          Close training
        </LoadingButton>
        {children}
      </Form>
    </Formik>
  );
}
