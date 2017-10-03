//Tests related to the submit prop
import React from 'react';
import Form from '../src/form';
import { shallow } from 'enzyme';

const Input = ({ error, ...props }) =>
  error
    ? <p className="error">
        {error}
      </p>
    : <input {...props} />;

test('Submit triggers validation', () => {
  const wrapper = shallow(
    <Form rules={{ test: 'required|min:8' }}>
      <Input name="test" />
      <div submit className="submit" />
    </Form>
  );
  wrapper.find('.submit').simulate('click');
  expect(wrapper.find(Input).props().error).toEqual(
    'The test field is required.'
  );
});

test('Submit clears errors after passing and calls onClick', () => {
  let onClick = jest.fn();

  const wrapper = shallow(
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
    .find(Input)
    .simulate('change', { target: { name: 'test', value: 'set' } });

  wrapper.find('.submit').simulate('click');

  expect(wrapper.find(Input).props().error).toEqual('');

  expect(onClick).toHaveBeenCalledTimes(1);
});

test('Submit skips validation if no rules', () => {
  let onClick = jest.fn();

  const wrapper = shallow(
    <Form>
      <Input name="test" />
      <div submit className="submit" onClick={onClick} />
    </Form>
  );

  wrapper.find('.submit').simulate('click');
  expect(onClick).toHaveBeenCalledTimes(1);
});

test('Submit calls onError prop function', () => {

  let onError = jest.fn();

  const wrapper = shallow(
    <Form rules={{ test: 'required|min:8' }} onError={onError}>
      <Input name="test" />
      <div submit className="submit" />
    </Form>
  );

  wrapper.find('.submit').simulate('click');

  expect(onError).toHaveBeenCalledTimes(1);
  expect( onError.mock.calls[0][0].test ).toEqual( ['The test field is required.'] );

});
