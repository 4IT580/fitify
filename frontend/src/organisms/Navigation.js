import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/images/fitify.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RightNavigationIcon } from './RightNavigationIcon';

import { Link, NavLink, Button } from 'src/atoms/';
import { useAuth } from 'src/utils/auth';
import { route } from 'src/Routes';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

export function Navigation() {
    const { user, signout } = useAuth();
    const history = useHistory();
    const [open, setOpen] = useState(false);

    return (
        <main className="navigation">
            <nav className="flex justify-between bb bg-dark">
                <Link to={route.home()} noUnderline className="b flex items-center green">
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

                                <FontAwesomeIcon icon={faUserCircle} className={'ma2 green f2'}
                            onClick={() => setOpen(!open)} />
                            {open && <RightNavigationIcon />}  

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
