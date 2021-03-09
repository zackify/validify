import React from "react";

import Input from "./input";
import Submit from "./submit";
import { required, email, RuleFn } from "react-validify/lib/rules";
import { Form } from "react-validify";

const greaterThanDate2: RuleFn = (value, values) => {
  if (!values.date2) return false;

  if (value.length < values.date2.length)
    return "Must be longer date than date 2";
};

type TestValues = {
  email: string;
  date1?: string;
  name?: string;
};

const App = () => {
  let [values, setValues] = React.useState<TestValues>({ email: "test" });

  return (
    <Form values={values} onValues={setValues}>
      <Input name="email" rules={[required, email]} />
      <Input name="name" rules={[required]} />
      <Input name="date1" rules={[greaterThanDate2]} />
      <Input name="date2" />
      <Submit />
    </Form>
  );
};

export default App;
