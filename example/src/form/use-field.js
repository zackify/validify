import React from 'react';
import validate from './validate';
import { FormContext } from './context';

//Checks if another field has a rule depending on this field
const hasDependentRule = (name, rules) => {
  return Object.values(rules)
    .reduce((acc, row) => [...acc, ...row], [])
    .find(rule => rule.needs && rule.needs.includes(name));
};

const useField = name => {
  const {
    errors,
    rules,
    values,
    setErrors,
    hasBlurred,
    updateValue,
    valuesBlurred,
  } = React.useContext(FormContext);

  let value = values[name];
  // Pulling out just this field's errors
  let fieldErrors = errors
    .filter(error => error.name === name)
    .map(error => error.message);

  //Args needed for validation
  let validationProps = {
    values,
    rules,
    valuesBlurred,
    setErrors,
    errors,
  };

  const handleChange = value => {
    /*
      If this field 
      - has errors
      - blurred before
      - has dependant rules
      check validation on change
    */
    if (
      fieldErrors.length ||
      valuesBlurred[name] ||
      hasDependentRule(name, rules)
    )
      validate({
        ...validationProps,
        values: { ...values, [name]: value },
        valuesBlurred: { ...valuesBlurred, [name]: true },
      });

    updateValue(name, value);
  };

  /*
    When blurring for the first time, 
    lets send hasBlurred, and validate the field
  */
  const handleBlur = () => {
    hasBlurred(name);
    validate({
      ...validationProps,
      valuesBlurred: { ...valuesBlurred, [name]: true },
    });
  };

  return {
    handleBlur,
    handleChange,
    value,
    errors: fieldErrors.length ? fieldErrors : null,
  };
};

export default useField;
