import React from 'react';
import { Checkbox } from 'src/atoms/';
import { setWorkoutItemSelected } from 'src/reducers/listExerciseReducer';
export const ListAllWorkoutItems = ({ workoutItems, dispatch }) => {
  return (
    <div className={'pv3'}>
      {workoutItems.map((item, index) => (
        <div className="pb1" key={index}>
          <div className="flex items-center br1 pa1 hide-child f5-ns f3">
            <Checkbox
              key={item.id}
              className="mh1g"
              checked={item.selected}
              onChange={() =>
                dispatch(setWorkoutItemSelected(item.id, !item.selected))
              }
            />
            <span className={'ml2'}>{item.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ListAllWorkoutItems;
