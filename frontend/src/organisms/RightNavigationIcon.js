import React from 'react';
import { useHistory } from 'react-router-dom';
import { route } from 'src/Routes';
import { Link, NavLink, Button } from 'src/atoms/';
import { useAuth } from 'src/utils/auth';

export function RightNavigationIcon() {
    const { user, signout } = useAuth();
    const history = useHistory();

    return (
        <main className="right-navigation-icon">
                <>
                    <ul>
                        <NavLink exact to={route.settings()} className="pa3 dib-ns">
                            Settings
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
         </main>
     )
    }
