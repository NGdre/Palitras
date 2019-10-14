import React from "react";

function SubmitInput(props) {
  const submitStyles = props.disabled ? "btn disabled" : "btn";
  return (
    <input
      type="submit"
      value={props.title}
      className={submitStyles}
      disabled={props.disabled}
    />
  );
}

export default SubmitInput;
