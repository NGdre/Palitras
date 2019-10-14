const createError = (code, data, shouldRedirect) => {
  let error;

  if (typeof data === "string") {
    error = new Error(data);
  } else {
    error = new Error();
    error.data = data;
  }

  error.statusCode = code;
  if (shouldRedirect) error.shouldRedirect = true;
  return error;
};

module.exports = createError;
