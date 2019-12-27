## React Validify

single dependency, simplest way to validate and manage form state with hooks! With full test coverage and TS support.

## Install

```
npm install react-validify
```

## Getting Started

This api has been carefully thought out over the past year. It's been in use on multiple React websites and React Native mobile applications. Using the library is simple. Include the `Form` component, and wrap your `input`'s and `submit` buttons.

```js
import Input from './input';
import Submit from './submit';
import { Form, rules } from 'react-validify';

const { required, email } = rules;

const App = () => {
  let [values, setValues] = React.useState({
    email: 'test',
    nested: { test: 'this is nested' },
  });

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
      <Input name="nested.test" />
      <Submit />
    </Form>
  );
};
```

Add `useField` to your own inputs inside the Form wrapper. This allows you to use the library with any type of input field.
It just needs to support a `handleChange` `handleBlur` and `value` prop. This is the `Input` component you see in the first example. Don't forget to pass the field `name` to the hook.

```js
import React from 'react';
import { useField } from 'react-validify';

const Input = ({ name }) => {
  let { handleChange, handleBlur, value, errors } = useField(name);

  return (
    <div>
      {errors ? <p>{errors[0]}</p> : null}
      <input
        name={name}
        value={value}
        onBlur={handleBlur}
        onChange={event => handleChange(event.target.value)}
      />
    </div>
  );
};
```

Add `useSubmit` to trigger submitting or validating:

```js
import React from 'react';
import { useSubmit } from 'react-validify';

const Submit = props => {
  let { canSubmit, handleSubmit } = useSubmit();

  return (
    <div
      onClick={() => handleSubmit(values => console.log('submit!', values))}
      style={{ opacity: canSubmit ? 1 : 0.5 }}
    >
      Submit Form
    </div>
  );
};
export default Submit;
```
The callback passed to `handleSubmit` will only be triggered uf validation is passing.

Create rules:

```js
const testRule: RuleFn = (value, values) =>
  value.length > values.date2.length ? "Date can't be longer" : null;
```

Rules get a `value` and `values` arguments. This means you can validate an input, or validate it against other form values.

Rules are guaranteed to run on a field after the first time the field is blurred, and then any time an error is present, they will run onChange.

## TypeScript Support

With TS enabled, you can create a type for your form values, like so:
```tsx
type Values = {
  email: string;
  date1?: string;
  name?: string;
};
```
Now when we use the form, it looks like this:

```tsx
let [values, setValues] = useState<Values>({
    email: 'test',
  });

  return (
    <Form
      values={values}
      onValues={setValues}
      rules={{
        email: [required, email],
        date1: [greaterThanDate2],
        name: [required],
        fakeField: [] // this will error now
      }}
    >
      <Input name="email" />
    </Form>
  )
}
```

TS will infer the values object from the type, since we gave it to `useState`. This means, our rules object can be validated. If you accidentally leave a key for an old field in the rules object, TS will throw an error for you.

You can explicitly set the type like this if you wanted:

```tsx
<Form<Values>
  values={values}
  onValues={setValues}
  rules={{
    email: [required, email],
  }}
>
  <Input name="email" />
</Form>
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

| [<img src="https://avatars0.githubusercontent.com/u/449136?v=4" width="100px;"/><br /><sub>Zach Silveira</sub>](https://zach.codes)<br /> | [<img src="https://avatars1.githubusercontent.com/u/2430381?v=4" width="100px;"/><br /><sub>Ryan Castner</sub>](http://audiolion.github.io)<br /> |
| :---------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------: |


<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
