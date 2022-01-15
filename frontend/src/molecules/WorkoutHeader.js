import React from 'react';
import { Heading } from '../atoms';
import {
  WorkoutHeaderButtonsArchived,
  WorkoutHeaderButtonsActive,
} from 'src/molecules';

export function WorkoutHeader({ planData }) {
  return (
    <div className={'dt-l dt--fixed'}>
      <div className={'dtc-l'}>
        <Heading size={'xxl'} className={'green'}>
          {planData.name}
        </Heading>
      </div>
      <div className={'dtc-l tr-l items-end-l mb3'}>
        {(planData.isArchived === true && (
          <WorkoutHeaderButtonsArchived planData={planData} />
        )) || <WorkoutHeaderButtonsActive planData={planData} />}
      </div>
    </div>
  );
}
