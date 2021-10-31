import React from 'react';
import classNames from 'classnames';
import { Field } from 'formik';

export function RadioInput({ className, error, ...props }) {
  let map = props.radioOptions.map((optionValue) => (
      <label className="ml3 f5-ns f2">
        <Field
          type="radio"
          name={props.name}
          value={optionValue}
        />
        <span className="ml2">{optionValue}</span>
      </label>
  ));

  return <div role="group">{map}</div>;
}
