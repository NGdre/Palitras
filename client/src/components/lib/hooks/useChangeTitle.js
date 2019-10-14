import { useEffect } from "react";
import { capitalizeFirstLetter } from "../utils";

export default function useChangeTitle(methods = {}) {
  const { addTitle } = methods;

  useEffect(() => {
    if (addTitle) {
      document.title = addTitle
        ? `${document.title} | ${capitalizeFirstLetter(addTitle)}`
        : document.title;
    }
  }, [addTitle]);
}
