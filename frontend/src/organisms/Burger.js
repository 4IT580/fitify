import React, { useState } from 'react';
import { RightNavigation } from './RightNavigation';

export function Burger () {
    const [open, setOpen] = useState(false)
    const bool = true;

    return (
        <main className="burger">
        <>
            {bool ? (
                <>
                    <div>

                    </div>
                </>
            ) : (
                <>
                    <div>
                        
                    </div>
                </>
            )}
            <div>
                <div />
                <div />
                <div />
            </div>
            <RightNavigation open={open} />
        </>
    </main>
    )
};

