import React from "react";
import TextInput from "../../inputs/TextInput";
import FileInput from "../../inputs/FileInput";
import Button from "../../buttons/Button";
import ConditionalImage from "../../images/ConditionalImage";
import Progress from "../../progress/Progress";

interface Props {
  handleSubmit: (e: { preventDefault: () => void }) => void;
  handleChange: (e: { target: { value: string } }) => void;
  handleBlur: (e: { target: { name: string } }) => void;
  handleFileChange: (e: { target: { value: string } }) => void;
  shouldClearForm: boolean;
  imageDataURl: string;
  uploadPercentage: number;
  isDataValid: boolean;
  shouldShowProgress: boolean;
  errors: { nameOfPicture?: string };
}

const PictureForm: React.FC<Props> = ({
  handleSubmit,
  shouldClearForm,
  handleChange,
  handleBlur,
  handleFileChange,
  imageDataURl,
  uploadPercentage,
  errors,
  isDataValid,
  shouldShowProgress
}) => {
  return (
    <div className="container wrapper">
      <form className="picture-form" onSubmit={handleSubmit}>
        <section className="upload">
          <h5 className="section-header">upload files</h5>
          <div className="section-breaker" />

          <TextInput
            name="nameOfPicture"
            title="name"
            clear={shouldClearForm}
            placeholder="enter the name of the picture"
            onChange={handleChange}
            onBlur={handleBlur}
            errMessage={errors.nameOfPicture}
          />

          <FileInput name="picture" onChange={handleFileChange} />
          <ConditionalImage src={imageDataURl} />
          <Progress value={uploadPercentage} show={shouldShowProgress} />
        </section>
        <Button type="submit" className="btn-big" disabled={!isDataValid}>
          add
        </Button>
      </form>
    </div>
  );
};

export default PictureForm;
