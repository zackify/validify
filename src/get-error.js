// errors are returned a little weird from the validator so we split it out
export default (errors, propErrors, name) => {
  if (propErrors) errors = { ...errors, ...propErrors };

  return errors[name] && typeof errors[name] !== 'string'
    ? errors[name][0]
    : errors[name] || '';
};
