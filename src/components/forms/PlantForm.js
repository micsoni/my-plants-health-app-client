import React from "react";

export default function PlantForm(props) {
  let myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "plants-health",
      uploadPreset: "ithewlh9",
      max_files: 1,
      thumbnails: ".container-thumbnails",
      thumbnailTransformation: [{ width: 200, height: 200, crop: "fit" }]
    },
    (error, result) => {
      props.checkUploadResults(result);
    }
  );

  const showWidget = event => {
    event.preventDefault();
    myWidget.open();
  };

  return (
    <div className="text-center">
      <form onSubmit={props.onSubmit}>
        <div className="form-group col-12">
          <label className="col-sm-2 col-form-label">Name </label>{" "}
          <input
            type="text"
            name="name"
            onChange={props.onChange}
            value={props.values.name}
          />
        </div>
        <div className="form-group col-12">
          <label className="col-sm-2 col-form-label">Image </label>{" "}
          <button
            onClick={showWidget}
            className="addFile"
            disabled={props.disabled}
          >
            ⇧ Choose a file ...
          </button>
          <div className="container-thumbnails"></div>
        </div>
        <div className="form-group col-12">
          <label className="col-sm-2 col-form-label">Description </label>{" "}
          <textarea
            type="text"
            name="description"
            onChange={props.onChange}
            value={props.values.description}
          />
        </div>
        <button type="submit" className="btn">
          {props.button}
        </button>
      </form>
    </div>
  );
}
