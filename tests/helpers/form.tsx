import React from 'react';
import { Form } from '../../src/form';
import { useState } from 'react';
import { required, email } from '../../src/rules';
import Input from './input';
import Submit from './submit';

const greaterThanDate2 = (value, values) => {
  if (!values.date2) return false;

  if (value.length < values.date2.length)
    return 'Must be longer value than date 2 field';
};

type Props = {
  noRules?: boolean;
  onSubmit?: (values: any) => any;
};

type TestValues = {
  email: string;
  date1?: string;
  name?: string;
};

export const TestForm = ({ onSubmit, noRules }: Props) => {
  let [values, setValues] = useState<TestValues>({ email: 'test' });

  return (
    <Form
      values={values}
      onValues={setValues}
      rules={
        noRules
          ? undefined
          : {
              email: [required, email],
              date1: [greaterThanDate2],
              name: [required],
            }
      }
    >
      <Input name="email" />
      <Input name="name" />
      <Input name="date1" />
      <Input name="date2" />
      <Submit onSubmit={onSubmit} />
    </Form>
  );
};
