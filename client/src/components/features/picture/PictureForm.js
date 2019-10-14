import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextInput from "../../lib/inputs/TextInput";
import FileInput from "../../lib/inputs/FileInput";
import Button from "../../lib/buttons/Button";
import validatePicture from "../../lib/utils/validatePicture";
import ConditionalImage from "../../lib/images/ConditionalImage";
import useValidation from "../../lib/hooks/useValidation";
import useFileHandler from "../../lib/hooks/useFileHandler";

function PictureForm(props) {
  const [isDataValid, setDataValid] = useState(false);

  const initialState = {
    nameOfPicture: ""
  };

  const { values, errors, handleChange, handleBlur } = useValidation(
    initialState,
    validatePicture
  );

  const { fileValue, imageDataURl, handleFileChange } = useFileHandler();

  useEffect(() => {
    const noErrors = Object.keys(errors).length === 0;

    const isValid = noErrors && fileValue.size;
    setDataValid(isValid);
  }, [fileValue, errors]);

  function handleSubmit(e) {
    e.preventDefault();
    const { nameOfPicture } = values;
    props.sendFetchRequest({ nameOfPicture, pictureFile: fileValue });
  }

  return (
    <div className="container wrapper">
      <form className="picture-form" onSubmit={handleSubmit}>
        <section className="upload">
          <h3 className="section-header">upload files</h3>
          <div className="section-breaker"></div>
          <TextInput
            name="nameOfPicture"
            placeholder="enter the name of the picture"
            onChange={handleChange}
            onBlur={handleBlur}
            errMessage={errors.nameOfPicture}
          />

          <FileInput name="picture" onChange={handleFileChange} />
          <ConditionalImage src={imageDataURl} />
        </section>

        <Button type="submit" className="btn-big" disabled={!isDataValid}>
          add
        </Button>
      </form>
    </div>
  );
}

PictureForm.propTypes = {
  sendFetchRequest: PropTypes.func.isRequired
};

export default PictureForm;
