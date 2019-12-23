import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { TestForm } from './form';

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
