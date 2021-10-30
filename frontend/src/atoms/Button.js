import React from 'react';
import classNames from 'classnames';

<<<<<<< HEAD
<<<<<<< HEAD
const PRIMARY_COLOR_CLASSES = 'bg-green dark dim';
const SECONDARY_COLOR_CLASSES = 'bg-dark green dim';
=======
const DEFAULT_COLOR_CLASSES = 'white bg-gray hover-bg-mid-gray';
>>>>>>> accfeb964ef39717cac706bdb185dcd3e783db30

const COLORS = {
  green: PRIMARY_COLOR_CLASSES,
  dark: SECONDARY_COLOR_CLASSES,
  navbar: 'f6 black bg-transparent hover-bg-white hover-black mh3 b--red-20',
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
      disabled={disabled}
      {...rest}
    >
      {children}
    </Component>
  );
}
