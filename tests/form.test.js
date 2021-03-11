import React from "react";
import { render, fireEvent, wait, act } from "@testing-library/react";
import { TestForm, TestFormWithRemovedField } from "./helpers/form";

test("Checks dependent rule", async () => {
  let errorMessage = "Must be longer value than date 2 field";
  let { queryByPlaceholderText, queryByText, getByText } = render(<TestForm />);

  // put a 2 character string in the date 2 field
  const date2 = queryByPlaceholderText("date2");
  fireEvent.change(date2, { target: { value: 22 } });

  // confirm the error message doesn't show yet
  const date1 = queryByPlaceholderText("date1");
  expect(queryByText(errorMessage)).toBeNull();

  // make the date1 field a single character, and blur it, which should trigger
  // the error message
  fireEvent.change(date1, { target: { value: 2 } });
  fireEvent.blur(date1);

  // confirm the error message is displayed
  expect(getByText(errorMessage)).toBeInTheDocument();
});

test(`Validates fields that aren't changed, but their dependent fields changed`, async () => {
  let errorMessage = "Must be longer value than date 2 field";
  let { queryByPlaceholderText, queryByText, getByText } = render(<TestForm />);

  const date1 = queryByPlaceholderText("date1");
  const date2 = queryByPlaceholderText("date2");

  //fill in both fields correctly
  fireEvent.change(date2, { target: { value: "short" } });
  fireEvent.change(date1, { target: { value: "longer" } });

  // blur them both to confirm errors should show immediately now
  fireEvent.blur(date1);
  fireEvent.blur(date2);

  // confirm no error yet
  expect(queryByText(errorMessage)).toBeNull();

  // change date 2 field, which has no validation itself, and make sure
  // that date1 is validated on change
  fireEvent.change(date2, { target: { value: "longer than date1" } });
  expect(getByText(errorMessage)).toBeInTheDocument();
});

test("Validation runs after blur", async () => {
  let { queryByPlaceholderText, queryByText } = render(<TestForm />);

  //blur the field
  const name = queryByPlaceholderText("name");
  fireEvent.blur(name);

  //ensure the validation shows up
  expect(queryByText("This field is required")).toBeInTheDocument();
});

test("Validation runs on change after initial blur", async () => {
  let { queryByPlaceholderText, queryByText } = render(<TestForm />);

  const name = queryByPlaceholderText("name");

  // blur out of the field
  fireEvent.blur(name);
  //blur twice, make sure nothing happens since we only care about the first time
  fireEvent.blur(name);

  // make sure the validation error shows up
  expect(queryByText("This field is required")).toBeInTheDocument();

  //fill in the field with anything
  fireEvent.change(name, { target: { value: "filled" } });

  //ensure the validation goes away
  expect(queryByText("This field is required")).toBeNull();
});

test("Validation runs after submit", async () => {
  let { queryByText } = render(<TestForm />);
  const submit = queryByText("Submit Form");

  //ensure the validation isn't showing
  expect(queryByText("This field is required")).toBeNull();

  //press the submit button
  submit.click();

  //see if the validation is now showing for fields
  expect(queryByText("This field is required")).toBeInTheDocument();
  expect(queryByText("Email address is invalid")).toBeInTheDocument();
});

test("Submit calls onSubmit if validation passes", async () => {
  const spy = jest.fn();
  let { queryByPlaceholderText, queryByText } = render(
    <TestForm onSubmit={spy} />
  );
  const submit = queryByText("Submit Form");

  //press the submit button
  submit.click();

  //ensure onSubmit wasn't called, because validation failed
  expect(spy.mock.calls.length).toEqual(0);

  //fill in required fields, so validation will pass
  fireEvent.change(queryByPlaceholderText("name"), {
    target: { value: "test" },
  });
  fireEvent.change(queryByPlaceholderText("email"), {
    target: { value: "test@test.com" },
  });

  //press the submit button with passing validation
  submit.click();

  //ensure onSubmit was called this time
  expect(spy.mock.calls.length).toEqual(1);
});

test("Form works without rules object passed", async () => {
  let { queryByPlaceholderText } = render(<TestForm noRules />);

  //blur the field
  const name = queryByPlaceholderText("name");
  fireEvent.blur(name);
  fireEvent.change(name, { target: { value: "testing" } });

  //ensure the validation shows up
  expect(name.value).toEqual("testing");
});

test("Empty input value gets passed as empty string to rule fn", async () => {
  const spy = jest.fn();
  let { queryByText } = render(<TestForm nameRule={spy} />);
  const submit = queryByText("Submit Form");

  //press the submit button
  submit.click();

  //ensure that the value given to the rule is an empty string if it wasnt touched
  expect(spy.mock.calls[0][0]).toEqual("");
  expect(spy.mock.calls[0][1]).toEqual({ email: "test" });
});

test("Field validation shows errors on submit even without touching any fields", async () => {
  let { getByText } = render(<TestForm />);

  //trigger submit
  getByText("Submit Form").click();

  //ensure the validation shows up
  expect(getByText("This field is required")).toBeInTheDocument();
});

test("Field validation runs on change, after submitting", async () => {
  let { queryByPlaceholderText, getByText } = render(<TestForm />);
  const name = queryByPlaceholderText("name");

  //trigger submit
  getByText("Submit Form").click();

  //change name to something valid
  fireEvent.change(name, { target: { value: "testing" } });

  // change it back to invalid, and make sure the validation is shown
  fireEvent.change(name, { target: { value: "" } });

  //ensure the validation shows up
  expect(getByText("This field is required")).toBeInTheDocument();
});

test(`Untouched fields shouldn't validate unless submitted first`, () => {
  let { queryByPlaceholderText, queryByText } = render(<TestForm />);
  const email = queryByPlaceholderText("email");

  fireEvent.focus(email);
  fireEvent.change(email, { target: { value: "test@test.com" } });
  fireEvent.blur(email);

  expect(queryByText("This field is required")).toBeNull();
});

test(`Doesnt check rule after component is unmounted`, async () => {
  const spy = jest.fn();
  let { getByText, queryByPlaceholderText } = render(
    <TestFormWithRemovedField onSubmit={spy} />
  );
  fireEvent.change(queryByPlaceholderText("email"), {
    target: { value: "" },
  });
  await act(async () => await new Promise((resolve) => setTimeout(resolve, 0)));
  expect(queryByPlaceholderText("email")).toEqual(null);

  fireEvent.change(queryByPlaceholderText("name"), {
    target: { value: "testing" },
  });
  fireEvent.change(queryByPlaceholderText("date1"), {
    target: { value: "testing" },
  });
  fireEvent.change(queryByPlaceholderText("date2"), {
    target: { value: "test" },
  });

  getByText("Submit Form").click();

  //it should call submit even though email is empty, because it was unmounted
  expect(spy.mock.calls[0][0].email).toEqual("");
});
