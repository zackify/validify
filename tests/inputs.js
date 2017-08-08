//Test that components with the prop `name` get passed errors and values
import React from 'react';
import Form from '../form';
import { shallow } from 'enzyme';

const Input = ({ error, ...props }) =>
  error ? <p className="error">{error}</p> : <input {...props} />;

test('Input is passed in value correctly', () => {
  const wrapper = shallow(
    <Form>
      <Input name="Awesome" />
    </Form>
  );

  wrapper
    .find(Input)
    .simulate('change', { target: { name: 'Awesome', value: 'yes' } });

  expect(wrapper.find(Input).props().value).toEqual('yes');
});

test('Input gets error message', () => {
  const wrapper = shallow(
    <Form rules={{ Awesome: 'required|min:8' }}>
      <Input name="Awesome" />
    </Form>
  );

  wrapper
    .find(Input)
    .simulate('change', { target: { name: 'Awesome', value: 'fail' } });
  wrapper.find(Input).simulate('blur');

  expect(wrapper.find(Input).props().error).toEqual(
    'The Awesome must be at least 8 characters.'
  );
});

test('Input passes validation first time', () => {
  const wrapper = shallow(
    <Form rules={{ Awesome: 'required|min:4' }}>
      <Input name="Awesome" />
    </Form>
  );

  wrapper
    .find(Input)
    .simulate('change', { target: { name: 'Awesome', value: 'fail' } });
  wrapper.find(Input).simulate('blur');

  expect(wrapper.find(Input).props().error).toEqual('');
  expect(wrapper.find(Input).props().value).toEqual('fail');
});

test('Blur does nothing if no rule is set', () => {
  const wrapper = shallow(
    <Form>
      <Input name="Awesome" />
    </Form>
  );

  wrapper
    .find(Input)
    .simulate('change', { target: { name: 'Awesome', value: 'fail' } });
  wrapper.find(Input).simulate('blur');

  expect(wrapper.find(Input).props().error).toEqual('');
  expect(wrapper.find(Input).props().value).toEqual('fail');
});

test('Error message is cleared after success on second blur', () => {
  const wrapper = shallow(
    <Form rules={{ Awesome: 'required|min:8' }}>
      <Input name="Awesome" />
    </Form>
  );

  wrapper
    .find(Input)
    .simulate('change', { target: { name: 'Awesome', value: 'fail' } });
  wrapper.find(Input).simulate('blur');

  wrapper
    .find(Input)
    .simulate('change', { target: { name: 'Awesome', value: 'failfail' } });
  wrapper.find(Input).simulate('blur');

  expect(wrapper.find(Input).props().error).toEqual('');
});
