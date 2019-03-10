import React from 'react';
import validate from './validate';
import { FormContext } from './context';

const useSubmit = () => {
  const { rules, values, errors, setErrors, valuesBlurred } = React.useContext(
    FormContext,
  );

  const validateAll = () => {
    validate({
      values,
      rules,
      setErrors,
    });
  };

  return {
    values,
    validateAll,
    canSubmit: !errors.length && Object.keys(valuesBlurred).length,
  };
};

export default useSubmit;
