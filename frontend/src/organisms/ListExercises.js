import React, { Fragment } from 'react';
import { SmallButton } from 'src/atoms/';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useAuth } from 'src/utils/auth';
import {
  initialState,
  listExerciseReducer,
  addWorkoutItem,
  deleteWorkoutItem,
  swapItems,
  replace,
} from 'src/reducers/listExerciseReducer';

export const List = ({ workoutItems, dispatch }) => {
  const EXERCISES_QUERY = gql`
    query Exercises {
      exercises {
        id
        name
      }
    }
  `;

  const exercises = useQuery(EXERCISES_QUERY);
  console.log('exercises', exercises);
  console.log('exercises.data konina', exercises.data);
  //  workoutItems.keys();

  // let poleKolen;
  // const map = { a: 1, b: 2, c: 3 };
  // const result = Object.keys(map).map((key) => map[key]);
  // console.log(result);
  // const result2 = Object.keys(workoutItems).map((key) => workoutItems[key]);
  // if (exercises.data != null) {
  //   const result3 = Object.keys(exercises).map((key) => exercises[key]);
  //   console.log('result 3 ', result3);
  //
  //   if (exercises.data != null) {
  //     const result4 = Object.keys(exercises.data).map(
  //       (key) => exercises.data[key],
  //     );
  //     console.log('result 4', result4[0]);
  //     poleKolen = result4[0];
  //     poleKolen.slice().sort();
  //   }
  // }

  const SortableItem = SortableElement(({ value, index, dispatch }) => (
    <div className="list__card" index={index}>
      <div className="center bg-dark green br2 pa2">
        <div className="list__card-right">
          <div className="list__card-right--name flex   ">
            <SmallButton
              className="pa2 mr3"
              onClick={() => dispatch(deleteWorkoutItem(value.id))}
            >
              X
            </SmallButton>
            {value.name}
            {
              // {value.id}
              //{value.position}
            }
            <div className=" "></div>
          </div>
        </div>
      </div>
    </div>
  ));

  const SortableList = SortableContainer(({ items }) => {
    if (items == null) {
      return '';
    } else
      return (
        //      console.log('jsem uvnitř sortabe listu ', items),
        <div className="list">
          {items.map((value, index) => (
            <SortableItem
              value={value}
              index={index}
              key={value.id}
              dispatch={dispatch}
            />
          ))}
        </div>
      );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    dispatch(swapItems(oldIndex, newIndex));
  };

  const listTitle = (
    <div className="list__title">
      <h2>
        List of workout
        <br /> items
      </h2>
    </div>
  );
  // if (poleKolen != null) {
  //   return (
  //     <Fragment>
  //       {listTitle}
  //       <SortableList items={workoutItems} onSortEnd={onSortEnd} axis="y" />
  //     </Fragment>
  //   );    console.log('initialList after =', initialList);
  // } else
  return (
    <Fragment>
      {listTitle}
      <SortableList items={workoutItems} onSortEnd={onSortEnd} axis="y" />
    </Fragment>
  );
};

export default List;
