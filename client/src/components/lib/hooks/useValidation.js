import { useState } from "react";

export default function useValidation(initialState, validate, options = {}) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [shouldShowErr, setShowErr] = useState({});

  const names = options.maxLength && Object.keys(options.maxLength);

  function handleChange({ target }) {
    if (names.length) {
      for (let name of names) {
        const isValidLength =
          name === target.name &&
          target.value.length <= options.maxLength[name];

        if (isValidLength) {
          setValues({ ...values, [target.name]: target.value });
        }

        if (name !== target.name) {
          setValues({ ...values, [target.name]: target.value });
        }
      }
    } else {
      setValues({ ...values, [target.name]: target.value });
    }

    checkValues();
  }

  function checkValues() {
    const { minLength, maxLength } = options;

    const validationErrors =
      names && names.length
        ? validate(values, {
            maxLength,
            minLength
          })
        : validate(values);

    setErrors(validationErrors);
  }

  function handleBlur({ target }) {
    checkValues();
    const { name } = target;
    const errStatus = !!Object.keys(errors).length;

    setShowErr({ ...shouldShowErr, [name]: errStatus });
  }

  return {
    values,
    errors,
    shouldShowErr,
    handleChange,
    handleBlur
  };
}
