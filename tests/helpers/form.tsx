import React, { useEffect } from "react";
import { Form } from "../../src/form";
import { useState } from "react";
import { required, email, RuleFn } from "../../src/rules";
import Input from "./input";
import Submit from "./submit";

const greaterThanDate2 = (value, values) => {
  if (!values.date2) return false;

  if (value.length < values.date2.length)
    return "Must be longer value than date 2 field";
};

type Props = {
  noRules?: boolean;
  nameRule?: RuleFn;
  onSubmit?: (values: any) => any;
  unmountEmail?: boolean;
};

type TestValues = {
  email: string;
  date1?: string;
  name?: string;
};

export const TestForm = ({
  onSubmit,
  noRules,
  nameRule,
  unmountEmail,
}: Props) => {
  let [values, setValues] = useState<TestValues>({ email: "test" });

  return (
    <Form values={values} onValues={setValues}>
      {unmountEmail ? null : (
        <Input name="email" rules={noRules ? undefined : [required, email]} />
      )}
      <Input name="name" rules={noRules ? undefined : [nameRule || required]} />
      <Input name="date1" rules={noRules ? undefined : [greaterThanDate2]} />
      <Input name="date2" />
      <Submit onSubmit={onSubmit} />
    </Form>
  );
};

export const TestFormWithRemovedField = (props: Props) => {
  let [unmountEmail, setUnmount] = useState(false);

  useEffect(() => {
    setTimeout(() => setUnmount(true), 0);
  }, []);

  return <TestForm {...props} unmountEmail={unmountEmail} />;
};

export const TestFormWithSingleRule = ({
  onSubmit,
  noRules,
  nameRule,
  unmountEmail,
}: Props) => {
  let [values, setValues] = useState<TestValues>({ email: "test" });

  return (
    <Form values={values} onValues={setValues}>
      <Input name="email" rules={email} />

      <Submit onSubmit={onSubmit} />
    </Form>
  );
};
