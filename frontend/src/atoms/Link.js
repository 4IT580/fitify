import React from 'react';
import classNames from 'classnames';
import { Link as RouterLink } from 'react-router-dom';

export function Link({
  children,
  className,
  noUnderline,
  as: Component = RouterLink,
  ...rest
}) {
  return (
    <Component
      className={classNames(
        'link no-underline',
        'bg-dark green hover-bg-light-dark pv2 ph3 br-pill f2 f5-ns',
        { 'underline-hover': !noUnderline },
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
