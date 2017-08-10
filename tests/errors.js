//Test things dealing with the initialValues prop
import React from 'react';
import Form from '../src/form';
import { shallow } from 'enzyme';

const Input = ({ error, ...props }) =>
  error ? <p className="error">{error}</p> : <input {...props} />;

test('Form sets errors from prop', () => {
  const wrapper = shallow(
    <Form initialValues={{ test: 'i love testing!!!' }}>
      <Input name="test" />
    </Form>
  );

  wrapper.setProps({ errors: { test: 'failed because blah' } });

  expect(wrapper.find(Input).props().error).toEqual('failed because blah');
});


test('Form sets custom error message from prop', () => {
  const wrapper = shallow(
    <Form rules={{test: 'required|min:8'}} errorMessages={{'min.test': 'I am a custom message!', 'min.required': 'wow, so field, much required.' }}>
      <Input name="test" />
      <button submit className="button"></button>
    </Form>
  );

  wrapper.find(Input).simulate('change', { target: { name: 'test', value: 'fail' }});
  wrapper.find(Input).simulate('blur');
  expect(wrapper.find(Input).props().error).toEqual('I am a custom message!');
});

test('Form sets custom error message on submit', () => {
  const wrapper = shallow(
    <Form initialValues={{test: '' }} rules={{test: 'required'}} errorMessages={{ 'min.test': 'I am a custom message!', 'required.test': 'wow, so field, much required.' }}>
      <Input name="test" />
      <button submit className="button"></button>
    </Form>
  );
  wrapper.find('.button').simulate('click');
  expect(wrapper.find(Input).props().error).toEqual('wow, so field, much required.');
});

test('Form sets custom error message when an errorMessage key is not used', () => {
  const wrapper = shallow(
    <Form initialValues={{test: '' }} rules={{test: 'required'}} errorMessages={{'required.other': 'Heyo', 'min.test': 'I am a custom message!', 'required.test': 'wow, so field, much required.' }}>
      <Input name="test" />
      <button submit className="button"></button>
    </Form>
  );
  wrapper.find('.button').simulate('click');
  expect(wrapper.find(Input).props().error).toEqual('wow, so field, much required.');
});

test('Form sets custom error message when multiple errorMessage keys are used', () => {
  const wrapper = shallow(
    <Form initialValues={{test: '', other: 'roar'}} rules={{test: 'required', other: 'max:3'}} errorMessages={{'max.other': 'Heyo', 'min.test': 'I am a custom message!', 'required.test': 'wow, so field, much required.' }}>
      <Input name="test" />
      <Input name="other" />
      <button submit className="button"></button>
    </Form>
  );
  wrapper.find('.button').simulate('click');
  expect(wrapper.find(Input).first().props().error).toEqual('wow, so field, much required.');
  expect(wrapper.find(Input).last().props().error).toEqual('Heyo');
});
