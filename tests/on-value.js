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
    let { children, onValue, ...props } = this.props;
    return (
      <BaseForm
        values={values}
        errors={errors}
        onValue={onValue}
        onErrors={errors => this.setState({ errors })}
      >
        {children}
      </BaseForm>
    );
  }
}

test('Form passes values to onValues', async () => {
  const onValue = jest.fn();
  const wrapper = mount(
    <Form rules={{ test: 'required|min:8' }} onValue={onValue}>
      <Input name="test" />
      <button submit className="button" />
    </Form>
  );

  wrapper
    .find('input')
    .simulate('change', { target: { name: 'test', value: 'fail' } });

  expect(onValue).toHaveBeenCalledTimes(1);
  expect(onValue.mock.calls[0][0]).toEqual('test');
  expect(onValue.mock.calls[0][1]).toEqual('fail');
});
