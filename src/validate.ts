import get from "lodash/get";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { Error, RulesRef } from "./form";

type Props = {
  values: any;
  rules: MutableRefObject<RulesRef>;
  setErrors: Dispatch<SetStateAction<Error[]>>;
  valuesBlurred?: { [key: string]: boolean };
};

export default ({ values, rules, setErrors, valuesBlurred }: Props) => {
  let newErrors = Object.keys(rules.current)
    .filter((field) => {
      if (valuesBlurred) return valuesBlurred[field];
      return true;
    })
    .map((field) =>
      rules.current[field].map((rule) => {
        let error = rule(get(values, field) ?? "", values);

        if (!error) return false;

        return {
          name: field,
          message: error,
        };
      })
    )
    .reduce((acc, row) => [...acc, ...row], [])
    .filter(Boolean) as Error[];

  setErrors(newErrors);
  return newErrors;
};
