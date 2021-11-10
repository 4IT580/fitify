import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export function SuccessBanner({ className, title, children, ...props }) {
  return (
    <div
      className={classNames('pa4 bg-washed-red dark-green', className)}
      {...props}
    >
      <div
        className={classNames('flex items-center justify-center f5 b', {
          mb3: !!children,
        })}
      >
        <FontAwesomeIcon icon={faCheck} />
        <span className="lh-title ml3">{title}</span>
      </div>
      <div className="flex items-center justify-center">{children}</div>
    </div>
  );
}
