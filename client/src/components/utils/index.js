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

export function makeActionPostfix(reducerName, action) {
  const postfixs = ["REQUEST", "SUCCESS", "FAIL"];
  return postfixs.map(postfix => `${reducerName}/${action}_${postfix}`);
}

export function makeActionPrefix(reducerName, actions) {
  return actions.map(action => makeActionPostfix(reducerName, action));
}

export const combineAPIActions = (actions, handler) => {
  return actions.reduce(
    (accum, action) => ({
      ...accum,
      [action]: handler
    }),
    {}
  );
};
