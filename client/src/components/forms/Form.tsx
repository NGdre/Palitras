import React, { FormEvent } from "react";

export interface Form {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const Form: React.SFC<Form> = ({ onSubmit, ...props }) => {
  const onEnterDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      onSubmit(e);
    }
  };

  return (
    <form onKeyDown={onEnterDown} onSubmit={onSubmit} {...props}>
      {props.children}
    </form>
  );
};

export default Form;
