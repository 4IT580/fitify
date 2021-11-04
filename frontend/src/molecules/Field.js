import React from 'react';

import { ErrorMessage, Label, TextInput, RadioInput } from 'src/atoms/';

export function Field({ id, label, error, ...props }) {
  return (
    <div className="mb2 w-100-ns">
      <Label htmlFor={id}>{label}</Label>
      {(props.as === 'radio' && (
        <RadioInput
          id={id}
          className="mb1 f5-ns f2"
          error={!!error}
          {...props}
        />
      )) || (
        <TextInput
          id={id}
          className="mb1 f5-ns f2"
          error={!!error}
          {...props}
        />
      )}
      {error && <ErrorMessage className="mb1 f6-ns f4">{error}</ErrorMessage>}
    </div>
  );
}
