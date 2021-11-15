import React from 'react';
import classNames from "classnames";

export function CardBody ({children, className}) {
  return (
    <div className={classNames('ph3 pv1 bt br--top br4 tl', className)}>
      {children}
    </div>
  )
}
