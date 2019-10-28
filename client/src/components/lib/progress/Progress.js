import React from "react";

const Progress = ({ max, value }) => {
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
