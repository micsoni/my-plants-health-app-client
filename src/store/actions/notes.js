import request from "superagent";

const baseUrl = "https://boiling-hamlet-55290.herokuapp.com";

// action to delete note
function destroyNote(noteId) {
  return {
    type: "NOTE_DELETE_SUCCESS",
    payload: noteId
  };
}

export function deleteNote(plantId, noteId) {
  return async function(dispatch, getState) {
    const state = getState();
    const { user } = state;

    try {
      await request
        .delete(`${baseUrl}/note/${noteId}`)
        .send({ plantId })
        .set("Authorization", `Bearer ${user.loginInfo.jwt}`);

      const action = destroyNote(noteId);

      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
}

// action to update note
function updateNote(newNote) {
  return {
    type: "CHANGE_NOTE",
    payload: newNote
  };
}

export function editNote(plantId, noteId, update) {
  return async function(dispatch, getState) {
    const state = getState();
    const { user } = state;
    update.plantId = plantId;
    try {
      const response = await request
        .put(`${baseUrl}/note/${noteId}`)
        .set("Authorization", `Bearer ${user.loginInfo.jwt}`)
        .send(update);

      const action = updateNote(response.body);

      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
}

// action to create note
function newNote(newNote) {
  return {
    type: "ADD_NOTE",
    payload: newNote
  };
}

export function createNote(plantId, data) {
  return async function(dispatch, getState) {
    const state = getState();
    const { user } = state;
    data.plantId = plantId;
    try {
      const response = await request
        .post(`${baseUrl}/note`)
        .set("Authorization", `Bearer ${user.loginInfo.jwt}`)
        .send(data);

      const action = newNote(response.body);

      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
}

//get Logged User Alarms
function userNotes(userNotes) {
  return {
    type: "LOGGED_USER_NOTES",
    payload: userNotes
  };
}

export function getUserNotes() {
  return async function(dispatch, getState) {
    const state = getState();
    const { user } = state;
    try {
      const response = await request
        .get(`${baseUrl}/note`)
        .set("Authorization", `Bearer ${user.loginInfo.jwt}`);
      const notes = response.body;

      const action = userNotes(notes);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
}
