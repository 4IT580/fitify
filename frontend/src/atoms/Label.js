import React from 'react';
import classNames from 'classnames';

export function Label({ className, ...props }) {
  return (
    <label className={classNames('f5-ns f3 b db mb1', className)} {...props} />
  );
}
