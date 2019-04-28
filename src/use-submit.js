import React from 'react';
import validate from './validate';
import { FormContext } from './context';

const useSubmit = () => {
  const { rules, values, errors, setErrors } = React.useContext(FormContext);

  const validateAll = () => {
    validate({
      values,
      rules,
      setErrors,
    });
  };

  const handleSubmit = callback => {
    let errors = validate({
      values,
      rules,
      setErrors,
    });
    if (!errors.length) callback(values);
  };

  return {
    values,
    handleSubmit,
    canSubmit: !errors.length,
  };
};

export default useSubmit;
