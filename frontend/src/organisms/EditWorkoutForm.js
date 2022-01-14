import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { LoadingButton } from 'src/molecules/';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useAuth } from 'src/utils/auth';
import { ErrorBanner, SuccessBanner } from 'src/atoms/';
import { FormikField } from 'src/molecules/';
const WORKOUT_PLAN = gql`
  query WorkoutPlan($id: Int!) {
    workoutPlan(id: $id) {
      id
      name
      rounds
      roundsPauseLength
      intervalLength
      intervalPauseLength
      workoutLength
      createdAt
      exercises {
        id
        name
      }
    }
  }
`;

const schema = yup.object().shape({
  name: yup.string().required().label('Name'),
  rounds: yup.number().required().positive().integer(),
  intLength: yup.number().required().positive().integer(),
  intPauseLength: yup.number().required().positive().integer(),
  roundsPauseLength: yup.number().required().positive().integer(),
});

export function EditWorkoutForm({
  isLoading,
  errorMessage,
  successMessage,
  className,
  onSubmit,
  children,
}) {
  const { user } = useAuth();
  const { workoutPlanId } = useParams();

  const workoutPlan = useQuery(WORKOUT_PLAN, {
    variables: { id: parseInt(workoutPlanId) },
  });
  console.log(workoutPlan, user);
  //console.log('sem v editu, a PLAN je:', workoutPlan.data.workoutPlan.name);

  const initialValues = {
    name: '',
    rounds: '',
    intLength: '',
    intPauseLength: '',
    roundsPauseLength: '',
  };

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
          Save Training
        </LoadingButton>

        {children}
      </Form>
    </Formik>
  );
}
