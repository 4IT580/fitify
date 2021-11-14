import React, { Fragment, useEffect, useState } from 'react';
import { SmallButton, MainSectionDashboard, button, Button } from 'src/atoms/';
import { ReloadButton } from 'src/molecules/';
import { TopNavigationLogged } from 'src/organisms/';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMove } from 'react-sortable-hoc';
import {
  initialState,
  listExerciseReducer,
  addWorkoutItem,
  deleteWorkoutItem,
} from 'src/reducers/listExerciseReducer';

export const List = ({ workoutItem, dispatch }) => {
  const [listData, setListData] = useState(initialState.workoutItems);

  /*  console.log(listData);*/

  const SortableItem = SortableElement(({ value, index, dispatch }) => (
    <div className="list__card" index={index}>
      <div className="center bg-dark green br2 pa2">
        <div className="list__card-left"></div>
        <div className="list__card-right">
          <div className="list__card-right--name flex  ">
            {value.name}
            <div className=" fr">
              <SmallButton
                className="pa2"
                onClick={() =>
                  dispatch(
                    deleteWorkoutItem(value.id),
                    console.log(initialState.workoutItems),
                    setListData(initialState.workoutItems),
                  )
                }
              >
                X
              </SmallButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  const SortableList = SortableContainer(({ items }) => {
    return (
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
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    let arr = arrayMove(listData, oldIndex, newIndex);
    for (let i = 0; i < arr.length; i++) {
      arr[i].position = i;
    }
    setListData(arr);
  };

  const listTitle = (
    <div className="list__title">
      <h2>Seznam cviků</h2>
      <Button>klick</Button>
    </div>
  );

  return (
    <Fragment>
      {listTitle}
      <SortableList items={listData} onSortEnd={onSortEnd} axis="y" />
      <div className="list ">{SortableList}</div>}
    </Fragment>
  );
};
export default List;
