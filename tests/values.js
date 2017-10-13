import React from 'react';
import { mount } from 'enzyme';
import BaseForm from '../src/base';
//Test things dealing with the values prop

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

  render() {
    let { values, errors } = this.state;
    let { children, ...props } = this.props;
    return (
      <BaseForm
        {...props}
        values={values}
        errors={errors}
        onValues={values => this.setState({ values })}
        onErrors={errors => this.setState({ errors })}
      >
        {children}
      </BaseForm>
    );
  }
}

test('Form sets value to empty string', () => {
  const wrapper = mount(
    <Form>
      <Input name="test" />
    </Form>
  );

  expect(wrapper.find(Input).props().value).toEqual('');
});

test('Form passes in initial values', () => {
  const wrapper = mount(
    <Form values={{ test: 'i love testing!!!' }}>
      <Input name="test" />
    </Form>
  );

  expect(wrapper.find(Input).props().value).toEqual('i love testing!!!');
});
