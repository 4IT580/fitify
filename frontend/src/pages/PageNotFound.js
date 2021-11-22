import React from 'react';

import { Link } from 'src/atoms/';
import { Placeholder } from 'src/templates/Placeholder';
import { route } from 'src/Routes';

export function PageNotFound() {
  return (
    <div className={'bg-white'}>
      <Placeholder title="Error 404">
        <p>
          Page not found, please return to <Link to={route.home()}>Home</Link>.
        </p>
      </Placeholder>
    </div>
  );
}
