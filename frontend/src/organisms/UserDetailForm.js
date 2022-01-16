import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { FormikField, LoadingButton } from 'src/molecules/';

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
});

export function UserDetailForm({
  data,
  isLoading,
  className,
  onSubmit,
  children,
}) {
  let miliDate = new Date(parseInt(data.user.birthdate))
    .toISOString()
    .split('T')[0];

  const initialValues = {
    name: data.user.name,
    surname: data.user.surname,
    height: data.user.height,
    weight: data.user.weight,
    sex: String(data.user.sex),
    birthdate: miliDate,
  };
  return (
    <Formik
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        window.scrollTo(0, 0);
      }}
      initialValues={initialValues}
      validationSchema={schema}
      validateOnBlur={false}
    >
      <Form className={className}>
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
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormikField
          id="height"
          name="height"
          label="Height (cm)"
          type="number"
          min="1"
          step="1"
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormikField
          id="weight"
          name="weight"
          label="Weight (kg)"
          min="1"
          step="0.1"
          autoComplete="on"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <FormikField
          id="sex"
          name="sex"
          label="Gender"
          as="radio"
          radioOptions={[
            { value: 'male', name: 'Male' },
            { value: 'female', name: 'Female' },
          ]}
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
        <LoadingButton
          type="submit"
          className="mt2 mb3 tc w-100"
          loading={isLoading}
        >
          Update user info
        </LoadingButton>
        {children}
      </Form>
    </Formik>
  );
}
