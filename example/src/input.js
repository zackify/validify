import { useField } from "react-validify";

const Input = (props) => {
  let { handleChange, handleBlur, value, errors } = useField(props);
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
