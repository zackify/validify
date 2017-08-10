## React Validify
[![CircleCI](https://circleci.com/gh/navjobs/validify.svg?style=svg)](https://circleci.com/gh/navjobs/validify)
[![Coverage Status](https://coveralls.io/repos/github/navjobs/validify/badge.svg?branch=master)](https://coveralls.io/github/navjobs/validify?branch=master)

## Install

```
npm install react-validify
```

```js
import Form from 'react-validify'

<Form
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

## Props

**rules**

You can see a list of rules [here](https://github.com/skaterdav85/validatorjs#available-rules)

**errorMessages**

Custom error messages. You can see how these work [here](https://github.com/skaterdav85/validatorjs#custom-error-messages)
```js
errorMessages={{
  'required.email': 'Custom error message', 
  'min.password': 'Custom min password required error message.'
}} 
```

**initialValues**

Set values when the form is first rendered.
```js
initialValues={{name: 'set'}}
```

**errors**

Set errors manually, in case the server comes back with messages.

```js
errors={{name: 'Email is invalid...'}}
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars0.githubusercontent.com/u/449136?v=4" width="100px;"/><br /><sub>Zach Silveira</sub>](https://zach.codes)<br /> |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!