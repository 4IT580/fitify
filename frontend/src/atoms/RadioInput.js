import React from 'react';
import classNames from 'classnames';

export function RadioInput({ className, error, ...props }) {
  let map = props.radioOptions.map((optionValue) => (
      <label className="ml3">
        <input
          type="radio"
          className={classNames('', error ? 'b--red' : 'b--black-20', className)}
          value={optionValue}
          name={props.name}
        />
        {optionValue}
      </label>
  ));

  return <div role="group">{map}</div>;
}
