import React from "react";

function FileInput({ accept = ".jpg, .jpeg, .png, .svg", name, onChange }) {
  return (
    <div className="input-group">
      <label className="label-file">
        select picture
        <input
          type="file"
          name={name}
          className="form-control"
          onChange={onChange}
          accept={accept}
        />
        <i className="material-icons">add_photo_alternate</i>
      </label>
    </div>
  );
}

export default FileInput;
