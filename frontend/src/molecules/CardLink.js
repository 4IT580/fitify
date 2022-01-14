import React from 'react';

import { Heading, Link } from '../atoms';
import classNames from 'classnames';

export function CardLink({ headerValue, children, className, grid, to }) {
  return (
    <div className={grid}>
      <article className={classNames('ba mb4 br4', className)}>
        <Link to={to} noUnderline={true}>
          <Heading size={'lg'} className={'green pa3'}>
            {headerValue}
          </Heading>
          {children}
        </Link>
      </article>
    </div>
  );
}
