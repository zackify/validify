//Helps recursively render the children
import React from 'react';

export default (child, component) => {
  let children = child.props.children;
  if (child.props.children && typeof child.props.children !== 'string')
    children = component.renderChildren(child.props.children);

  return children;
};
