import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/images/fitify.svg';

import { AvatarPhoto, Link, NavLink, Button } from 'src/atoms/';
import { useAuth } from 'src/utils/auth';
import { route } from 'src/Routes';

export function TopNavigation() {
  const { user, signout } = useAuth();
  const history = useHistory();

  return (
    <nav className="flex justify-between bb">
      <Link
        to={route.home()}
        noUnderline
        className="b flex items-center pv2 ph3"
      >
        <Logo style={{ height:98, width: 110 }} className="mr1 f2"/>
        Fitify
      </Link>
      <div className="flex-grow flex items-center">
        <NavLink exact to={route.home()} className="pa3">
          Home
        </NavLink>
        <NavLink to={route.about()} className="pa3">
          About
        </NavLink>
        <NavLink to={route.foo()} className="pa3">
          My foo page
        </NavLink>
        {user ? (
          <>
            <NavLink
              to={route.userDetail(user.userName)}
              noUnderline
              className="ph3 pv1 h-100 flex items-center"
            >
              <AvatarPhoto
                className="v-mid dib mr2"
                src={user.profileImageUrl}
                alt={user.userName}
                size={2}
              />{' '}
              {user.name}
            </NavLink>
            <Button
              color="navbar"
              border
              narrow
              onClick={() => {
                signout();
                history.push(route.home());
                window.location.reload();
              }}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <NavLink to={route.signIn()} className="pa3">
              Sign In
            </NavLink>
            <NavLink to={route.signUp()} className="pa3">
              Sign up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
