import React, { useState, Dispatch, SetStateAction, ReactNode } from 'react';
import { RuleFn } from 'rules';
import set from 'lodash/set';

export type Values = { [key: string]: string };

export type ValuesBlurred = { [key: string]: boolean };

export type Rules = {
  [key: string]: RuleFn;
};

export type Error = {
  name: string;
  message: string;
};

type Context = {
  rules: Rules;
  values: Values;
  errors: Error[];
  valuesBlurred: ValuesBlurred;
  hasBlurred: (name: string) => any;
  setErrors: Dispatch<SetStateAction<Error[]>>;
  updateValue: (name: string, value: string) => any;
};

const FormContext = React.createContext<Context>({} as Context);

export type FormProps = {
  rules: Rules;
  values: Values;
  children: ReactNode;
  onValues: (values: Values) => any;
};

const Form = ({ children, onValues, values, rules }: FormProps) => {
  let [errors, setErrors] = useState<Error[]>([]);
  let [valuesBlurred, setValuesBlurred] = useState<ValuesBlurred>({});

  return (
    <FormContext.Provider
      value={{
        rules,
        values,
        errors,
        setErrors,
        valuesBlurred,
        hasBlurred: name => {
          if (valuesBlurred[name]) return;
          //Store list of values that have been touched, so we can run validation on them now
          setValuesBlurred({
            ...valuesBlurred,
            [name]: true,
          });
        },
        updateValue: (name, value) => {
          let newValues = { ...values };
          set(newValues, name, value);
          onValues(newValues);
        },
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

const FormContextConsumer = FormContext.Consumer;

export { FormContext, Form, FormContextConsumer };
