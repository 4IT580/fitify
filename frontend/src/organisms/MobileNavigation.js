import React, { useState } from 'react';
import { ReactComponent as Logo } from '../assets/images/fitify.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Link } from 'src/atoms/';
import { useAuth } from 'src/utils/auth';
import { route } from 'src/Routes';
import { faUserCircle, faBars } from '@fortawesome/free-solid-svg-icons';
import { Burger } from './Burger';

export function MobileNavigation() {
    const { user } = useAuth();
    const  [open, setOpen] = useState (false);


    return (
        <main className="mobile-navigation">
        <nav className="flex justify-between bb bg-dark">
            <Link to={route.home()} noUnderline className="b flex items-center green">
                <Logo className="mr1 f2 fitify-logo" />
            </Link>
            <div className="flex-grow flex items-center mr4">
                {user ? (
                    <>
                      
                            <FontAwesomeIcon icon={faUserCircle} className={'mr1 f2 green pointer'}
                                onClick={() => setOpen(!open)} />
                            {open && <Burger />}
                            
                    </>
                ) : (
                    <>
                            <FontAwesomeIcon icon={faBars} className={'ma1 f2 green pointer'}
                                onClick={() =>  setOpen (!open)} /> 
                            {open && <Burger />}
                    </>
                )}
            </div>
        </nav>
     </main>
    );
}
