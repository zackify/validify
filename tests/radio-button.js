//Test that components work with fields that pass target.checked and target.value
import React from 'react';
import Form from '../src/form';
import { mount } from 'enzyme';

const Input = ({ error, ...props }) => (
  <div>
    {error ? <p className="error">{error}</p> : null}
    <input {...props} />
  </div>
);

test('Input works with radio buttons', () => {
  const wrapper = mount(
    <Form>
      <Input name="lightbulb" type="radio" value="on" checked />
      <Input name="lightbulb" type="radio" value="off" />
    </Form>
  );
  wrapper.find('[type="radio"]').last().simulate('change', {
    target: { name: 'lightbulb', value: 'off', type: 'radio' },
  });

  const radios = wrapper.find('[type="radio"]');

  // because we aren't intelligently managing this radio group the value gets overwritten
  expect(radios.first().props().value).toEqual('off');
  expect(radios.first().props().checked).toEqual(true);
  expect(radios.last().props().value).toEqual('off');
  expect(radios.last().props().checked).toEqual(undefined);
});
