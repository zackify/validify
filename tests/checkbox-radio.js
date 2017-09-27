//Test that components work with fields that pass target.checked instead of target.value
import React from 'react';
import Form from '../src/form';
import { shallow } from 'enzyme';

const Input = ({ error, ...props }) =>
  error ? <p className="error">{error}</p> : <input {...props} />;

test('Input works with checkbox', () => {
  const wrapper = shallow(
    <Form>
      <Input name="Awesome" type="checkbox" />
    </Form>
  );

  wrapper
    .find(Input)
    .simulate('change', {
      target: { name: 'Awesome', checked: true, type: 'checkbox' },
    });

  expect(wrapper.find(Input).props().value).toEqual(true);

  wrapper
    .find(Input)
    .simulate('change', {
      target: { name: 'Awesome', checked: false, type: 'checkbox' },
    });

  expect(wrapper.find(Input).props().value).toEqual(false);
});
