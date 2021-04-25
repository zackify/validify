import React from "react";
import { useSubmit } from "../../src/use-submit";

type Props = {
  onSubmit?: (values: any) => any;
};

const Submit = ({ onSubmit }: Props) => {
  let { canSubmit, handleSubmit } = useSubmit();

  return (
    <div
      id="submit"
      onClick={() => {
        if (canSubmit) {
          handleSubmit(onSubmit);
        }
      }}
      style={{ opacity: canSubmit ? 1 : 0.5 }}
    >
      Submit Form
    </div>
  );
};
export default Submit;
