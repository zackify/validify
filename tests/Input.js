import React from 'react';
import useField from '../src/use-field';
const Input = props => {
    let { handleChange, handleBlur, value, errors } = useField(props.name);
    return (React.createElement("div", null,
        errors ? React.createElement("p", null, errors[0]) : null,
        React.createElement("input", Object.assign({}, props, { value: value || '', onBlur: handleBlur, placeholder: props.name, onChange: event => handleChange(event.target.value) }))));
};
export default Input;
