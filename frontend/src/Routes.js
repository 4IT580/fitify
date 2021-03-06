import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomePage } from 'src/pages/HomePage';
import { PageNotFound } from 'src/pages/PageNotFound';
import { SignInPage } from 'src/pages/SignInPage';
import { SignUpPage } from 'src/pages/SignUpPage';
import { ForgottenPasswordPage } from 'src/pages/ForgottenPasswordPage';
import { ActivateUserPage } from 'src/pages/ActivateUserPage';
import { ResetPasswordPage } from 'src/pages/ResetPasswordPage';
import { UserDetailPage } from 'src/pages/UserDetailPage';
import { DashboardPage } from 'src/pages/DashboardPage';
import { NewTrainingPage } from 'src/pages/NewTrainingPage';
import { WorkoutPage } from 'src/pages/WorkoutPage';
import { TimerWrapperPage } from 'src/pages/TimerWrapperPage';
import { FinishWorkoutPage } from 'src/pages/FinishWorkoutPage';
import { ArchiveWorkoutPage } from './pages/ArchiveWorkoutPage';
import { DeleteWorkoutPage } from './pages/DeleteWorkoutPage';
import { EditTrainingPage } from './pages/EditTrainingPage';

export const route = {
  home: () => `/`,
  foo: () => `/foo`,
  about: () => `/about`,
  signIn: () => `/auth/signin`,
  signUp: () => `/auth/signup`,
  forgottenPassword: () => `/auth/forgotten-password`,
  activateUser: () => `/auth/activate`,
  resetPassword: () => `/auth/reset-password`,
  settings: () => `/settings`,
  dashboard: () => `/dashboard`,
  newTraining: () => `/new-training`,
  workout: (workoutPlanId) => `/workout/${workoutPlanId}`,
  workoutTimer: (workoutPlanId, workoutHistoryItemId) =>
    `/workout/${workoutPlanId}/${workoutHistoryItemId}`,
  activeWorkout: (workoutPlanId) => `/active-workout/${workoutPlanId}`,
  finishWorkout: (workoutPlanId, startTime) =>
    `/finisned-workout/${workoutPlanId}/${startTime}`,
  editWorkout: (workoutPlanId) => `/edit-workout/${workoutPlanId}`,
  duplicateWorkout: (workoutPlanIdToDuplicate) =>
    `/new-training/${workoutPlanIdToDuplicate}`,
  archiveWorkout: (workoutPlanId) => `/archive-workout/${workoutPlanId}`,
  deleteWorkout: (workoutPlanId) => `/delete-workout/${workoutPlanId}`,
};

export function Routes() {
  return (
    <Switch>
      <Route path={route.home()} exact component={HomePage} />
      <Route path={route.signIn()} exact component={SignInPage} />
      <Route path={route.signUp()} exact component={SignUpPage} />
      <Route path={route.resetPassword()} exact component={ResetPasswordPage} />
      <Route
        path={route.forgottenPassword()}
        exact
        component={ForgottenPasswordPage}
      />
      <Route path={route.activateUser()} exact component={ActivateUserPage} />
      <Route path={route.dashboard()} exact component={DashboardPage} />
      <Route path={route.newTraining()} exact component={NewTrainingPage} />
      <Route path={route.settings()} exact component={UserDetailPage} />

      <Route
        path={route.workout(':workoutPlanId')}
        exact
        component={WorkoutPage}
      />

      <Route
        path={route.activeWorkout(':workoutPlanId')}
        exact
        component={TimerWrapperPage}
      />

      <Route
        path={route.finishWorkout(':workoutPlanId', ':startTime')}
        exact
        component={FinishWorkoutPage}
      />

      <Route
        path={route.archiveWorkout(':workoutPlanId')}
        exact
        component={ArchiveWorkoutPage}
      />

      <Route
        path={route.deleteWorkout(':workoutPlanId')}
        exact
        component={DeleteWorkoutPage}
      />

      <Route
        path={route.duplicateWorkout(':workoutPlanIdToDuplicate')}
        exact
        component={NewTrainingPage}
      />

      <Route
        path={route.editWorkout(':workoutPlanIdToEdit')}
        exact
        component={EditTrainingPage}
      />

      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}
