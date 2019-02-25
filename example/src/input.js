import React from 'react';
import useField from './form/hook';

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
