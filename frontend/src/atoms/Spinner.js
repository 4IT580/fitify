import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

export function Spinner(props) {
  return <FontAwesomeIcon icon={faDumbbell} spin {...props} />;
}
