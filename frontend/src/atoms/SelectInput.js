import React from 'react';
import classNames from 'classnames';

export function SelectInput({ className, error, selectOptions, ...props }) {
  return (
    <select
      className={classNames(
        'border-box input-reset ba pa2 db w-100 mt2 mb2',
        error ? 'border-red' : 'border-green',
        className,
      )}
      {...props}
    >
      {selectOptions.map((option) => {
        return <option value={option.value}>{option.name}</option>;
      })}
    </select>
  );
}
