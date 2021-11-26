import React, { Fragment, useState } from 'react';
import { SmallButton, MainSectionDashboard, Button } from 'src/atoms/';
import { ReloadButton } from 'src/molecules/';
import { TopNavigationLogged } from 'src/organisms/';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import {
  initialState,
  listExerciseReducer,
  addWorkoutItem,
  deleteWorkoutItem,
  swapItems,
} from 'src/reducers/listExerciseReducer';

export const List = ({ workoutItems, dispatch }) => {
  // const [listData, setListData] = useState(initialState.workoutItems);
  const [setup, setSetup] = useState(true);
  /*  console.log(listData);*/
  const oldWorkoutItems = workoutItems;
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
            {value.id}
            {value.position}

            <div className=" "></div>
          </div>
        </div>
      </div>
    </div>
  ));

  const SortableList = SortableContainer(({ items }) => {
    if (setup) {
      console.log(setup);
      setSetup(false);
      console.log(setup);
      return (
        console.log('jsem uvnitř sortabe listu poprvý'),
        (
          <div className="list">
            {items
              .sort((a, b) => a.position - b.position)
              .map((value, index) => (
                <SortableItem
                  value={value}
                  index={index}
                  key={value.id}
                  dispatch={dispatch}
                />
              ))}
          </div>
        )
      );
    } else {
      return (
        console.log('jsem uvnitř sortabe listu podruhý'),
        (
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
        )
      );
    }
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    dispatch(swapItems(oldIndex, newIndex, oldWorkoutItems));
    // let arr = arrayMove(listData, oldIndex, newIndex);
    // for (let i = 0; i < arr.length; i++) {
    //   arr[i].position = i;
    // }

    console.log(
      'inside of listExercises',
      JSON.stringify(workoutItems, null, '  '),
    );
    console.log(
      'inside of listExercisesssss',
      JSON.stringify(oldWorkoutItems, null, '  '),
    );
  };

  const listTitle = (
    <div className="list__title">
      <h2>
        List of workout
        <br /> items
      </h2>
    </div>
  );

  return (
    <Fragment>
      {listTitle}
      <SortableList items={workoutItems} onSortEnd={onSortEnd} axis="y" />
    </Fragment>
  );
};
export default List;
