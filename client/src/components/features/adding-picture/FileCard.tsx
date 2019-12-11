import React, { useState, memo } from "react";
import moment from "moment";
import { animated, useSpring, config } from "react-spring";
import Button from "../../buttons/Button";
import { CircleProgressBar } from "../../progress/CircleProgressBar";

function switchObj<
  Cases extends {
    [key: string]: any;
  }
>(cases: Cases) {
  return function<Return>(c: string): Return {
    return cases[c];
  };
}

interface FileCard {
  file: {
    size: number;
    lastModifiedDate: Date;
    name: string;
  };
  isSuccess: boolean;
  err: string;
  onClose: (index: number) => {};
  uploadProgress?: number;
  index: number;
}

export const FileCard: React.FC<FileCard> = memo(
  ({ file, isSuccess, err, onClose, uploadProgress = 0, ...props }) => {
    const [shouldCloseFile, setCloseFile] = useState(false);

    const animatedProps = useSpring({
      config: config.stiff,
      to: [
        {
          opacity: shouldCloseFile ? 0 : 1,
          transform: shouldCloseFile ? "translateX(-150px)" : "translateX(0px)"
        },
        { display: shouldCloseFile ? "none" : "flex" }
      ]
    });

    const sizeInMB = Math.round((file.size / 1000000) * 100) / 100;
    const date = moment(file.lastModifiedDate).format("D MMMM YYYY");

    const handleCloseFile = () => {
      setCloseFile(true);
      onClose(props.index);
    };

    interface Appearance {
      entities: { [key: string]: string };
      set: () => string;
    }

    const Appearance: Appearance = {
      entities: {
        "download-success": "file file_success surface",
        error: "file file_error surface",
        processing: "file surface",
        default: "file surface"
      },
      set: () => {
        if (!!err) return "error";

        if (isSuccess) return "download-success";

        if (uploadProgress === 100) return "processing";

        return "default";
      }
    };

    const appearance = Appearance.set();

    const fileClassNameSwitch = switchObj(Appearance.entities);

    const fileClassName = fileClassNameSwitch<string>(appearance);

    return (
      <animated.div className={fileClassName} {...props} style={animatedProps}>
        <img
          src="/images/image.svg"
          width="40px"
          className="file__icon"
          alt="file"
        />

        <div className="file__info">
          <p className="file__filename">{file.name}</p>
          <p className="file__info-text">
            {date} • <span className="file__size">{sizeInMB} MB</span>
          </p>
          {err && <p className="err">{err}</p>}
        </div>
        <div className="file__status">
          {appearance === "error" && (
            <i className="material-icons file__status-icon">error</i>
          )}
        </div>

        <CircleProgressBar
          progress={uploadProgress}
          width={26}
          strokeWidth={3}
          className={
            appearance === "download-success" && "circle-progress-bar_white"
          }
          circleClassName={
            appearance === "download-success" &&
            "circle-progress-bar__circle_animate"
          }
          show={appearance !== "error"}
        >
          <div className="file__status_center">
            {appearance === "default" && (
              <Button
                className="btn-icon file__btn_danger"
                onClick={handleCloseFile}
              >
                <i className="material-icons file__status-icon">close</i>
              </Button>
            )}
            {appearance === "download-success" && (
              <i className="material-icons file__status-icon">done</i>
            )}
            {appearance === "processing" && (
              <div className="processing__loader dot-pulse " />
            )}
          </div>
        </CircleProgressBar>
      </animated.div>
    );
  }
);
