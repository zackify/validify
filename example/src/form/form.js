import React, { useState } from 'react';
import { FormContextProvider } from './context';

const Form = ({ children, rules, values, onValues }) => {
  let [errors, setErrors] = useState([]);
  let [valuesBlurred, setValuesBlurred] = useState({});

  return (
    <FormContextProvider
      values={values}
      rules={rules}
      valuesBlurred={valuesBlurred}
      setErrors={setErrors}
      errors={errors}
      updateValue={(name, value) => {
        onValues({
          ...values,
          [name]: value,
        });
      }}
      hasBlurred={name => {
        if (valuesBlurred[name]) return;
        //Store list of values that have been touched, so we can run validation on them now
        setValuesBlurred({
          ...valuesBlurred,
          [name]: true,
        });
      }}
    >
      {children}
    </FormContextProvider>
  );
};

export default Form;
