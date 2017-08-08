//Test things dealing with the initialValues prop
import React from 'react';
import Form from '../form';
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
