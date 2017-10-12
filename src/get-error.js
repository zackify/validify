// errors are returned a little weird from the validator so we split it out
export default (errors = {}, name) =>
  errors[name] && typeof errors[name] !== 'string'
    ? errors[name][0]
    : errors[name] || '';
