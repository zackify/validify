import React from 'react';

const FormContext = React.createContext();

//test blocking render
const FormContextProvider = ({ children, ...props }) => {
  return <FormContext.Provider value={props}>{children}</FormContext.Provider>;
};

const FormContextConsumer = FormContext.Consumer;

export { FormContext, FormContextProvider, FormContextConsumer };
