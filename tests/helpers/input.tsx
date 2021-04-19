import React from "react";
import useField, { FieldProps } from "../../src/use-field";

const Input = ({ name, rules }: FieldProps) => {
  let { handleChange, handleBlur, value, errors } = useField({
    name,
    rules,
  });
  return (
    <div>
      {errors ? <p>{errors[0]}</p> : null}
      <input
        value={value || ""}
        onBlur={handleBlur}
        placeholder={name}
        onChange={(event) => handleChange(event.target.value)}
      />
    </div>
  );
};
export default Input;
