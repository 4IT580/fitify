import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomePage } from 'src/pages/HomePage';
import { PageNotFound } from 'src/pages/PageNotFound';
import { SignInPage } from 'src/pages/SignInPage';
import { SignUpPage } from 'src/pages/SignUpPage';
import { ForgottenPasswordPage } from 'src/pages/ForgottenPasswordPage';
import { ResetPasswordPage } from 'src/pages/ResetPasswordPage';
import { UserDetailPage } from 'src/pages/UserDetailPage';
import { DashboardPage } from 'src/pages/DashboardPage';
import { NewTrainingPage } from 'src/pages/NewTrainingPage';
import { WorkoutPage } from 'src/pages/WorkoutPage';

export const route = {
  home: () => `/`,
  foo: () => `/foo`,
  about: () => `/about`,
  signIn: () => `/auth/signin`,
  signUp: () => `/auth/signup`,
  forgottenPassword: () => `/auth/forgotten-password`,
  resetPassword: () => `/auth/reset-password`,
  userDetail: (userId) => `/${userId}`,
  dashboard: () => `/dashboard`,
  newTraining: () => `/new-training`,
  workout: (workoutPlanId) => `/workout/${workoutPlanId}`,
  workoutTimer: (workoutPlanId, workoutHistoryItemId) =>
    `/workout/${workoutPlanId}/${workoutHistoryItemId}`,
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
      <Route path={route.dashboard()} exact component={DashboardPage} />
      <Route path={route.newTraining()} exact component={NewTrainingPage} />
      <Route
        path={route.userDetail(':userId')}
        exact
        component={UserDetailPage}
      />

      <Route
        path={route.workout(':workoutPlanId')}
        exact
        component={WorkoutPage}
      />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}
