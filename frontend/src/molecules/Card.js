import React from 'react';

import { Heading } from '../atoms';
import classNames from 'classnames';

export function Card({ headerValue, children, className, grid }) {
  return (
    <div className={grid}>
      <article className={classNames('ba mb4 br4 ma2', className)}>
        <Heading size={'lg'} className={'green pa3'}>
          {headerValue}
        </Heading>
        {children}
      </article>
    </div>
  );
}
