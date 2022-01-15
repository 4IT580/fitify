import React, { Fragment } from 'react';
import { SmallButton } from 'src/atoms/';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { deleteWorkoutItem, swapItems } from 'src/reducers/listExerciseReducer';

export const List = ({ workoutItems, dispatch }) => {
  const SortableItem = SortableElement(({ value, index, dispatch }) => (
    <div className="">
      <SmallButton
        className="mr3 mv2 pt1 f5-ns f3"
        onClick={() => dispatch(deleteWorkoutItem(value.id))}
      >
        ✖
      </SmallButton>
      <span className={'f5-ns f3 pointer'}>{value.name}</span>
    </div>
  ));

  const SortableList = SortableContainer(({ items }) => {
    if (items == null) {
      return '';
    } else
      return (
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

  return (
    <Fragment>
      <div className={'pv3'}>
        <SortableList
          items={workoutItems}
          onSortEnd={onSortEnd}
          axis="y"
          helperClass={'dragFloatItem'}
        />
      </div>
    </Fragment>
  );
};

export default List;
