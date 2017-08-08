## React Validify
[![CircleCI](https://circleci.com/gh/navjobs/validify.svg?style=svg)](https://circleci.com/gh/navjobs/validify)
[![Coverage Status](https://coveralls.io/repos/github/navjobs/validify/badge.svg?branch=master)](https://coveralls.io/github/navjobs/validify?branch=master)

### Todo

- Add 100% test coverage
- refactor, split out instance methods into standalone functions

## Install

```
npm install react-validify
```

```js
import Form from 'react-validify'

<Form
  initialValues={{email: 'test'}} //optional
  rules={{ email: 'email|required', password: 'required|min:8' }}
>
  <Input name="email" />
  <Input name="password" type="password" />

  <div
    submit
    onClick={values =>
      console.log('this will be called if validation passes', values)}
  >
    Submit!
  </div>
</Form>
```

## Usage

This component is the simplest way to validate form inputs in React. There's two things to learn. The Form accepts a prop called `rules`. This is an object with the names of all yours inputs and the rules for them. Rules can be found [here](https://github.com/skaterdav85/validatorjs#available-rules). Place the `submit` prop on any element that you want to trigger the validation. The onClick will not be triggered until the rules pass. If validation fails, error messages will be passed to the inputs as an error prop.


Workflow:

1. Import `Form`
2. Build a wrapper around inputs. It needs to handle when there's an error passed in:

```js
export default ({ error, ...props }) => {
  return (
    <div>
      <p>{error}</p>
      <input {...props} />
    </div>
  );
};

```
3. Add a submit button inside the form with the `submit` prop.
4. That's it!
