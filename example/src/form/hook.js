import React from 'react';
import validate from './validate';
import { FormContext } from './context';

const useField = name => {
  const { rules, fields, setFields } = React.useContext(FormContext);
  let field = fields[name];

  const handleChange = (value, errors) => {
    // if errors were already set before, lets check again
    if (field && field.errors) errors = validate(name, field.value, rules);

    setFields(fields => ({
      ...fields,
      [name]: { value, errors },
    }));
  };

  if (!field) return { handleChange, value: '' };

  const handleBlur = () => {
    const errors = validate(name, field.value, rules);
    handleChange(field.value, errors);
  };

  return {
    handleBlur,
    handleChange,
    value: field.value,
    errors: field.errors,
  };
};

export default useField;
