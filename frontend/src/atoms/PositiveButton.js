import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

export function PositiveButton({disabled, onClick, icon, size, theme}) {    
    return (
        <button
            className='green bg-dark bn pa3 br3'
            disabled={disabled}
            onClick={onClick}
        >
            <FontAwesomeIcon icon={ icon==="play" ? faPlay : faPause} />
        </button>
    )
}