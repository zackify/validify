import { useSubmit } from "react-validify";

const Submit = (props) => {
  let { canSubmit, handleSubmit } = useSubmit();

  return (
    <div
      onClick={() => {
        if (canSubmit)
          return handleSubmit((values) => console.log("submit!", values));
      }}
      style={{ opacity: canSubmit ? 1 : 0.5 }}
    >
      Submit Form
    </div>
  );
};
export default Submit;
