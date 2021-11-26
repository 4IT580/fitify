import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/images/fitify.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link, NavLink, Button } from 'src/atoms/';
import { Burger, Navigation, MobileNavigation } from 'src/organisms/';
import { useAuth } from 'src/utils/auth';
import { route } from 'src/Routes';

export function TopNavigation() {
  const { user, signout } = useAuth();
  const history = useHistory();
  

  return (
    <>
    <main className="top-navigation">
      <Navigation />
      <MobileNavigation />
    </main>
    </>
  );
}
