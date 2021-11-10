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
        'link',
        'dark pv2 ph3 f5-ns',
        { 'underline-hover': !noUnderline },
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
