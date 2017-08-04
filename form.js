import React from 'react';
import Validator from 'validatorjs';

export default class Form extends React.Component {
  constructor() {
    super();
    this.state = { values: { email: 'terere' }, errors: {} };
    this.onChange = this.onChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  validate(onClick) {
    let { values } = this.state;

    const runner = new Validator(values, this.props.rules);

    if (runner.fails()) {
      return this.setState({ errors: runner.errors.errors });
    } else this.setState({ errors: {} });

    return onClick(values);
  }

  onChange({ target }) {
    let { values } = this.state;
    values[target.name] = target.value;
    this.setState({ values });
  }

  renderChildren() {
    return React.Children.map(this.props.children, child => {
      if (!child || !child.props) return child;
      let { values, errors } = this.state;

      if (child.props.name)
        return React.cloneElement(child, {
          onChange: this.onChange,
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
    });
  }

  render() {
    let { children, rules, ...props } = this.props;
    return <div {...props}>{this.renderChildren()}</div>;
  }
}
