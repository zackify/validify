import React from 'react';
import Input from './input';
import Submit from './submit';
import Validator from 'validatorjs';
import GetChildren from './get-children';

export default class FormBase extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.validate = this.validate.bind(this);
    this.validateOnBlurOrChange = this.validateOnBlurOrChange.bind(this);
  }

  validate(onClick) {
    let {
      rules,
      errorMessages = {},
      attributeNames = {},
      onErrors,
      values,
    } = this.props;
    if (!rules) return onClick(values);

    const runner = new Validator(values, rules, errorMessages);
    runner.setAttributeNames(attributeNames);

    if (runner.fails()) {
      return onErrors(runner.errors.errors);
    } else onErrors(undefined);

    return onClick(values);
  }

  validateOnBlurOrChange(name, value, onChange) {
    if (onChange) onChange();
    let {
      rules,
      errorMessages = {},
      attributeNames = {},
      errors = {},
      onErrors,
    } = this.props;

    if (!rules || !rules[name]) return;

    const runner = new Validator(
      { [name]: value },
      { [name]: rules[name] },
      errorMessages
    );
    runner.setAttributeNames(attributeNames);

    if (runner.fails() && value && !onChange) {
      return onErrors({ ...errors, ...runner.errors.errors });
    }
    if (errors[name]) {
      return onErrors({ ...errors, [name]: null });
    }
  }

  onChange({ target }) {
    let { onValues, values } = this.props;

    values[target.name] =
      target.type === 'checkbox' || target.type === 'radio'
        ? target.checked
        : target.value;

    onValues({ ...values });
  }

  renderChildren(children) {
    return React.Children.map(children, child => {
      if (!child || !child.props) return child;

      let children = GetChildren(child, this);

      let { values = {}, errors } = this.props;
      if (child.props.name) return Input(child, values, children, errors, this);
      if (child.props.submit) return Submit(child, children, this);

      return React.cloneElement(child, { children });
    });
  }

  render() {
    let {
      children,
      rules,
      errorMessages,
      attributeNames,
      values,
      onValues,
      errors,
      onErrors,
      ...props
    } = this.props;
    return <div {...props}>{this.renderChildren(children)}</div>;
  }
}
