import React from 'react';

import Input from './input';
import Submit from './submit';
import Form from './form/form';
import { required, email } from './form/rules';

const greaterThanDate2 = (value, values) => {
  if (!values.date2) return false;

  if (value.length < values.date2.length)
    return 'Must be longer date than date 2';
};

const App = () => {
  let [values, setValues] = React.useState({ email: 'test' });
  //console.log(values, 'herere');
  return (
    <Form
      values={values}
      onValues={setValues}
      rules={{
        email: [required, email],
        date1: [greaterThanDate2],
        name: [required],
      }}
    >
      <Input name="email" />
      <Input name="name" />
      <Input name="date1" />
      <Input name="date2" />
      <Submit />
    </Form>
  );
};

export default App;
