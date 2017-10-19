import Validator from 'validatorjs';

export default (values, rules, errorMessages, attributeNames) => {
  const runner = new Validator(values, rules, errorMessages);
  runner.setAttributeNames(attributeNames);

  if (runner.fails()) return { formErrors: runner.errors.errors };

  return {};
};
