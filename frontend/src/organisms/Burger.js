import React, { useState } from 'react';
import styled from 'styled-components';
import RightNavigation from './RightNavigation';

const Burger = () => {
    const [open, setOpen] = useState(false)

    return (
        <React.Fragment>
            <div>
                <div />
                <div />
                <div />
            </div>
            <RightNavigation open={open} />
        </React.Fragment>
    )
};

export default Burger;