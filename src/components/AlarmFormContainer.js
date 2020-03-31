import React, { useState } from "react";
import AlarmForm from "./AlarmForm";
import {newAlarm} from "../store/actions/plants"
import {connect} from "react-redux"

function AlarmFormContainer(props) {
  const [alarm, setAlarm] = useState({
    name: "",
    hourInMinuts: ""
  });

  const [dayOfTheWeek, setDayOfTheWeek] = useState({
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false
  });

  const onSubmit = event => {
    event.preventDefault();
    const days = Object.values(dayOfTheWeek).map((value, index) =>
      value ? index : null
    );
    props.newAlarm(alarm.name, alarm.hourInMinuts, days);
  };

  const onChange = event => {
    setAlarm({
      ...alarm,
      [event.target.name]: event.target.value
    });
    console.log(alarm);
  };

  const dayOnChange = event => {
    setDayOfTheWeek({
      ...dayOfTheWeek,
      [event.target.name]: event.target.checked
    });
    console.log();
  };

  return (
    <div className="form ">
      <div className="card shadow-sm">
        <AlarmForm
          onSubmit={onSubmit}
          onChange={onChange}
          dayOnChange={dayOnChange}
          values={alarm}
        />
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return { plant: state.plants.current };
}

const mapDispatchToProps = { newAlarm };

export default connect(mapStateToProps,mapDispatchToProps)(AlarmFormContainer);
