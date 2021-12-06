import React from 'react';
import classNames from 'classnames';

export function SuccessMessage({ className, ...props }) {
  return <div className={classNames('dark-green', className)} {...props} />;
}
