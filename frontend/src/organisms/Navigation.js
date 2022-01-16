import React, { useState } from 'react';
import { ReactComponent as Logo } from '../assets/images/fitify.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BurgerDesktop } from './BurgerDesktop';

import { Link, NavLink } from 'src/atoms/';
import { useAuth } from 'src/utils/auth';
import { route } from 'src/Routes';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

export function Navigation() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <main className="dn db-ns">
      <nav className="flex justify-between bb bg-dark">
        <Link
          to={user ? route.dashboard() : route.home()}
          noUnderline
          className="b flex items-center green"
        >
          <Logo className="mr1 f2 fitify-logo" />
        </Link>
        <div className="flex-grow flex items-center mr4">
          {user ? (
            <>
              <NavLink exact to={route.dashboard()} className="pa3 dib-ns">
                Dashboard
              </NavLink>
              <NavLink exact to={route.newTraining()} className="pa3 dib-ns">
                New Training
              </NavLink>

              <FontAwesomeIcon
                icon={faUserCircle}
                className={'ma2 green f2 pointer'}
                onClick={() => setOpen(!open)}
              />
              {open && <BurgerDesktop />}
            </>
          ) : (
            <>
              <NavLink exact to={route.home()} className="pa3 dib-ns">
                Home
              </NavLink>
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
    </main>
  );
}
