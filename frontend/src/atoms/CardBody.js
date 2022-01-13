import React from 'react';
import classNames from 'classnames';

export function CardBody({ children, className, hasTopBorder = true }) {
  return (
    <div className={classNames('ph3 pv1 br--top br6 tl' + (hasTopBorder ? ' bt' : ''), className)}>
      {children}
    </div>
  );
}
