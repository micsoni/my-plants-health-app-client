import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CreateAlarmFormContainer from "./CreateAlarmFormContainer";
import usePushNotifications from "./Notification/useNotifications";
import { getCurrentPlant } from "../store/actions/plants";
import AlarmsCardsList from "./AlarmsCardsList";
import PlantDetails from "./PlantDetails";
import NoteCardsList from "./NoteCardsList";
import CreateNoteFormContainer from "./CreateNoteFormContainer";

function PlantDetailsPage(props) {
  const [toggleAlarmForm, setToggleAlarmForm] = useState(false);
  const [toggleNoteForm, setToggleNoteForm] = useState(false);

  const toggleAForm = () => {
    setToggleAlarmForm(!toggleAlarmForm);
  };

  const toggleNForm = () => {
    setToggleNoteForm(!toggleNoteForm);
  };

  const { onClickAskUserPermissionAndSubscribe } = usePushNotifications();

  const { getCurrentPlant } = props;
  const plantId = props.match.params.plantId;
  const currentUser = props.userLoggedIn.jwt;

  useEffect(() => {
    if (currentUser) {
      getCurrentPlant(plantId);
    }
  }, [getCurrentPlant, plantId, currentUser]);

  const checkforAlarms = () => {
    if (props.plant.alarms.length === 0) {
      return <p className="text-center">You haven't added any alarms yet</p>;
    }
    return <AlarmsCardsList plant={props.plant} />;
  };

  const checkforNotes = () => {
    if (props.plant.notes.length === 0) {
      return <p className="text-center">You haven't added any notes yet</p>;
    }
    return <NoteCardsList plant={props.plant} />;
  };

  if (!props.userLoggedIn.jwt) {
    return <Redirect to="/login" />;
  }

  if (!props.plant.id) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 col-sm-12">
          <PlantDetails plant={props.plant} />
        </div>
        <div className="col-md-4 col-sm-12">
          <div className="card shadow-sm">
            <div className="card-header">
              Alarms{" "}
              <button
                className="btn"
                onClick={() => {
                  onClickAskUserPermissionAndSubscribe(props.userLoggedIn);
                  toggleAForm();
                }}
              >
                New Alarm{" "}
              </button>
              {toggleAlarmForm && <CreateAlarmFormContainer />}
            </div>
            {checkforAlarms()}
          </div>
        </div>
        <div className="col-md-4 col-sm-12 ">
          <div className="card shadow-sm">
            <div className="card-header">
              Notes{" "}
              <button className="btn" onClick={toggleNForm}>
                {" "}
                New note
              </button>
              {toggleNoteForm && (
                <CreateNoteFormContainer plant={props.plant} />
              )}
            </div>
            {checkforNotes()}
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userLoggedIn: state.user.loginInfo,
    plant: state.plants.current
  };
}
const mapDispatchToProps = {
  getCurrentPlant
};

export default connect(mapStateToProps, mapDispatchToProps)(PlantDetailsPage);
