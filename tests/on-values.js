//Test things dealing with onValues prop
import React from 'react';
import Form from '../src/form';
import { shallow, mount } from 'enzyme';

const Input = ({ error, ...props }) =>
  error
    ? <p className="error">
        {error}
      </p>
    : <input {...props} />;

test('Form passes values to onValues', () => {
  const onValues = jest.fn();
  const wrapper = shallow(
    <Form rules={{ test: 'required|min:8' }} onValues={onValues}>
      <Input name="test" />
      <button submit className="button" />
    </Form>
  );

  wrapper
    .find(Input)
    .simulate('change', { target: { name: 'test', value: 'fail' } });

  expect(onValues).toHaveBeenCalledTimes(1);
  expect(onValues.mock.calls[0][0].test).toEqual('fail');
});

test('Form sets values on prop change', () => {
  const onValues = jest.fn();
  const wrapper = shallow(
    <Form
      rules={{ test: 'required|min:8' }}
      values={{ test: 'false' }}
      onValues={onValues}
    >
      <Input name="test" />
      <button submit className="button" />
    </Form>
  );

  expect(wrapper.find(Input).props().value).toEqual('false');
  wrapper.setProps({ values: { test: 'changed!' } });
  expect(wrapper.find(Input).props().value).toEqual('changed!');
});

test('onValues does not mutate state', () => {
  let onClick = jest.fn();

  class Test extends React.Component {
    constructor() {
      super();
      this.state = { values: { test: 'Set' } };
    }

    render() {
      return (
        <Form
          values={this.state.values}
          onValues={values => this.setState({ values })}
        >
          <Input name="test" />
          <div
            submit
            className="submit"
            onClick={() => this.setState({ values: { test: '' } })}
          />
        </Form>
      );
    }
  }
  const wrapper = mount(<Test />);
  wrapper
    .find(Input)
    .simulate('change', { target: { name: 'test', value: 'Setting' } });

  wrapper.find('.submit').simulate('click');
  expect(wrapper.find(Input).props().value).toEqual('');
});
