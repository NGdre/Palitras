import axios from "axios";

const makeRequestToAPI = reducerName => async (
  url,
  dispatch,
  actionCreators,
  options = { method: "get" },
  additional
) => {
  const [
    reqActionCreator,
    successActionCreator,
    failActionCreator
  ] = Object.values(actionCreators[reducerName]);

  const { method, data } = options;

  dispatch(reqActionCreator());

  try {
    const res = await axios({ method, url, data });

    if (res.status < 400) {
      dispatch(successActionCreator(res.data, additional));
    } else {
      dispatch(failActionCreator(res.response.data));
    }
  } catch (error) {
    dispatch(failActionCreator(error));
  }
};

export default makeRequestToAPI;
