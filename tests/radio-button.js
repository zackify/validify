//Test that components work with fields that pass target.checked instead of target.value
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
      <Input name="season" type="radio" value="spring" checked />
      <Input name="season" type="radio" value="summer" />
      <Input name="season" type="radio" value="fall" />
      <Input name="season" type="radio" value="winter" />
    </Form>
  );
  wrapper.find('[type="radio"]').last().simulate('change', {
    target: { name: 'season', value: 'winter', type: 'radio' },
  });

  const radios = wrapper.find('[type="radio"]');

  // each radio button is being changed
  radios.forEach(radio => console.log(radio.html()))

  expect(radios.first().props().value).toEqual('spring');
  expect(radios.first().props().checked).toEqual(false);
  expect(radios.last().props().value).toEqual('winter');
  expect(radios.last().props().checked).toEqual(true);
});
