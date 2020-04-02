import React, { useEffect } from "react";
import NoteCard from "../presentationals/NoteCard";
import { getUserNotes } from "../../store/actions/notes";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "../../style/AllAlarmsPage.css";

function AllNotesPage(props) {
  const { getUserNotes } = props;
  const currentUser = props.userLoggedIn.jwt;

  useEffect(() => {
    if (currentUser) {
      getUserNotes();
    }
  }, [getUserNotes, currentUser]);

  if (!props.userLoggedIn.jwt) {
    return <Redirect to="/login" />;
  }

  if (!props.notes) {
    return <p>Loading...</p>;
  }

  if (props.notes.length === 0) {
    return <div>You don't have any notes yet</div>;
  }

  const displayNotes = props.notes.map(note => {
    return (
      <div className="col-lg-4 col-md-6 col-12">
        <div className="card" key={note.id}>
          <NoteCard plant={note.plant} note={note} />
        </div>
      </div>
    );
  });

  return (
    <div class="container-fluid">
      <div class="row">{displayNotes}</div>{" "}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userLoggedIn: state.user.loginInfo,
    notes: state.notes
  };
}
const mapDispatchToProps = {
  getUserNotes
};

export default connect(mapStateToProps, mapDispatchToProps)(AllNotesPage);
