import React, { useReducer, useEffect, useCallback, useState } from 'react';
import {
  NewTrainingTemplate,
  WorkoutTemplate,
} from 'src/templates/NewTrainingTemplate';
import { useHistory } from 'react-router-dom';
import {
  initialState,
  listExerciseReducer,
  replace,
} from 'src/reducers/listExerciseReducer';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useAuth } from 'src/utils/auth';
import { route } from '../Routes';

const EXERCISES_QUERY = gql`
  query Exercises {
    exercises {
      id
      name
    }
  }
`;

const CREATEWORKOUT_MUTATION = gql`
  mutation CreateWorkout(
    $userId: Int!
    $name: String!
    $rounds: Int!
    $intLength: Int!
    $intPauseLength: Int!
    $roundsPauseLength: Int!
    $workoutLength: Int!
    $exercises: [ExerciseInput]!
  ) {
    createWorkout(
      userId: $userId
      name: $name
      rounds: $rounds
      intLength: $intLength
      intPauseLength: $intPauseLength
      roundsPauseLength: $roundsPauseLength
      workoutLength: $workoutLength
      exercises: $exercises
    )
  }
`;

export function NewTrainingPage() {
  const auth = useAuth();
  const history = useHistory();
  const { user } = useAuth();
  let arrayOfItems = [];
  let initialList = true;
  let isSetListFromDatabase = false;
  const [initial, isInitial] = useState(true);

  const work = {
    list: [
      {
        id: 0,
        sequence: 0,
      },
      {
        id: 1,
        sequence: 1,
      },
    ],
  };
  // workoutitems: [
  //    { id: 0, sequence: 0 },
  //    { id: 1, sequence: 1 },
  //  ];
  const [successMessage, setSuccessMessage] = useState(null);
  const [createWorkoutRequest, createWorkoutRequestState] = useMutation(
    CREATEWORKOUT_MUTATION,
    {
      onCompleted: (date) => {
        setSuccessMessage('Training was successfully created.');
      },
      onError: () => {
        console.log('login error');
      },
    },
  );

  //  console.log('zkousimc pripojeni do db exercises', work.list, 'work', work);
  console.log('NewTrainingPage');
  const exercises = useQuery(EXERCISES_QUERY);
  const { id, name, data } = exercises;
  const [state, dispatch] = useReducer(listExerciseReducer, initialState);

  console.log('user of page', user.id);
  //  console.log('exercises', exercises);
  //  console.log('exercises.data', exercises.data);
  //  console.log('exercises.variables', exercises.variables);
  console.log('data v state.workoutitems', state.workoutItems);

  if (exercises.data != null && initial == true) {
    const result4 = Object.keys(exercises.data).map(
      (key) => exercises.data[key],
    );
    console.log('result 4', result4[0]);
    console.log('initialList brambora s kokosem', initial);
    arrayOfItems = result4[0];
    //    arrayOfItems.slice().sort();
    state.workoutItems = arrayOfItems;

    isInitial(false);
    console.log('initialList brambora bez kokosu', initial);
  }

  const people = [
    {
      firstName: 'Adam',
      lastName: 'Jedlička',
    },
    {
      firstName: 'Franta',
      lastName: 'Sádlo',
    },
  ];

  const firstNames = people.map((person) => {
    //    const iddqd=person[person.firstName, person.lastName];
    const iddqd = {
      firstname: person.firstName,
      lastName: person.lastName,
    };
    return iddqd;
  });
  console.log('test list persons predtim', people);
  console.log('test list persons', firstNames);
  const currentList = state.workoutItems.map((value) => {
    const list = {
      id: value.id,
      sequence: value.id,
    };
    return list;
  });
  console.log('initialList after =', initialList);
  console.log('currentList =', currentList);
  let workoutitems = [
    { id: 0, sequence: 0 },
    { id: 1, sequence: 1 },
  ];

  console.log('workout items šablona =', workoutitems);

  const handleCreateWorkoutFormSubmit = useCallback(
    (values) => {
      createWorkoutRequest({
        variables: {
          userId: user.id,
          name: values.name,
          rounds: values.rounds,
          intLength: values.intLength,
          intPauseLength: values.intPauseLength,
          roundsPauseLength: values.roundsPauseLength,
          workoutLength: 60,
          workoutItems: [
            { id: 0, sequence: 0 },
            { id: 1, sequence: 1 },
          ],
        },
      });
    },
    [createWorkoutRequest],
  );
  // useEffect(() => {
  //   console.log(
  //     'inside new training page',
  //     JSON.stringify(arrayOfItems, null, ' '),
  //   );
  // }, [state]);

  // if (arrayOfItems !== null) {
  //   // state.workoutItems = arrayOfItems;
  //   // if (isSetListFromDatabase == false) {
  //   //   dispatch(replace(arrayOfItems));
  //   //   isSetListFromDatabase = true;
  //   //   console.log('fsfs', isSetListFromDatabase);
  //   // }
  // }

  console.log('data v state.workoutitems po importu', state.workoutItems);
  return (
    <NewTrainingTemplate
      workoutItems={state.workoutItems}
      dispatch={dispatch}
      isLoading={createWorkoutRequestState.loading}
      error={createWorkoutRequestState.error}
      onSubmit={handleCreateWorkoutFormSubmit}
    />
  );
}
