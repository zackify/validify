import React from 'react';
import get from 'lodash/get';
import set from 'lodash/set';
import validate from './validate';
import { FormContext } from './form';

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

  let value = get(values, name);
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

  const handleChange = (value, field) => {
    /*
      If this field 
      - has errors
      - blurred before
      - has dependant rules
      check validation on change
    */
    if (
      fieldErrors.length ||
      valuesBlurred[field || name] ||
      hasDependentRule(field || name, rules)
    ) {
      let newValues = { ...values };
      set(newValues, field || name, value);

      validate({
        ...validationProps,
        values: newValues,
        valuesBlurred: { ...valuesBlurred, [field || name]: true },
      });
    }

    updateValue(field || name, value);
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
    values,
    errors: fieldErrors.length ? fieldErrors : null,
  };
};

export default useField;
