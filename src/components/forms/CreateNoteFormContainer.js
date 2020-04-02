import React, { useState } from "react";
import { connect } from "react-redux";
import NoteForm from "./NoteForm";
import { createNote } from "../../store/actions/notes";
import "../../style/Forms.css";

function CreateNoteFormContainer(props) {
  const [note, setNote] = useState({
    title: "",
    text: ""
  });

  const onSubmit = event => {
    event.preventDefault();
    props
      .createNote(props.plant.id, { title: note.title, text: note.text })
      .then(props.onAdd);
  };

  const onChange = event => {
    setNote({
      ...note,
      [event.target.name]: event.target.value
    });
  };
  return (
    <div className="form ">
      <div className="card shadow-sm">
        <p className="text-center">Add information </p>
        <NoteForm
          onSubmit={onSubmit}
          onChange={onChange}
          values={note}
          button={"Add Note"}
        />
      </div>
    </div>
  );
}

export default connect(null, { createNote })(CreateNoteFormContainer);
