import React from 'react';
import Validator from 'validatorjs';

export default class Form extends React.Component {
  constructor({ initialValues }) {
    super();
    this.state = { values: initialValues || {}, initialValues: {}, errors: {} };
    this.onChange = this.onChange.bind(this);
    this.validate = this.validate.bind(this);
    this.validateOnBlurOrChange = this.validateOnBlurOrChange.bind(this);
  }

  validate(onClick) {
    let { rules } = this.props;
    let { values } = this.state;
    if (!rules) return onClick(values);

    const runner = new Validator(values, rules);

    if (runner.fails()) {
      return this.setState({ errors: runner.errors.errors });
    } else this.setState({ errors: {} });

    return onClick(values);
  }

  validateOnBlurOrChange(name, onChange) {
    if (onChange) onChange();

    let { rules } = this.props;
    let { errors, values } = this.state;
    if (!rules || !rules[name]) return;

    const runner = new Validator(
      { [name]: values[name] },
      { [name]: rules[name] }
    );

    if (runner.fails() && values[name] && !onChange) {
      return this.setState({ errors: { ...errors, ...runner.errors.errors } });
    }
    if (errors[name]) {
      return this.setState({ errors: { ...errors, [name]: null } });
    }
  }

  onChange({ target }) {
    let { values } = this.state;
    values[target.name] = target.value;
    this.setState({ values });
  }

  renderChildren(children) {
    return React.Children.map(children, child => {
      if (!child || !child.props) return child;

      let children = child.props.children;
      if (child.props.children && typeof child.props.children !== 'string')
        children = this.renderChildren(child.props.children);

      let { initialValues = {} } = this.props;
      let { values, errors } = this.state;

      if (this.props.errors) errors = { ...errors, ...this.props.errors };

      if (child.props.name)
        return React.cloneElement(child, {
          children,
          onChange: e =>
            this.validateOnBlurOrChange(child.props.name, () =>
              this.onChange(e)
            ),
          onBlur: () => this.validateOnBlurOrChange(child.props.name),
          error: errors[child.props.name] &&
            typeof errors[child.props.name] !== 'string'
            ? errors[child.props.name][0]
            : errors[child.props.name] || '',
          value:
            values[child.props.name] || initialValues[child.props.name] || '',
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
    let { children, rules, initialValues, ...props } = this.props;
    return <div {...props}>{this.renderChildren(children)}</div>;
  }
}
