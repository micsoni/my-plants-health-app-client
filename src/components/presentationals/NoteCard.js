import React from "react";
import { connect } from "react-redux";
import { deleteNote } from "../../store/actions/notes";
import { Link } from "react-router-dom";

function NoteCard(props) {
  const onDelete = event => {
    event.preventDefault();
    props.deleteNote(props.plant.id, note.id);
  };

  const { note } = props;

  const containerType = () => {
    if (props.type === "details page") {
      return (
        <div className="text-center col-12">
          <h5 className="">{note.title}</h5>
          <p className="text-justify">{note.text}</p>
          <button className="addFile" onClick={props.toggleNoteForm}>
            Edit note
          </button>{" "}
          <button className="addFile" onClick={onDelete}>
            Delete note
          </button>
        </div>
      );
    }
    return (
      <div className="text-center row">
        <div className="col-4">
          <img src={note.plant.image} className="thumb" alt="" />
        </div>
        <div className="col-8">
          <h5 className="card-title">{note.title} </h5>
          <p className="text-center">{note.text}</p>
          <Link
            to={`/plants/${note.plant.id}`}
            className="nav-link dropdown-item"
          >
            <button className="addFile"> See {note.plant.name}</button>
          </Link>
        </div>
      </div>
    );
  };

  return <div>{containerType()}</div>;
}

export default connect(null, { deleteNote })(NoteCard);
