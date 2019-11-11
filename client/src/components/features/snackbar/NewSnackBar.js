import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTransition, animated, config } from "react-spring";

import { selectSnackbarMessage, selectSnackbarOpen } from "./snackbarSelectors";
import { clearSnackbar } from "./snackbarActions";

const NewSnackBar = React.memo(({ timeout = 4000 }) => {
  const message = useSelector(selectSnackbarMessage);
  const showMessage = useSelector(selectSnackbarOpen);
  const dispatch = useDispatch();

  const transitions = useTransition(showMessage, null, {
    config: config.stiff,
    from: { position: "fixed", opacity: 0, transform: "translateY(100px)" },
    enter: { opacity: 1, transform: "translateY(-40px)" },
    leave: { opacity: 0, transform: "translateY(100px)" }
  });

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        dispatch(clearSnackbar());
      }, timeout);
    }
    return;
  }, [showMessage, dispatch, message, timeout]);

  return transitions.map(({ item, key, props }) => {
    return item ? (
      <animated.div key={key} style={props}>
        <div className="modal-notification">
          <p className="message">{message}</p>
        </div>
      </animated.div>
    ) : null;
  });
});

export default NewSnackBar;
