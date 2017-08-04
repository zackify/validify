import React from 'react';

export default ({ error, ...props }) => {
  return (
    <div>
      <p>{error}</p>
      <input {...props} />
    </div>
  );
};
