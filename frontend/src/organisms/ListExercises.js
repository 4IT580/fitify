import React, { Fragment } from 'react';
import { SmallButton } from 'src/atoms/';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { deleteWorkoutItem, swapItems } from 'src/reducers/listExerciseReducer';

export const List = ({ workoutItems, dispatch }) => {
  console.log('list prvků uvnitř ListExercises', workoutItems);
  const SortableItem = SortableElement(({ value, index, dispatch }) => (
    <div className="list__card" index={index}>
      <div className="list__card-right--name flex   ">
        <SmallButton
          className="pa2 mr3"
          onClick={() => dispatch(deleteWorkoutItem(value.id))}
        >
          X
        </SmallButton>
        {value.name}
        <div className=" "></div>
      </div>
    </div>
  ));

  const SortableList = SortableContainer(({ items }) => {
    // console.log('999', items);
    if (items == null) {
      return '';
    } else
      return (
        <div className="list">
          {items.map((value, index) => (
            // console.log('index idčka je', value.id, index),
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
      <h2>List of workout items:</h2>
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
