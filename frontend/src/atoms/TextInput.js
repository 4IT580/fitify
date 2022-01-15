import React from 'react';
import classNames from 'classnames';

export function TextInput({ className, error, ...props }) {
  return (
    <input
      type="text"
      className={classNames(
        'border-box input-reset ba pa2 db w-100 mt2 mb2',
        error ? 'border-red' : 'border-green',
        className,
      )}
      {...props}
    />
  );
}
