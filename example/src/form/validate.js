import Validator from 'validatorjs';

export default (name, value, rules) => {
  if (!rules[name]) return null;

  const runner = new Validator({ [name]: value }, { [name]: rules[name] });

  if (runner.fails()) return runner.errors.errors[name];

  return null;
};
