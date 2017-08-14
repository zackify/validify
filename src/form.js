import React from 'react';
import getError from './get-error';
import Validator from 'validatorjs';

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
    let { values } = this.state;
    if (!rules) return onClick(values);

    const runner = new Validator(values, rules, errorMessages);
    runner.setAttributeNames(attributeNames);

    if (runner.fails()) {
      return this.setState({ errors: runner.errors.errors });
    } else this.setState({ errors: {} });

    if (onClick) return onClick(values);
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
    let { values } = this.state;
    let { onValues } = this.props;
    values[target.name] = target.value;

    if (onValues) return onValues({ ...values });

    this.setState({ values });
  }

  renderChildren(children) {
    return React.Children.map(children, child => {
      if (!child || !child.props) return child;

      let children = child.props.children;
      if (child.props.children && typeof child.props.children !== 'string')
        children = this.renderChildren(child.props.children);

      let { values = {} } = this.props;
      let { errors } = this.state;

      let { name, submit } = child.props;
      if (name)
        return React.cloneElement(child, {
          children,
          onChange: e =>
            this.validateOnBlurOrChange(name, () => this.onChange(e)),
          onBlur: () => this.validateOnBlurOrChange(name),
          error: getError(errors, this.props.errors, name),
          value: this.state.values[name] || values[name] || '',
        });

      if (child.props.submit) {
        let { submit, ...otherProps } = child.props;

        return React.createElement(child.type, {
          ...otherProps,
          children,
          onClick: () => this.validate(child.props.onClick),
        });
      }
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
      ...props
    } = this.props;
    return <div {...props}>{this.renderChildren(children)}</div>;
  }
}
