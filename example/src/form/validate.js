export default ({ values, rules, errors = [], setErrors, valuesBlurred }) => {
  let newErrors = Object.keys(rules)
    .filter(rule => {
      if (errors.filter(error => error.name === rule).length) return true;
      if (valuesBlurred) return valuesBlurred[rule];

      return true;
    })
    .map(field =>
      rules[field].map(rule => {
        let error = rule(values[field], values);

        if (!error) return false;

        return {
          name: field,
          message: error,
        };
      }),
    )
    .flatMap(x => x)
    .filter(Boolean);

  setErrors(newErrors);
};
