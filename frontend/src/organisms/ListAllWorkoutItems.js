import React, { Fragment } from 'react';
import { SmallButton, List, MainSectionDashboard, Button } from 'src/atoms/';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import {
  initialState,
  listExerciseReducer,
  addWorkoutItem,
  deleteWorkoutItem,
  swapItems,
} from 'src/reducers/listExerciseReducer';
export const ListAllWorkoutItems = ({ workoutItems, dispatch }) => {
  const listTitle = (
    <div className="list__title">
      <h2>
        List of workout
        <br /> items
      </h2>
    </div>
  );
  return (
    <List
      className={'fl w-100 w-50-ns'}
      headerValue={'all Items'}
      items={workoutItems}
    />
  );
};
export default ListAllWorkoutItems;
