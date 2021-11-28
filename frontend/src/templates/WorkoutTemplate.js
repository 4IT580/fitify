import React from 'react';

import { MainSection } from 'src/atoms/';
import { PageLayout, WorkoutPlanView } from 'src/organisms/';

export function WorkoutTemplate({
  data,
  loading,
  error,
  refetch,
  currentUser,
}) {
  return (
    <>
      <PageLayout bgClass={'background background-gym-dumbbell'}>
        <MainSection>
          <main className="grid-container-left pt4">
            <WorkoutPlanView
              planData={data && data.workoutPlan}
              isLoading={loading}
              error={error}
              refetch={refetch}
            />
          </main>
        </MainSection>
      </PageLayout>
    </>
  );
}
