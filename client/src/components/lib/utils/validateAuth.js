export default function validateAuth(values, { minLength, maxLength }) {
  const errors = {};
  const { password: maxPasswordLength } = maxLength;
  const { password: minPasswordLength } = minLength;

  function isValidEmail(email) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  function isValidPassword(pass) {
    const regex = /^[a-zA-Z0-9]{4,20}$/;
    return regex.test(pass);
  }

  if (!values.email) {
    errors.email = "email is required!";
  } else if (!isValidEmail(values.email)) {
    errors.email = "email doesn't correspond the schema";
  }

  if (!values.password) {
    errors.password = "password is required!";
  } else if (
    values.password.length < minPasswordLength ||
    values.password.length > maxPasswordLength
  ) {
    errors.password = `password should be in the range of ${minPasswordLength} to ${maxPasswordLength}`;
  } else if (!isValidPassword(values.password)) {
    errors.password = "password should only consist numbers and letters";
  }

  return errors;
}
