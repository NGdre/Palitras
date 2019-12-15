import React, { useState, useEffect, useRef } from "react";

function TextInput({
  type = "text",
  required = false,
  value = undefined,
  autofocus = false,
  onChange,
  onBlur,
  outlined = false,
  name,
  clear = false,
  title,
  placeholder,
  errMessage,
  showValidIcon = false,
  characterCount = undefined,
  ...props
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
      {characterCount && (
        <p className="character-count">
          {value.length}/{characterCount}
        </p>
      )}
      {showValidIcon && !errMessage && isNotEmpty && (
        <i className="material-icons valid">done</i>
      )}
      {props.children}
    </div>
  );
}

export default TextInput;
