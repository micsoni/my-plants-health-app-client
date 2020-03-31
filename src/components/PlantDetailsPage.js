import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import AlarmFormContainer from "./AlarmFormContainer";
import usePushNotifications from "./Notification/useNotifications";
import {getCurrentPlant} from "../store/actions/plants"
import UserAlarmsCardsList from "./UserAlarmsCardsList"
import PlantDetails from "./PlantDetails"

function PlantDetailsPage(props) {
  const [toggleAlarmForm, setToggleAlarmForm] = useState(false);

  const toggleAForm = () => {
    setToggleAlarmForm(!toggleAlarmForm);
  };
  const {
    onClickAskUserPermissionAndSubscribe,
  } = usePushNotifications();


  const {getCurrentPlant} = props
  const plantId = props.match.params.plantId
  const currentUser = props.userLoggedIn.jwt

  useEffect(() => {
    if (currentUser) {
     getCurrentPlant(plantId);
    }
  }, [getCurrentPlant, plantId, currentUser]);

  const checkforAlarms = () => {
    if (props.plant.alarms.length === 0) {
      return <p>You haven't added any alarms yet</p>;
    }
    return <UserAlarmsCardsList />

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
          <PlantDetails plant={props.plant}/>
          </div>
          <div className="col-md-4 col-sm-12">
           <button
            className="btn"
            onClick={() => {
              onClickAskUserPermissionAndSubscribe(props.userLoggedIn);
              toggleAForm();
            }}
          >{" "}
            New Alarm
          </button>       
          {toggleAlarmForm && <AlarmFormContainer />}
          {checkforAlarms()}
        </div>
        <div className="col-md-4 col-sm-12">
          hello
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
