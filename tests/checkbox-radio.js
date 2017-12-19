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

test('Input works with checkbox that has no value', () => {
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

test('Input works with checkbox that has value', () => {
  const wrapper = mount(
    <Form>
      <Input name="Awesome" type="checkbox" value="impressive" />
      <Input name="Awesome" type="checkbox" value="incredible" />
    </Form>
  );

  wrapper.find('input').first().simulate('change', {
    target: { name: 'Awesome', checked: true, type: 'checkbox', value: 'impressive' },
  });

  expect(wrapper.find(Input).first().props().value).toEqual('impressive');
  // because we arent intelligently managing this group of inputs the values get overwritten
  expect(wrapper.find(Input).last().props().value).toEqual('impressive');

  wrapper.find('input').first().simulate('change', {
    target: { name: 'Awesome', checked: false, type: 'checkbox', value: 'impressive' },
  });

  expect(wrapper.find(Input).first().props().value).toEqual('impressive');
  expect(wrapper.find(Input).last().props().value).toEqual('impressive');
})
