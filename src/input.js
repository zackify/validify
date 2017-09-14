//Handles injecting props into the input fields (any component with a name prop)
import React from 'react';
import getError from './get-error';

export default (child, propValues, children, errors, component) => {
  let { name, onKeyUp, onEnter } = child.props;

  return React.cloneElement(child, {
    children,
    onChange: e =>
      component.validateOnBlurOrChange(name, () => component.onChange(e)),
    onBlur: () => component.validateOnBlurOrChange(name),
    error: getError(errors, component.props.errors, name),
    value:
      component.state.values[name] || component.state.values[name] === false
        ? component.state.values[name]
        : propValues[name] || propValues[name] === false
          ? propValues[name]
          : '',
    onKeyUp: e => {
      if (onKeyUp) onKeyUp(e);
      if (e.keyCode !== 13) return;
      if (onEnter) component.validate(onEnter);
    },
  });
};
