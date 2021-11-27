import React from 'react';
import { useHistory } from 'react-router-dom';
import { route } from 'src/Routes';
import { NavLink, Button } from 'src/atoms/';
import { useAuth } from 'src/utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export function BurgerUser() {
    const { user, signout } = useAuth();
    const history = useHistory();

    return (
        <main className="burger-user">
                <>
                    <ul>
                        <NavLink exact to={route.settings()} className="pa3 dib-ns" >
                            <FontAwesomeIcon icon={faUser} className={'mr3'} />
                            {user.name}
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
