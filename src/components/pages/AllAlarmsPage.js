import React, { useEffect } from "react";
import AlarmCard from "../presentationals/AlarmCard";
import { getUserAlarms } from "../../store/actions/alarms";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "../../style/AllAlarmsPage.css";

function AllAlarmsPage(props) {
  const { getUserAlarms } = props;
  const currentUser = props.userLoggedIn.jwt;

  useEffect(() => {
    if (currentUser) {
      getUserAlarms();
    }
  }, [getUserAlarms, currentUser]);

  if (!props.userLoggedIn.jwt) {
    return <Redirect to="/login" />;
  }

  if (!props.alarms) {
    return <p>Loading...</p>;
  }

  if (props.alarms.length === 0) {
    return <div>You don't have any alarms yet</div>;
  }

  const displayAlarms = props.alarms.map(alarm => {
    return (
      <div className="col-lg-3 col-md-6 col-12">
        <div className="card" key={alarm.id}>
          <AlarmCard plant={alarm.plant} alarm={alarm} />
        </div>
      </div>
    );
  });

  return (
    <div class="container-fluid">
      <div class="row">{displayAlarms}</div>{" "}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userLoggedIn: state.user.loginInfo,
    alarms: state.alarms
  };
}
const mapDispatchToProps = {
  getUserAlarms
};

export default connect(mapStateToProps, mapDispatchToProps)(AllAlarmsPage);
