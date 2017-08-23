//Handles injecting props into the submit button

import React from 'react';
import getError from './get-error';

export default (child, children, component) => {
  let { submit, ...otherProps } = child.props;

  return React.createElement(child.type, {
    ...otherProps,
    children,
    onClick: () => component.validate(child.props.onClick),
  });
};
