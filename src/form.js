import React from 'react';
import Input from './input';
import Submit from './submit';
import Validator from 'validatorjs';
import GetChildren from './get-children';

export default class Form extends React.Component {
  constructor({ values = {}, onValues }) {
    super();
    this.state = { values: onValues ? {} : values, errors: {} };
    this.onChange = this.onChange.bind(this);
    this.validate = this.validate.bind(this);
    this.validateOnBlurOrChange = this.validateOnBlurOrChange.bind(this);
  }

  validate(onClick) {
    let { rules, errorMessages = {}, attributeNames = {} } = this.props;
    let values = { ...this.props.values, ...this.state.values };
    if (!rules) return onClick(values);

    const runner = new Validator(values, rules, errorMessages);
    runner.setAttributeNames(attributeNames);

    if (runner.fails()) {
      return this.setState({ errors: runner.errors.errors });
    } else this.setState({ errors: {} });

    return onClick(values);
  }

  validateOnBlurOrChange(name, onChange) {
    if (onChange) onChange();

    let { rules, errorMessages = {}, attributeNames = {} } = this.props;
    let { errors, values } = this.state;
    if (!rules || !rules[name]) return;

    const runner = new Validator(
      { [name]: values[name] },
      { [name]: rules[name] },
      errorMessages
    );
    runner.setAttributeNames(attributeNames);

    if (runner.fails() && values[name] && !onChange) {
      return this.setState({ errors: { ...errors, ...runner.errors.errors } });
    }
    if (errors[name]) {
      return this.setState({ errors: { ...errors, [name]: null } });
    }
  }

  onChange({ target }) {
    let { onValues } = this.props;
    let values = { ...this.props.values, ...this.state.values };

    values[target.name] = target.checked || target.value;

    if (onValues) return onValues({ ...values });

    this.setState({ values });
  }

  renderChildren(children) {
    return React.Children.map(children, child => {
      if (!child || !child.props) return child;

      let children = GetChildren(child, this);

      let { values = {} } = this.props;
      let { errors } = this.state;

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
      ...props
    } = this.props;
    return <div {...props}>{this.renderChildren(children)}</div>;
  }
}
