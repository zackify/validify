import React from 'react';
import { mount } from 'enzyme';
import BaseForm from '../src/base';
//Tests related to the submit prop

const Input = ({ error, onEnter, ...props }) => (
  <div>
    {error ? <p className="error">{error}</p> : null}
    <input {...props} />
  </div>
);

class Form extends React.Component {
  constructor({ values = {}, errors = {} }) {
    super();
    this.state = { values, errors };
  }

  componentWillReceiveProps({ values }) {
    this.setState({ values });
  }

  render() {
    let { values, errors } = this.state;
    let { children, ...props } = this.props;
    return (
      <BaseForm
        {...props}
        values={values}
        errors={errors}
        onValues={values => this.setState({ values })}
        onErrors={errors => this.setState({ errors })}
      >
        {children}
      </BaseForm>
    );
  }
}

test('Submit triggers validation', () => {
  let onClick = jest.fn();
  const wrapper = mount(
    <Form rules={{ test: 'required|min:8' }}>
      <Input name="test" />
      <div submit className="submit" onClick={onClick} />
    </Form>
  );
  wrapper.find('.submit').simulate('click');
  expect(wrapper.find(Input).props().error).toEqual(
    'The test field is required.'
  );
});

test('Submit clears errors after passing and calls onClick', () => {
  let onClick = jest.fn();

  const wrapper = mount(
    <Form rules={{ test: 'required' }}>
      <Input name="test" />
      <div submit className="submit" onClick={onClick} />
    </Form>
  );

  wrapper.find('.submit').simulate('click');

  expect(wrapper.find(Input).props().error).toEqual(
    'The test field is required.'
  );

  wrapper
    .find('input')
    .simulate('change', { target: { name: 'test', value: 'set' } });

  wrapper.find('.submit').simulate('click');

  expect(wrapper.find(Input).props().error).toEqual('');

  expect(onClick).toHaveBeenCalledTimes(1);
});

test('Submit skips validation if no rules', () => {
  let onClick = jest.fn();

  const wrapper = mount(
    <Form>
      <Input name="test" />
      <div submit className="submit" onClick={onClick} />
    </Form>
  );

  wrapper.find('.submit').simulate('click');
  expect(onClick).toHaveBeenCalledTimes(1);
});
