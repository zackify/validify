import React from 'react';
import Input from './input';
import Submit from './submit';
import validate from './validate';
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

    const { formErrors } = validate(
      values,
      rules,
      errorMessages,
      attributeNames
    );

    if (formErrors) return onErrors(formErrors);
    else onErrors(undefined);

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

    const { formErrors } = validate(
      { [name]: value },
      { [name]: rules[name] },
      errorMessages,
      attributeNames
    );

    if (formErrors && value && !onChange) {
      return onErrors({ ...errors, ...formErrors });
    }

    if (errors[name]) {
      return onErrors({ ...errors, [name]: null });
    }
  }

  onChange({ target }) {
    let { onValues, onValue, values } = this.props;

    let value =
      !target.value && (target.type === 'checkbox' || target.type === 'radio')
        ? target.checked
        : target.value;

    values[target.name] = value;

    if (onValues) onValues({ ...values });
    if (onValue) onValue(target.name, value);
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
      onValue,
    } = this.props;
    return <React.Fragment>{this.renderChildren(children)}</React.Fragment>;
  }
}
