import React, { useState, useEffect, useRef } from "react";

function TextInput({
  type = "text",
  required = false,
  value = undefined,
  autofocus = false,
  onChange,
  onBlur,
  showErr = false,
  outlined = false,
  name,
  clear = false,
  title,
  placeholder,
  errMessage,
  showValidIcon = false,
  leadingIcon = undefined,
  trailingIcon = undefined,
  characterCount = undefined
}) {
  const [isNotEmpty, setNotEmpty] = useState(false);
  const inputRef = useRef(null);

  const inputClassName = outlined
    ? "form-control-outlined padding-left"
    : "form-control";

  const labelClassName = outlined ? "form-label-outlined" : "form-label";

  useEffect(() => {
    setNotEmpty(!!value);
  }, [value]);

  useEffect(() => {
    if (clear === true) {
      inputRef.current.value = "";
    }
  }, [clear]);

  return (
    <div className="input-group">
      <input
        ref={inputRef}
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
      {showValidIcon && !errMessage && isNotEmpty && (
        <i className="material-icons valid">done</i>
      )}
      {showErr && <p className="err">{errMessage}</p>}
    </div>
  );
}

export default TextInput;
