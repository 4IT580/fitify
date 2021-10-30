import React from 'react';
import classNames from 'classnames';

export function RadioInput({ className, error, ...props }) {
  let map = props.radioOptions.map((optionValue) => (
    <div key={optionValue}>
      <input
        id={optionValue}
        type="radio"
        className={classNames('', error ? 'b--red' : 'b--black-20', className)}
        value={optionValue}
        name={props.name}
      />
      <label className="ml3" htmlFor={optionValue}>
        {optionValue}
      </label>
    </div>
  ));

  return <div>{map}</div>;
}
