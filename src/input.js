import React from 'react';
import getError from './get-error';
//Handles injecting props into the input fields (any component with a name prop)

const filters = {
  checkbox: value => value || false,
  radio: value => value || false,
  text: value => value,
};

const getValue = (type, rawValue) => {
  let filter = filters[type] || filters.text;

  let value = filter(rawValue);
  if (value || value === false) return value;

  return '';
};

export default (child, values, children, errors, component) => {
  let { name, onKeyUp, onEnter, type } = child.props;
  return React.cloneElement(child, {
    children,
    onChange: e =>
      component.validateOnBlurOrChange(name, e.target.value, () =>
        component.onChange(e)
      ),
    onBlur: e => component.validateOnBlurOrChange(name, e.target.value),
    error: getError(errors, name),
    value: getValue(type, values[name]),
    onKeyUp: e => {
      if (onKeyUp) onKeyUp(e);
      if (e.keyCode !== 13) return;
      if (onEnter) component.validate(onEnter);
    },
  });
};
