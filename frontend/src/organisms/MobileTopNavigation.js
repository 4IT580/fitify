import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/images/fitify.svg';

import { AvatarPhoto, Link, NavLink, Button } from 'src/atoms/';
import { useAuth } from 'src/utils/auth';
import { route } from 'src/Routes';

export function MobileTopNavigation() {
    const { user, signout } = useAuth();
    const history = useHistory();

    return (
        <main className="mobile-top-navigation">
        <nav className="flex justify-between bb bg-dark w-100">
            <Link
                to={route.home()}
                noUnderline
                className="b flex items-center pv2 ph3 green"
            >
                <Logo style={{ height: 98, width: 110 }} className="mr1 f2" />
            </Link>
            <div className="flex-grow flex items-center mr4">
                <NavLink exact to={route.home()} className="pa3 dib-ns">
                    Home
                </NavLink>
                {user ? (
                    <>
                        <NavLink
                            to={route.userDetail(user.userName)}
                            noUnderline
                            className="ph3 pv1 h-100 flex items-center green"
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
    </main>
    );
}
