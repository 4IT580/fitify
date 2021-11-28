import React from 'react';
import { useHistory } from 'react-router-dom';
import { route } from 'src/Routes';
import { NavLink, Button } from 'src/atoms/';
import { useAuth } from 'src/utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export function Burger () {
    const { user, signout } = useAuth();
    const history = useHistory();

    return (
        <main className="burger">
            {user ? (
                <>
            <ul>
                    <NavLink exact to={route.settings()} className="pa3 dib-ns ma3" >
                            <FontAwesomeIcon icon={faUser} className={'mr3'} />
                            {user.name}
                    </NavLink>
                    <NavLink exact to={route.dashboard()} className="pa3 dib-ns ma3">
                        Dashboard
                    </NavLink>
                    <NavLink exact to={route.newTraining()} className="pa3 dib-ns ma3">
                        New Training
                    </NavLink>
                    <Button
                        color="dark"
                        className={'tl pv2 ma3'}
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
                    <NavLink exact to={route.home()} className="pa3 dib-ns ma3">
                        Home
                    </NavLink>
                    <NavLink to={route.signIn()} className="pa3 ma3">
                        Sign In
                    </NavLink>
                    <NavLink to={route.signUp()} className="pa3 ma3">
                        Sign up
                    </NavLink>
        </ul>
        </>
        )}
    </main>
    )
}