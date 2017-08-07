import React from 'react';
import Validator from 'validatorjs';

export default class Form extends React.Component {
  constructor({ initialValues }) {
    super();
    this.state = { values: initialValues || {}, errors: {} };
    this.onChange = this.onChange.bind(this);
    this.validate = this.validate.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentWillReceiveProps({ errors, initialValues }) {
    if (initialValues !== this.props.initialValues)
      this.setState({ initialValues });

    if (errors !== this.props.errors) this.setState({ errors });
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

  onBlur(name) {
    let { rules } = this.props;
    let { errors, values } = this.state;
    if (!rules || !rules[name]) return;

    const runner = new Validator(
      { [name]: values[name] },
      { [name]: rules[name] }
    );

    if (runner.fails() && values[name]) {
      return this.setState({ errors: { ...errors, ...runner.errors.errors } });
    }
    if (errors[name])
      return this.setState({ errors: { ...errors, [name]: null } });
  }

  onChange({ target }) {
    let { values } = this.state;
    values[target.name] = target.value;
    this.setState({ values });
  }

  renderChildren(children) {
    return React.Children.map(children, child => {
      if (!child || !child.props) return child;
      if (child.children) return this.renderChildren(children);

      let { values, errors } = this.state;

      if (child.props.name)
        return React.cloneElement(child, {
          onChange: this.onChange,
          onBlur: () => this.onBlur(child.props.name),
          error: errors[child.props.name] &&
            typeof errors[child.props.name] !== 'string'
            ? errors[child.props.name][0]
            : errors[child.props.name] || '',
          value: values[child.props.name] || '',
        });

      if (child.props.submit) {
        let { submit, ...otherProps } = child.props;

        return React.createElement(child.type, {
          ...otherProps,
          onClick: () => this.validate(child.props.onClick),
        });
      }
      return child;
    });
  }

  render() {
    let { children, rules, initialValues, ...props } = this.props;
    return <div {...props}>{this.renderChildren(children)}</div>;
  }
}
