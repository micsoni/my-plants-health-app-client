import React, { useState } from "react";
import { connect } from "react-redux";
import NoteForm from "./NoteForm";
import { editNote } from "../../store/actions/notes";
import "../../style/Forms.css";

function EditNoteFormContainer(props) {
  const [note, setNote] = useState({
    title: props.note.title,
    text: props.note.text
  });

  const onSubmit = event => {
    event.preventDefault();
    props
      .editNote(props.plant.id, props.note.id, {
        title: note.title,
        text: note.text
      })
      .then(props.onEdit);
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
        <p className="text-center">Edit information </p>
        <NoteForm
          onSubmit={onSubmit}
          onChange={onChange}
          values={note}
          button={"Update Note"}
        />
      </div>
    </div>
  );
}

export default connect(null, { editNote })(EditNoteFormContainer);
