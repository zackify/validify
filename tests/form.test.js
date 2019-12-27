import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { TestForm } from './helpers/form';

test('Checks dependent rule', async () => {
  let errorMessage = 'Must be longer value than date 2 field';
  let { queryByPlaceholderText, queryByText, getByText } = render(<TestForm />);

  // put a 2 character string in the date 2 field
  const date2 = queryByPlaceholderText('date2');
  fireEvent.change(date2, { target: { name: 'date1', value: 22 } });

  // confirm the error message doesn't show yet
  const date1 = queryByPlaceholderText('date1');
  expect(queryByText(errorMessage)).toBeNull();

  // make the date1 field a single character, and blur it, which should trigger
  // the error message
  fireEvent.change(date1, { target: { name: 'date1', value: 2 } });
  fireEvent.blur(date1);

  // confirm the error message is displayed
  expect(getByText(errorMessage)).toBeInTheDocument();
});

test('Validation runs after blur', async () => {
  let { queryByPlaceholderText, queryByText } = render(<TestForm />);

  //blur the field
  const name = queryByPlaceholderText('name');
  fireEvent.blur(name);

  //ensure the validation shows up
  expect(queryByText('This field is required')).toBeInTheDocument();
});

test('Validation runs on change after initial blur', async () => {
  let { queryByPlaceholderText, queryByText } = render(<TestForm />);

  const name = queryByPlaceholderText('name');

  // blur out of the field
  fireEvent.blur(name);

  // make sure the validation error shows up
  expect(queryByText('This field is required')).toBeInTheDocument();

  //fill in the field with anything
  fireEvent.change(name, { target: { value: 'filled' } });

  //ensure the validation goes away
  expect(queryByText('This field is required')).toBeNull();
});

test('Validation runs after submit', async () => {
  let { queryByText } = render(<TestForm />);
  const submit = queryByText('Submit Form');

  //ensure the validation isn't showing
  expect(queryByText('This field is required')).toBeNull();

  //press the submit button
  submit.click();

  //see if the validation is now showing for fields
  expect(queryByText('This field is required')).toBeInTheDocument();
  expect(queryByText('Email address is invalid')).toBeInTheDocument();
});

test('Submit calls onSubmit if validation passes', async () => {
  const spy = jest.fn();
  let { queryByPlaceholderText, queryByText } = render(
    <TestForm onSubmit={spy} />,
  );
  const submit = queryByText('Submit Form');

  //press the submit button
  submit.click();

  //ensure onSubmit wasn't called, because validation failed
  expect(spy.mock.calls.length).toEqual(0);

  //fill in required fields, so validation will pass
  fireEvent.change(queryByPlaceholderText('name'), {
    target: { value: 'test' },
  });
  fireEvent.change(queryByPlaceholderText('email'), {
    target: { value: 'test@test.com' },
  });

  //press the submit button with passing validation
  submit.click();

  //ensure onSubmit was called this time
  expect(spy.mock.calls.length).toEqual(1);
});
