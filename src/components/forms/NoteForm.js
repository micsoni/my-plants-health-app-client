import React from "react";

export default function NoteForm(props) {
  return (
    <div className="text-center">
      <form onSubmit={props.onSubmit}>
        <div className="form-group col-12">
          <label className="col-sm-2 col-form-label">Title</label>{" "}
          <input
            type="text"
            name="title"
            onChange={props.onChange}
            value={props.values.title}
          />
        </div>
        <div className="form-group col-12">
          <label className="col-sm-2 col-form-label">Text </label>{" "}
          <textarea
            type="text"
            name="text"
            onChange={props.onChange}
            value={props.values.text}
          />
        </div>
        <button type="submit" className="btn">
          {props.button}
        </button>
      </form>
    </div>
  );
}
