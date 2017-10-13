import React from 'react';
import { mount } from 'enzyme';
import BaseForm from '../src/base';
//Test things dealing with onValues prop

const Input = ({ error, onEnter, ...props }) => (
  <div>
    {error ? <p className="error">{error}</p> : null}
    <input {...props} />
  </div>
);

class Form extends React.Component {
  constructor({ values = {}, errors = {} }) {
    super();
    this.state = { values, errors };
  }

  componentWillReceiveProps({ values }) {
    this.setState({ values });
  }

  render() {
    let { values, errors } = this.state;
    let { children, onValues, ...props } = this.props;
    return (
      <BaseForm
        values={values}
        errors={errors}
        onValues={onValues}
        onErrors={errors => this.setState({ errors })}
      >
        {children}
      </BaseForm>
    );
  }
}

test('Form passes values to onValues', async () => {
  const onValues = jest.fn();
  const wrapper = mount(
    <Form rules={{ test: 'required|min:8' }} onValues={onValues}>
      <Input name="test" />
      <button submit className="button" />
    </Form>
  );

  wrapper
    .find('input')
    .simulate('change', { target: { name: 'test', value: 'fail' } });

  expect(onValues).toHaveBeenCalledTimes(1);
  expect(onValues.mock.calls[0][0].test).toEqual('fail');
});

test('Form sets values on prop change', () => {
  const onValues = jest.fn();
  const wrapper = mount(
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
        <BaseForm
          values={this.state.values}
          onValues={values => this.setState({ values })}
        >
          <Input name="test" />
          <div
            submit
            className="submit"
            onClick={() => this.setState({ values: { test: '' } })}
          />
        </BaseForm>
      );
    }
  }
  const wrapper = mount(<Test />);
  wrapper
    .find('input')
    .simulate('change', { target: { name: 'test', value: 'Setting' } });

  wrapper.find('.submit').simulate('click');
  expect(wrapper.find(Input).props().value).toEqual('');
});
