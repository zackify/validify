import React from 'react';
import useField from './form/use-field';

const Input = props => {
  let { handleChange, handleBlur, value, errors } = useField(props.name);

  return (
    <div>
      {errors ? <p>{errors[0]}</p> : null}
      <input
        {...props}
        value={value || ''}
        onBlur={handleBlur}
        onChange={event => handleChange(event.target.value)}
      />
    </div>
  );
};
export default Input;
