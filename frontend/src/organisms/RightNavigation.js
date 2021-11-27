import React from 'react';
import { useHistory } from 'react-router-dom';
import { route } from 'src/Routes';
import { Link, NavLink, Button } from 'src/atoms/';
import { useAuth } from 'src/utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export function RightNavigation () {
    const { user, signout } = useAuth();
    const history = useHistory();

    return (
        <main className="right-navigation">
            {user ? (
                <>
            <ul>
                    <NavLink exact to={route.settings()} className="pa3 dib-ns" >
                            <FontAwesomeIcon icon={faUser} className={'mr3'} />
                            {user.name}
                    </NavLink>
                    <NavLink exact to={route.dashboard()} className="pa3 dib-ns">
                        Dashboard
                    </NavLink>
                    <NavLink exact to={route.newTraining()} className="pa3 dib-ns">
                        New Training
                    </NavLink>
                    <Button
                        color="dark"
                        className={'tl pv2 f5'}
                        narrow
                        onClick={() => {
                            signout();
                            history.push(route.home());
                            window.location.reload();
                        }}
                    >
                        Sign Out
                    </Button>
                </ul>
                </>
            ) : (
                <>
        <ul>
                    <NavLink exact to={route.home()} className="pa3 dib-ns">
                        Home
                    </NavLink>
                    <NavLink to={route.signIn()} className="pa3">
                        Sign In
                    </NavLink>
                    <NavLink to={route.signUp()} className="pa3">
                        Sign up
                    </NavLink>
        </ul>
        </>
        )}
    </main>
    )
}