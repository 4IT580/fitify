import React, { useState } from 'react';
import { Button, Link } from 'src/atoms';
import { ConfirmModal } from 'src/molecules';
import { route } from '../Routes';

export function WorkoutHeaderButtonsActive({ planData }) {
  const [isConfirmModalShown, setIsConfirmModalShown] = useState(false);

  return (
    <div>
      <Link
        to={route.activeWorkout(planData.id)}
        className={'bg-animate br-pill f3 f5-m  tc'}
      >
        <Button className={'w-100  w-auto-l pv3 mt3'}>Start training</Button>
      </Link>

      <div>
        <Link
          to={route.editWorkout(planData.id)}
          className={'bg-animate br-pill f3 f5-m  tc'}
        >
          <Button className={'w-100  w-auto-l mt3 mb3 mh1-ns'}>
            Edit training
          </Button>
        </Link>

        <Link
          to={route.duplicateWorkout(planData.id)}
          className={'bg-animate br-pill f3 f5-m  tc'}
        >
          <Button className={'w-100  w-auto-l mb3 mt3 mh1-ns'}>
            Duplicate training
          </Button>
        </Link>

        {(planData.history.length > 0 && (
          <Link
            to={route.archiveWorkout(planData.id)}
            className={'bg-animate br-pill f3 f5-m  tc'}
          >
            <Button className={'w-100  w-auto-l mt3 mb3 mh1-ns'} color={'red'}>
              Archive
            </Button>
          </Link>
        )) || (
          <Link
            to={'#'}
            onClick={() => {
              setIsConfirmModalShown(true);
            }}
            className={'bg-animate br-pill f3 f5-m  tc'}
          >
            <Button className={'w-100  w-auto-l mt3 mb3 mh1-ns'} color={'red'}>
              Delete
            </Button>
          </Link>
        )}
      </div>
      {isConfirmModalShown && (
        <ConfirmModal message={'Do you really want to delete this training?'}>
          <Link
            className={'w-40 link dim br-pill ph4 pv3 dib red bg-red mr1'}
            noUnderline={true}
            to={route.deleteWorkout(planData.id)}
          >
            Yes
          </Link>
          <Link
            className={'w-40 link dim br-pill ph4 pv3 dib dark bg-green ml1'}
            noUnderline={true}
            to={'#'}
            onClick={() => {
              setIsConfirmModalShown(false);
            }}
          >
            No
          </Link>
        </ConfirmModal>
      )}
    </div>
  );
}
