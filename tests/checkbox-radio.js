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

test('Input works with checkbox', () => {
  const wrapper = mount(
    <Form>
      <Input name="Awesome" type="checkbox" />
    </Form>
  );

  wrapper.find('input').simulate('change', {
    target: { name: 'Awesome', checked: true, type: 'checkbox' },
  });

  expect(wrapper.find(Input).props().value).toEqual(true);

  wrapper.find('input').simulate('change', {
    target: { name: 'Awesome', checked: false, type: 'checkbox' },
  });

  expect(wrapper.find(Input).props().value).toEqual(false);
});
