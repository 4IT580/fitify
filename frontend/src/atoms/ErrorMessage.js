import React from 'react';
import classNames from 'classnames';

export function ErrorMessage({ className, ...props }) {
  return <div className={classNames('dark-red', className)} {...props} />;
}
