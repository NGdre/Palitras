import React from "react";
import { useDropzone, DropEvent } from "react-dropzone";
import Button from "../../buttons/Button";

interface ImageDropzone {
  onDrop: <T extends File>(
    acceptedFiles: T[],
    rejectedFiles: T[],
    event: DropEvent
  ) => void;
}

export default function ImageDropzone({ onDrop }: ImageDropzone) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*"
  });

  const dropzoneClassName = isDragActive
    ? "image-dropzone image-dropzone_active surface"
    : "image-dropzone surface";

  return (
    <div className={dropzoneClassName} {...getRootProps()}>
      <input {...getInputProps()} />
      <i className="material-icons image-dropzone__icon">cloud_upload</i>
      <div className="image-dropzone__actions">
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <>
            <strong>drag and drop your file</strong>
            <p>or</p>
            <Button>browse</Button>
          </>
        )}
      </div>
    </div>
  );
}
