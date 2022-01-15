import React from 'react';
import { Button, Link } from '../atoms';
import { route } from '../Routes';
import { useHistory } from 'react-router-dom';

export function WorkoutHeaderButtonsActive ({planData}) {
  const history = useHistory();

  return (
    <div>
      <Link
        to={route.activeWorkout(planData.id)}
        className={'bg-animate br-pill f3 f5-m  tc'}
      >
        <Button className={'w-100  w-auto-l pv3 mt3'}>Start workout</Button>
      </Link>

      <div>
        <Link
          to={route.editWorkout(planData.id)}
          className={'bg-animate br-pill f3 f5-m  tc'}
        >
          <Button className={'w-100  w-auto-l mt3 mh1-ns'}>Edit workout</Button>
        </Link>

        <Link
          to={route.duplicateWorkout(planData.id)}
          className={'bg-animate br-pill f3 f5-m  tc'}
        >
          <Button className={'w-100  w-auto-l mt3 mh1-ns'}>
            Duplicate workout
          </Button>
        </Link>

        {(planData.history.length > 0
          && (<Link
            to={route.archiveWorkout(planData.id)}
            className={'bg-animate br-pill f3 f5-m  tc'}
          >
            <Button className={'w-100  w-auto-l mt3 mh1-ns'} color={'red'}>
              Archive
            </Button>
          </Link>)
          || (<Link
              to={'#'}
              onClick={() => {
                if (window.confirm('really delete?')) {
                  //todo as modal
                  history.replace(route.deleteWorkout(planData.id));
                }
              }}
              className={'bg-animate br-pill f3 f5-m  tc'}
            >
              <Button className={'w-100  w-auto-l mt3 mh1-ns'} color={'red'}>
                Delete
              </Button>
            </Link>
          ))}
      </div>
    </div>
  );
}
