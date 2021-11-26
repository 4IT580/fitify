import React from 'react';
import { route } from 'src/Routes';
import { Link, NavLink, Button } from 'src/atoms/';

export function RightNavigation () {
    return (
        <main className="right-navigation">
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
        </main>
    )
}