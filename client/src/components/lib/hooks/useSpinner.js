import { useSelector } from "react-redux";
import * as picture from "../../actions/pictureSelectors";
import * as user from "../../actions/userSelectors";

export default function useSpinner({ from }) {
  let selector;
  if (from === "picture") {
    selector = picture.selectIsLoading;
  }

  if (from === "user") {
    selector = user.selectIsLoading;
  }

  const isLoading = useSelector(selector);

  return { isLoading };
}
