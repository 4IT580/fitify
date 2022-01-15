import React from 'react';
import { Button, Link } from '../atoms';
import { route } from '../Routes';

export function WorkoutHeaderButtonsArchived({ planData }) {
  return (
    <div>
      <Link
        noUnderline={true}
        to={route.duplicateWorkout(planData.id)}
        className={'bg-animate br-pill f3 f5-m tc'}
      >
        <Button className={'w-100 w-auto-l pv3'}>Duplicate workout</Button>
      </Link>
    </div>
  );
}
