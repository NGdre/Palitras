import { useEffect } from "react";
import { useDispatch } from "react-redux";
import usePrevs from "./usePrevs";

export default function useOnLeaveRoute(pathname, regex, action, options = {}) {
  const dispatch = useDispatch();
  const prevPath = usePrevs(pathname);

  useEffect(() => {
    if (regex.test(prevPath) && !regex.test(pathname)) {
      dispatch(action());
    }
  }, [prevPath, pathname, regex, dispatch, action]);

  const { changeTitle } = options;

  if (changeTitle) {
    document.title = changeTitle;
  }
}
