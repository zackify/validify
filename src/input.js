//Handles injecting props into the input fields (any component with a name prop)
import React from 'react';
import getError from './get-error';

const filters = {
  checkbox: value => value || false,
  radio: value => value || false,
  text: value => value,
};

const getValue = (type, values) => {
  let filter = filters[type] || filters.text;

  let value = filter(values.filter(filter)[0]);
  if (value || value === false) return value;

  return '';
};

export default (child, propValues, children, errors, component) => {
  let { name, onKeyUp, onEnter, type } = child.props;

  return React.cloneElement(child, {
    children,
    onChange: e =>
      component.validateOnBlurOrChange(name, () => component.onChange(e)),
    onBlur: () => component.validateOnBlurOrChange(name),
    error: getError(errors, component.props.errors, name),
    value: getValue(type, [component.state.values[name], propValues[name]]),
    onKeyUp: e => {
      if (onKeyUp) onKeyUp(e);
      if (e.keyCode !== 13) return;
      if (onEnter) component.validate(onEnter);
    },
  });
};
