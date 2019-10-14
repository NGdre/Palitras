import React from "react";
import ErrInput from "./ErrForInput";

function TextInput({
  type = "text",
  required = false,
  value,
  onChange,
  onBlur,
  name,
  placeholder,
  errMessage
}) {
  return (
    <div className="input-group">
      <input
        type={type}
        name={name}
        value={value}
        required={required}
        placeholder={placeholder}
        className="form-control"
        onChange={onChange}
        onBlur={onBlur}
      />
      <label className="form-label">name</label>
      {errMessage && <ErrInput text={errMessage} />}
    </div>
  );
}

export default TextInput;
