import React from 'react';
import validate from './validate';
import { FormContext } from './form';

const useSubmit = () => {
  const { rules, values, errors, setErrors } = React.useContext(FormContext);

  const handleSubmit = (callback: (values: any) => any) => {
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
