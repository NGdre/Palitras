export const handleValue = handler => e => {
  const { value } = e.target;
  handler(value);
};

export const isNotEmpty = value => value.length > 0;

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function parseMongoDate(string) {
  const match = string.match(/\d{4}-\d{2}-\d{2}/g)[0];
  return match
    .split("-")
    .reverse()
    .join(".");
}
