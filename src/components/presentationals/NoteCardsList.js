import React, { useState } from "react";
import { connect } from "react-redux";
import NoteCard from "./NoteCard";
import EditNoteFormContainer from "../forms/EditNoteFormContainer";

function NoteCardsList(props) {
  const [notesInEdit, setNotesInEdit] = useState([]);

  const toggleNoteForm = note => {
    const newState = notesInEdit.includes(note.id)
      ? notesInEdit.filter(id => id !== note.id)
      : notesInEdit.concat(note.id);

    setNotesInEdit(newState);
  };

  return props.plant.notes.map(note => {
    const showForm = notesInEdit.includes(note.id);
    return (
      <div className="card" key={note.id}>
        <NoteCard
          type={"details page"}
          plant={props.plant}
          note={note}
          toggleNoteForm={() => toggleNoteForm(note)}
        />
        <div>
          {showForm && (
            <EditNoteFormContainer
              onEdit={() => toggleNoteForm(note)}
              plant={props.plant}
              note={note}
            />
          )}
        </div>
      </div>
    );
  });
}

function mapStateToProps(state) {
  return {
    plant: state.plants.current
  };
}

export default connect(mapStateToProps)(NoteCardsList);
