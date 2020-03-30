import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import AlarmFormContainer from "./AlarmFormContainer";
import usePushNotifications from "./Notification/useNotifications";

//import {getCurrentPlant} from "../store/actions/plants"

function PlantDetailsPage(props) {
  const [toggleAlarmForm, setToggleForm] = useState(false);

  const {
    onClickAskUserPermissionAndSubscribe,
  } = usePushNotifications();

  const toggleForm = () => {
    setToggleForm(!toggleAlarmForm);
  };

  useEffect(() => {
    if (props.userLoggedIn.jwt) {
      //props.getCurrentPlant(props.match.params.plantId);
    }
  });

  // const checkforAlarms = () => {
  //   if (props.plants.alarms.length === 0) {
  //     return <p>You haven't added any alarms yet</p>;
  //   }
  //   return (null)
  //    <AlarmsList />

  // };

  if (!props.userLoggedIn.jwt) {
    return <Redirect to="/login" />;
  }

  if (!props.plant) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
           <button
            className="btn"
            onClick={() => {
              onClickAskUserPermissionAndSubscribe();
              toggleForm();
            }}
          >
            {" "}
            New Alarm
          </button>       
          {toggleAlarmForm && <AlarmFormContainer />}
          {/* {checkforAlarms()} */}
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
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PlantDetailsPage);
