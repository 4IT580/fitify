import React from 'react';
import classNames from 'classnames';

const HEADING_SIZES = {
  xxl: ['h1', 'f1-ns f1'],
  xl: ['h1', 'f2-ns f1'],
  lg: ['h2', 'f3-ns f2'],
  md: ['h3', 'f4-ns f3'],
  sm: ['h4', 'f5-ns f4'],
  xs: ['h5', 'f6-ns f5'],
};

export function Heading({ children, className, size = 'lg', ...rest }) {
  const [Component, headingClasses] =
    HEADING_SIZES[size] || HEADING_SIZES['lg'];

  return (
    <Component
      className={classNames(headingClasses, 'ma0 tracked-tight', className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
