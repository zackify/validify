//Test that children are rendered and that submit works recursively
import React from 'react';
import Form from '../src/form';
import { mount } from 'enzyme';

const Input = ({ error, onEnter, ...props }) => (
  <div>
    {error ? <p className="error">{error}</p> : null}
    <input {...props} />
  </div>
);

test('onEnter prop gets called when keyCode is 13', () => {
  const onEnter = jest.fn();
  const wrapper = mount(
    <Form values={{ test: 'yes!' }}>
      <Input name="test" onEnter={onEnter} />
    </Form>
  );

  wrapper.find('input').simulate('keyup', { keyCode: 13 });

  expect(onEnter).toHaveBeenCalledTimes(1);
  expect(onEnter.mock.calls[0][0].test).toEqual('yes!');
});

test('onEnter prop not called when keyCode is 13 and rules are invalid', () => {
  const onEnter = jest.fn();
  const wrapper = mount(
    <Form values={{ test: 'yes!' }} rules={{ test: 'min:9' }}>
      <Input name="test" onEnter={onEnter} />
    </Form>
  );

  wrapper.find('input').simulate('keyup', { keyCode: 13 });

  expect(onEnter).toHaveBeenCalledTimes(0);
});

test('onKeyUp is always called', () => {
  const onEnter = jest.fn();
  const onKeyUp = jest.fn();

  const wrapper = mount(
    <Form values={{ test: 'yes!' }} rules={{ test: 'min:9' }}>
      <Input name="test" onEnter={onEnter} onKeyUp={onKeyUp} />
    </Form>
  );

  wrapper.find('input').simulate('keyup', { keyCode: 13 });

  expect(onEnter).toHaveBeenCalledTimes(0);
  expect(onKeyUp).toHaveBeenCalledTimes(1);
});
