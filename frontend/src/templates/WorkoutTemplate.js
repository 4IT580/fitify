import React from 'react';

import { Heading, MainSectionWorkout } from 'src/atoms/';
import { TopNavigation, WorkoutPlanView } from 'src/organisms/';

export function WorkoutTemplate({
  data,
  loading,
  error,
  refetch,
  currentUser,
}) {
  return (
    <>
      <TopNavigation />
      <MainSectionWorkout>
        <main className="grid-container-left pt4">
          <WorkoutPlanView
            planData={data && data.workoutPlan}
            isLoading={loading}
            error={error}
            refetch={refetch}
          />
        </main>
      </MainSectionWorkout>
    </>
  );
}
