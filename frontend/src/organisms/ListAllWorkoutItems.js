import React from 'react';
import { List } from 'src/atoms/';

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
