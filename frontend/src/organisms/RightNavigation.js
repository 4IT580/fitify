import React from 'react';

export function RightNavigation () {
    return (
        <ul>
            <li><a href="http://localhost:3000">Home</a></li>
            <li><a href="http://localhost:3000/auth/signin">Sign In</a></li>
            <li><a href="http://localhost:3000/auth/signup">Sign Up</a></li>
        </ul>
    )
}