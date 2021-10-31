import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { PageWrapper } from 'src/templates/PageWrapper';

import { HomePage } from 'src/pages/HomePage';
import { PageNotFound } from 'src/pages/PageNotFound';
import { SignInPage } from 'src/pages/SignInPage';
import { SignUpPage } from 'src/pages/SignUpPage';
import { ForgottenPasswordPage } from 'src/pages/ForgottenPasswordPage';
import { UserDetailPage } from 'src/pages/UserDetailPage';
import { Dashboard } from 'src/pages/Dashboard';
import { NewTraining } from 'src/pages/NewTraining';

export const route = {
  home: () => `/`,
  foo: () => `/foo`,
  practical: (id) => `/practical/${id}`,
  about: () => `/about`,
  signIn: () => `/auth/signin`,
  signUp: () => `/auth/signup`,
  forgottenPassword: () => `/auth/forgotten-password`,
  userDetail: (userName) => `/${userName}`,
  dashboard: (userName) => `/${userName}/dashboard`,
  newTraining: (userName) => `/${userName}/new-training`,
};

export function Routes() {
  return (
    <Switch>
      <Route path={route.home()} exact component={HomePage} />
      <Route path={route.signIn()} exact component={SignInPage} />
      <Route path={route.signUp()} exact component={SignUpPage} />
      <Route
        path={route.forgottenPassword()}
        exact
        component={ForgottenPasswordPage}
      />
      <Route
        path={route.userDetail(':userName')}
        exact
        component={UserDetailPage}
      />
      <Route
        path={route.dashboard(':userName')}
        exact
        component={Dashboard}
      />
      <Route
        path={route.newTraining(':userName')}
        exact
        component={NewTraining}
      />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}
