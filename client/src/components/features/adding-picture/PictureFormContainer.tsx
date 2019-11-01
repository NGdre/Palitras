import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PictureForm from "./PictureForm";
import useValidation from "../../lib/hooks/useValidation";
import useFileHandler from "../../lib/hooks/useFileHandler";
import validatePicture from "../../lib/utils/validatePicture";
import { selectIsLoading } from "../../actions/pictureSelectors";
import { uploadPicture } from "../../actions/picture";

interface TextValidation {
  values: Initial;
  errors: Errors;
  handleChange: (e: { target: { value: string } }) => void;
  handleBlur: (e: { target: { name: string } }) => void;
  clear: () => void;
}

interface FileValidation {
  fileValue: { size?: number };
  imageDataURl: string;
  handleFileChange: (e: { target: { value: string } }) => void;
  clear: () => void;
}

interface Initial {
  nameOfPicture: string;
}

interface Errors {
  nameOfPicture?: string;
}

const PictureFormContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [isDataValid, setDataValid] = useState(false);
  const [shouldClearForm, setClearForm] = useState(false);
  const [shouldShowProgress, setShowProgress] = useState(false);

  const uploadPercentage = useSelector(
    (state: { picture: { uploadPercentage: number } }) => {
      return state.picture.uploadPercentage;
    }
  );

  const isLoading = useSelector(selectIsLoading);

  const initialState: Initial = {
    nameOfPicture: ""
  };

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    clear: clearPicture
  }: TextValidation = useValidation(initialState, validatePicture);

  const {
    fileValue,
    imageDataURl,
    handleFileChange,
    clear: clearFile
  }: FileValidation = useFileHandler();

  useEffect(() => {
    const noErrors = Object.keys(errors).length === 0;

    const isValid = noErrors && !!fileValue.size;
    setDataValid(isValid);
  }, [fileValue, errors]);

  useEffect(() => {
    if (isLoading === false) {
      setTimeout(() => {
        clearPicture();
        clearFile();
        setClearForm(true);
        setShowProgress(false);
      }, 2000);

      setTimeout(() => {
        setClearForm(false);
      }, 3000);
    }
  }, [isLoading, clearPicture, clearFile]);

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    const { nameOfPicture } = values;
    setShowProgress(true);

    dispatch(uploadPicture({ nameOfPicture, pictureFile: fileValue }));
  }

  return (
    <PictureForm
      handleSubmit={handleSubmit}
      shouldClearForm={shouldClearForm}
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleFileChange={handleFileChange}
      errors={errors}
      imageDataURl={imageDataURl}
      isDataValid={isDataValid}
      uploadPercentage={uploadPercentage}
      shouldShowProgress={shouldShowProgress}
    />
  );
};

export default PictureFormContainer;
