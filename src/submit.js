import React from 'react';
import getError from './get-error';
//Handles injecting props into the submit button


export default (child, children, component) => {
  let { submit, onClick, ...otherProps } = child.props;

  return React.createElement(child.type, {
    ...otherProps,
    children,
    onClick: () => component.validate(onClick),
  });
};
