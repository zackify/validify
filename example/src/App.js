import React from 'react';

import Input from './input';
import { Form } from 'react-validify';

const App = () => {
  let [fields, setFields] = React.useState({});
  // console.log(fields, 'herere');
  return (
    <Form
      fields={fields}
      setFields={setFields}
      rules={{
        email: 'email|required',
        password: 'required|min:8',
      }}
    >
      <Input name="email" />
      <Input name="name" />
    </Form>
  );
};

export default App;
