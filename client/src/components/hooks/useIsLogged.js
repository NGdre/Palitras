import { useSelector, useDispatch } from "react-redux";
import { push } from "connected-react-router";

export default function useIsLogged(cb) {
  const isLogged = useSelector(state => state.auth.isLogged);
  const dispatch = useDispatch();

  const hasLogged = () => {
    if (isLogged) {
      cb();
    } else {
      dispatch(push("/login"));
    }
  };

  return hasLogged;
}
