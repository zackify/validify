import React from "react";
import useField from "../../src/use-field";

const Input = (props) => {
  let { handleChange, handleBlur, value, errors } = useField({
    name: props.name,
    rules: props.rules,
  });
  return (
    <div>
      {errors ? <p>{errors[0]}</p> : null}
      <input
        {...props}
        value={value || ""}
        onBlur={handleBlur}
        placeholder={props.name}
        onChange={(event) => handleChange(event.target.value)}
      />
    </div>
  );
};
export default Input;
