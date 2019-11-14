export default function validatePicture(values) {
  const errors = {};
  if (!values.nameOfPicture) {
    errors.nameOfPicture = "name is required!";
  }

  return errors;
}
