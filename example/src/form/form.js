import React from 'react';
import { FormContextProvider } from './context';

const Form = ({ children, ...props }) => (
  <FormContextProvider {...props}>{children}</FormContextProvider>
);

export default Form;
