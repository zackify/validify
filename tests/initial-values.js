//Test things dealing with the initialValues prop
import React from 'react';
import Form from '../src/form';
import { shallow } from 'enzyme';

const Input = ({ error, ...props }) =>
  error ? <p className="error">{error}</p> : <input {...props} />;

test('Form passes in initial values', () => {
  const wrapper = shallow(
    <Form initialValues={{ test: 'i love testing!!!' }}>
      <Input name="test" />
    </Form>
  );

  expect(wrapper.find(Input).props().value).toEqual('i love testing!!!');
});

test('Form keeps value if it is set', () => {
  const wrapper = shallow(
    <Form initialValues={{ test: 'i love testing!!!' }}>
      <Input name="test" />
    </Form>
  );

  wrapper.setProps({ initialValues: { test: 'changed!' } });

  expect(wrapper.find(Input).props().value).toEqual('i love testing!!!');
});

test('Form replaces values when initial values changes and not currently set', () => {
  const wrapper = shallow(
    <Form>
      <Input name="test" />
    </Form>
  );

  wrapper.setProps({ initialValues: { test: 'changed!' } });

  expect(wrapper.find(Input).props().value).toEqual('changed!');
});
