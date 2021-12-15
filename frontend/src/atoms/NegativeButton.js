import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStop } from '@fortawesome/free-solid-svg-icons';

export function NegativeButton({ onClick, icon, size, theme}) {    
    return (
        <button
            className='red bg-dark bn pa3 br3'
            onClick={onClick}
        >
            <FontAwesomeIcon icon={faStop} />    
        </button>
    )
}