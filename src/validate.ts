import get from 'lodash/get';
import { Dispatch, SetStateAction } from 'react';
import { Error } from './form';
import { RuleFn } from 'rules';

type Props = {
  values: any;
  rules: { [key: string]: RuleFn[] };
  setErrors: Dispatch<SetStateAction<Error[]>>;
  errors?: Error[];
  valuesBlurred?: { [key: string]: boolean };
};

export default ({
  values,
  rules,
  errors = [],
  setErrors,
  valuesBlurred,
}: Props) => {
  let newErrors = Object.keys(rules)
    .filter(rule => {
      if (errors.filter(error => error.name === rule).length) return true;
      if (valuesBlurred) return valuesBlurred[rule];

      return true;
    })
    .map(field =>
      rules[field].map(rule => {
        let error = rule(get(values, field) || '', values);

        if (!error) return false;

        return {
          name: field,
          message: error,
        };
      }),
    )
    .reduce((acc, row) => [...acc, ...row], [])
    .filter(Boolean) as Error[];

  setErrors(newErrors);
  return newErrors;
};
