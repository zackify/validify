## React Validify

[![CircleCI](https://circleci.com/gh/navjobs/validify.svg?style=svg)](https://circleci.com/gh/navjobs/validify)
[![Coverage Status](https://coveralls.io/repos/github/navjobs/validify/badge.svg?branch=master)](https://coveralls.io/github/navjobs/validify?branch=master)

## Install

```
npm install react-validify@5.0.0-beta
```

## V5 Hooks

```
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
```

Add `useField` to your own inputs inside the Form wrapper:

```
import React from 'react';
import { useField } from './form/hook';

export default props => {
  let { handleChange, handleBlur, value, errors } = useField(props.name);

  return (
    <div>
      {errors ? <p>{errors[0]}</p> : null}
      <input
        {...props}
        value={value}
        onBlur={handleBlur}
        onChange={event => handleChange(event.target.value)}
      />
    </div>
  );
};

```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

| [<img src="https://avatars0.githubusercontent.com/u/449136?v=4" width="100px;"/><br /><sub>Zach Silveira</sub>](https://zach.codes)<br /> | [<img src="https://avatars1.githubusercontent.com/u/2430381?v=4" width="100px;"/><br /><sub>Ryan Castner</sub>](http://audiolion.github.io)<br /> |
| :---------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------: |


<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
