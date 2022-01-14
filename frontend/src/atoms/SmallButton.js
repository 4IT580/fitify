import React from 'react';
import classNames from 'classnames';

export function SmallButton({
  children,
  className,
  as: Component = 'button',
  disabled,
  ...rest
}) {
  return (
    <Component
      className={classNames(
        'bg-animate br2 pointer bn bg-green f2 f5-ns',
        className,
      )}
      type="button"
      disabled={disabled}
      {...rest}
    >
      {children}
    </Component>
  );
}
