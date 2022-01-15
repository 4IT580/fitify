import React from 'react';
import { Field } from 'formik';

export function RadioInput({ className, error, ...props }) {
  let map = props.radioOptions.map((optionValue) => (
    <div className={'w-50 dit tc mb2'}>
      <label className="ml3 f5-ns f4 " key={optionValue}>
        <Field
          type="radio"
          name={props.name}
          value={optionValue.value}
          className={'center mb2'}
        />
        <span className="b f5-ns f3">{optionValue.name}</span>
      </label>
    </div>
  ));

  return <div role="group">{map}</div>;
}
