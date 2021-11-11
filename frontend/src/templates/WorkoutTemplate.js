import React from 'react';

import {
  Heading,
  MainSectionDashboard
} from 'src/atoms/';
import {
  TopNavigationLogged,
  WorkoutPlanView
} from 'src/organisms/';

export function WorkoutTemplate ({data, loading, error, refetch, currentUser}) {
  return (
    <>
      <TopNavigationLogged/>
      <MainSectionDashboard>
        <Heading className="green">
          Your workout
        </Heading>
        <main className="grid-container-left pt7">
          <WorkoutPlanView
            planData={data && data.workoutPlan}
            isLoading={loading}
            error={error}
            refetch={refetch}
          />
        </main>
      </MainSectionDashboard>
    </>
  );
}
