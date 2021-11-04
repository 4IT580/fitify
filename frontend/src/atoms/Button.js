import React from 'react';
import classNames from 'classnames';

const PRIMARY_COLOR_CLASSES = 'bg-green dark dim f2 f5-ns';
const SECONDARY_COLOR_CLASSES = 'bg-dark green dim f2 f5-ns';

const COLORS = {
  green: PRIMARY_COLOR_CLASSES,
  dark: SECONDARY_COLOR_CLASSES,
  navbar: 'f4 black bg-transparent hover-bg-white hover-black mh3 b--red-20',
  red: 'white bg-red hover-bg-dark-red',
};

export function Button({
  children,
  color,
  className,
  as: Component = 'button',
  border = false,
  narrow = false,
  disabled,
  ...rest
}) {
  const colorClasses = COLORS[color] || PRIMARY_COLOR_CLASSES;

  return (
    <Component
      className={classNames(
        'dib bg-animate pv2 br-pill',
        narrow ? 'ph3' : 'ph4',
        border ? 'ba' : 'bn',
        { 'o-50': disabled },
        colorClasses,
        className,
      )}
      type="button"
      style={{cursor:'pointer'}}
      disabled={disabled}
      {...rest}
    >
      {children}
    </Component>
  );
}
