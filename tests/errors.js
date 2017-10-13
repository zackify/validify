import React from 'react';
import { mount } from 'enzyme';
import BaseForm from '../src/base';
//Test things dealing with the values prop

const Input = ({ error, ...props }) => (
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

test('Form sets errors from prop', () => {
  const wrapper = mount(
    <Form
      values={{ test: 'i love testing!!!' }}
      errors={{ test: 'failed because blah' }}
    >
      <Input name="test" />
    </Form>
  );

  expect(wrapper.find(Input).props().error).toEqual('failed because blah');
});

test('Form sets custom error message from prop', () => {
  const wrapper = mount(
    <Form
      rules={{ test: 'required|min:8' }}
      errorMessages={{
        'min.test': 'I am a custom message!',
        'min.required': 'wow, so field, much required.',
      }}
    >
      <Input name="test" />
      <button submit className="button" />
    </Form>
  );

  wrapper
    .find('input')
    .simulate('change', { target: { name: 'test', value: 'fail' } });
  wrapper
    .find('input', { target: { name: 'test', value: 'fail' } })
    .simulate('blur');
  expect(wrapper.find(Input).props().error).toEqual('I am a custom message!');
});

test('Form sets custom error message on submit', () => {
  const wrapper = mount(
    <Form
      values={{ test: '' }}
      rules={{ test: 'required' }}
      errorMessages={{
        'min.test': 'I am a custom message!',
        'required.test': 'wow, so field, much required.',
      }}
    >
      <Input name="test" />
      <button submit className="button" />
    </Form>
  );
  wrapper.find('.button').simulate('click');
  expect(wrapper.find(Input).props().error).toEqual(
    'wow, so field, much required.'
  );
});

test('Form sets custom error message when an errorMessage key is not used', () => {
  const wrapper = mount(
    <Form
      values={{ test: '' }}
      rules={{ test: 'required' }}
      errorMessages={{
        'required.other': 'Heyo',
        'min.test': 'I am a custom message!',
        'required.test': 'wow, so field, much required.',
      }}
    >
      <Input name="test" />
      <button submit className="button" />
    </Form>
  );
  wrapper.find('.button').simulate('click');
  expect(wrapper.find(Input).props().error).toEqual(
    'wow, so field, much required.'
  );
});

test('Form sets custom error message when multiple errorMessage keys are used', () => {
  const wrapper = mount(
    <Form
      values={{ test: '', other: 'roar' }}
      rules={{ test: 'required', other: 'max:3' }}
      errorMessages={{
        'max.other': 'Heyo',
        'min.test': 'I am a custom message!',
        'required.test': 'wow, so field, much required.',
      }}
    >
      <Input name="test" />
      <Input name="other" />
      <button submit className="button" />
    </Form>
  );
  wrapper.find('.button').simulate('click');
  expect(
    wrapper
      .find(Input)
      .first()
      .props().error
  ).toEqual('wow, so field, much required.');
  expect(
    wrapper
      .find(Input)
      .last()
      .props().error
  ).toEqual('Heyo');
});

test('Form allows custom attribute names in default error messages', () => {
  const wrapper = mount(
    <Form
      rules={{ test: 'required|min:8' }}
      attributeNames={{ test: 'custom name' }}
    >
      <Input name="test" />
      <button submit className="button" />
    </Form>
  );

  wrapper
    .find('input')
    .simulate('change', { target: { name: 'test', value: 'fail' } });
  wrapper.find('input').simulate('blur');
  expect(wrapper.find(Input).props().error).toEqual(
    'The custom name must be at least 8 characters.'
  );
});

test('Form allows custom attribute names in custom error messages', () => {
  const wrapper = mount(
    <Form
      rules={{ test: 'required|min:8' }}
      attributeNames={{ test: 'custom name' }}
      errorMessages={{
        'min.test':
          'Custom error message with attribute name set to :attribute',
      }}
    >
      <Input name="test" />
      <button submit className="button" />
    </Form>
  );

  wrapper
    .find('input')
    .simulate('change', { target: { name: 'test', value: 'fail' } });
  wrapper.find('input').simulate('blur');
  expect(wrapper.find(Input).props().error).toEqual(
    'Custom error message with attribute name set to custom name'
  );
});

test('Form allows custom attribute names when submit is used', () => {
  const wrapper = mount(
    <Form
      values={{ test: '' }}
      rules={{ test: 'required' }}
      errorMessages={{
        'required.other': 'Heyo',
        'min.test': 'I am a custom message!',
        'required.test': 'wow, so :attribute, much required.',
      }}
      attributeNames={{ test: 'custom name' }}
    >
      <Input name="test" />
      <button submit className="button" />
    </Form>
  );
  wrapper.find('.button').simulate('click');
  expect(wrapper.find(Input).props().error).toEqual(
    'wow, so custom name, much required.'
  );
});
