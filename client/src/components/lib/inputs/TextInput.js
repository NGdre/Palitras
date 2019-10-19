import React, { useState, useEffect } from "react";
import ErrInput from "./ErrForInput";

function TextInput({
  type = "text",
  required = false,
  value = undefined,
  autofocus = false,
  onChange,
  onBlur,
  showErr,
  outlined = false,
  name,
  title,
  placeholder,
  errMessage,
  leadingIcon,
  trailingIcon,
  characterCount
}) {
  const [isNotEmpty, setNotEmpty] = useState(false);

  const inputClassName = outlined
    ? "form-control-outlined padding-left"
    : "form-control";

  const labelClassName = outlined ? "form-label-outlined" : "form-label";

  useEffect(() => {
    setNotEmpty(!!value);
  }, [value]);

  return (
    <div className="input-group">
      <input
        type={type}
        name={name}
        value={value}
        required={required}
        placeholder={placeholder}
        className={inputClassName}
        onChange={onChange}
        onBlur={onBlur}
        autoFocus={autofocus}
      />
      <label className={labelClassName}>{title || name}</label>
      {leadingIcon && (
        <i className="material-icons leading-icon">{leadingIcon}</i>
      )}
      {trailingIcon && (
        <i className="material-icons trailing-icon">{trailingIcon}</i>
      )}
      {characterCount && (
        <p className="character-count">
          {value.length}/{characterCount}
        </p>
      )}
      {!errMessage && isNotEmpty && (
        <i className="material-icons valid">done</i>
      )}
      {showErr && <ErrInput text={errMessage} />}
    </div>
  );
}

export default TextInput;
