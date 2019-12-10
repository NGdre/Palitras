import React from "react";

export const CircleProgressBar = ({
  progress = 0,
  width = 20,
  strokeWidth = 1,
  children,
  className,
  show,
  circleClassName: circleClassNameProp
}) => {
  if (!show) return null;

  const boxWidth = width * 2;
  const cx = boxWidth / 2;
  const radius = cx - strokeWidth * 2;
  const lineLength = Math.PI * 2 * radius;

  const circleBarClassName = `circle-progress-bar ${className}`;
  const circleClassName = `circle-progress-bar__circle ${circleClassNameProp}`;
  return (
    <div className={circleBarClassName}>
      <svg
        width={boxWidth}
        className="circle-progress-bar__svg"
        viewBox={`0 0 ${boxWidth} ${boxWidth}`}
      >
        <circle
          cx={cx}
          cy={cx}
          r={radius}
          className={circleClassName}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={cx}
          cy={cx}
          r={radius}
          className={circleClassName}
          strokeDashoffset={lineLength - (lineLength * progress) / 100}
          strokeDasharray={lineLength}
          strokeWidth={strokeWidth}
        />
        <foreignObject
          height="100%"
          width="100%"
          className="circle-progress-bar__children"
        >
          {children}
        </foreignObject>
      </svg>
    </div>
  );
};
