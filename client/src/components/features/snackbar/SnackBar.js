import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  selectMessage,
  selectShowMessage
} from "../../actions/pictureSelectors";

function SnackBar({ timeout = 4000 }) {
  const message = useSelector(selectMessage);
  const showMessage = useSelector(selectShowMessage);
  const [showTimeout, setShowTimeout] = useState(showMessage);

  useEffect(() => {
    setShowTimeout(showMessage);

    showMessage &&
      setTimeout(() => {
        setShowTimeout(false);
      }, timeout);
  }, [showMessage, message, timeout]);

  return (
    showTimeout && (
      <div className="modal-notification">
        <p className="message">{message}</p>
      </div>
    )
  );
}

export default SnackBar;
