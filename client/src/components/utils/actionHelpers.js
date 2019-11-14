const takeOutAction = (actionCreators, reducerName) => index => {
  return actionCreators.map(actionCreatorArr => {
    return Object.values(actionCreatorArr[reducerName])[index];
  });
};

export const getActionsOfType = (actionCreators, { reducerName }) => {
  const getActions = takeOutAction(actionCreators, reducerName);
  const actionRequests = getActions(0);
  const actionFails = getActions(2);

  return {
    actionRequests,
    actionFails
  };
};
