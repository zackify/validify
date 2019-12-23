import React from 'react';
import useSubmit from '../src/use-submit';

const Submit = props => {
  let { canSubmit, values, validateAll } = useSubmit();

  return (
    <div
      onClick={() => {
        if (canSubmit) return console.log('submit!', values);
        validateAll();
      }}
      style={{ opacity: canSubmit ? 1 : 0.5 }}
    >
      Submit Form
    </div>
  );
};
export default Submit;
