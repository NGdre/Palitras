import React from "react";

const Progress = ({ value, show = false }) => {
  if (!value || !show) {
    return null;
  }

  const percentage = value + "%";

  return (
    <div className="progress-bar">
      <div style={{ width: percentage }} className="progress">
        {percentage}
      </div>
    </div>
  );
};

export default Progress;
