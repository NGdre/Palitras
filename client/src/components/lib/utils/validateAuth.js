export default function validateAuth(values) {
  const errors = {};

  function isValidEmail(email) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  function isValidPassword(pass) {
    const regex = /^[a-zA-Z0-9]{3,16}$/;
    return regex.test(pass);
  }

  if (!values.email) {
    errors.email = "email is required!";
  } else if (!isValidEmail(values.email)) {
    errors.email = "email doesn't correspond the schema";
  }

  if (!values.password) {
    errors.password = "password is required!";
  } else if (values.password.length < 3 || values.password.length > 16) {
    errors.password = "password should be in the range of 3 to 16";
  } else if (!isValidPassword(values.password)) {
    errors.password = "password should only consist numbers and letters";
  }

  return errors;
}
