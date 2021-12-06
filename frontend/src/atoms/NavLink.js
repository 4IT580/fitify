import React from 'react';
import classNames from 'classnames';
import { NavLink as RouterNavLink } from 'react-router-dom';

import { Link } from './Link';

export function NavLink({ className, ...rest }) {
  return (
    <Link
      as={RouterNavLink}
      className={classNames('green dim ph3', className)}
      activeClassName={'bg-green i-dark'}
      noUnderline
      {...rest}
    />
  );
}
