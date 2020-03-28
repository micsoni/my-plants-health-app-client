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
      console.log(result);
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
          <label className="">Name </label>{" "}
          <input
            type="text"
            name="name"
            onChange={props.onChange}
            value={props.values.name}
          />
        </div>
        <div className="form-group col-12">
          <label className="">Image </label>{" "}
          <button onClick={showWidget} className="addFile">
            ⇧ Choose a file ...
          </button>
          <div className="container-thumbnails"></div>
        </div>
        <button type="submit" className="btn">
          Add new Plant
        </button>
      </form>
    </div>
  );
}
