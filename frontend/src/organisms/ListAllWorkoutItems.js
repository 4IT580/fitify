import React from 'react';
import { List, Checkbox } from 'src/atoms/';
import {
  initialState,
  listExerciseReducer,
  loadedData,
  setWorkoutItemSelected,
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

  // const listItem({item,dispatch}){
  //
  //
  // }
  // const workoutTtems = {
  //   lastId: 2,
  //   workoutItems: [
  //     { id: 2, title: 'Eat Taco 🥵 🌮', done: false },
  //     { id: 1, title: 'Buy Taco 🛒 🌮', done: true },
  //   ],
  // };

  // className={'fl w-100 w-50-ns'}
  // headerValue={'all Items'}
  // items=""
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
