import { useState } from "react";

export default function useValidation(initialState, validate) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  function handleChange({ target }) {
    setValues({ ...values, [target.name]: target.value });
  }

  function handleBlur() {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }

  return {
    values,
    errors,
    handleChange,
    handleBlur
  };
}
