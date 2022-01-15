import React from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { LoadingButton } from 'src/molecules/';
import { gql, useMutation, useQuery } from '@apollo/client';
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
  rounds: yup.string(),
  intLength: yup.number().min(5).required().integer(),
  intPauseLength: yup.number().min(5).required().integer(),
  roundsPauseLength: yup.number().min(5).required().integer(),
});

export function EditWorkoutForm({
  isLoading,
  errorMessage,
  successMessage,
  className,
  onSubmit,
  children,
  workout,
}) {
  const auth = useAuth();
  const { user } = useAuth();
  const { workoutPlanId } = useParams();
  const workoutPlan = useQuery(WORKOUT_PLAN, {
    variables: { id: parseInt(workoutPlanId) },
  });
  //console.log('sem v editu, a PLAN je:', workoutPlan.data.workoutPlan.name);
  const initialValues = {
    name: '',
    rounds: '',
    intLength: '',
    intPauseLength: '',
    roundsPauseLength: '',
    exercises: [],
  };
  initialValues.exercises = [];
  let currentList = workout.map((value) => {
    let list = {
      id: value.id,
      sequence: value.position,
    };
    return list;
  });

  if (workoutPlan.loading === false) {
    console.log('sem v editu, a PLAN je:', workoutPlan.data.workoutPlan.name);
    console.log('sem v editu, initial pred je:', initialValues.name);
    initialValues.name = workoutPlan.data.workoutPlan.name;
    console.log('sem v editu, initial po je:', initialValues.name);
  }
  return (
    <Formik
      onSubmit={function (values, actions) {
        onSubmit({ ...values, exercises: currentList });
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
          value="jkjk"
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
