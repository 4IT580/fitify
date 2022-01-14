import React from 'react';
import { Checkbox } from 'src/atoms/';
import { setWorkoutItemSelected } from 'src/reducers/listExerciseReducer';
export const ListAllWorkoutItems = ({ workoutItems, dispatch }) => {
  return (
    <div>
      {workoutItems.map((item) => (
        <div className="pb1">
          <div className="flex items-center bg-dark br1 pa1 hide-child">
            <Checkbox
              key={item.id}
              className="mh1g"
              checked={item.selected}
              onChange={() =>
                dispatch(setWorkoutItemSelected(item.id, !item.selected))
              }
            />
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
};
export default ListAllWorkoutItems;
