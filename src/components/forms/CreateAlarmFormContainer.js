import React, { useState } from "react";
import AlarmForm from "./AlarmForm";
import { newAlarm } from "../../store/actions/alarms";
import { connect } from "react-redux";

function AlarmFormContainer(props) {
  const [alarm, setAlarm] = useState({
    name: "",
    time: ""
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

    const time = alarm.time
      .split(":")
      .map((string, index) => {
        const timeInNumbers =
          index === 0 ? parseInt(string) * 60 : parseInt(string);
        return timeInNumbers;
      })
      .reduce((acc, minutes) => acc + minutes, 0);

    const days = Object.values(dayOfTheWeek).map((value, index) =>
      value ? index : null
    );
    props.newAlarm(alarm.name, time, days).then(props.onAdd);
  };

  const onChange = event => {
    setAlarm({
      ...alarm,
      [event.target.name]: event.target.value
    });
  };

  const dayOnChange = event => {
    setDayOfTheWeek({
      ...dayOfTheWeek,
      [event.target.name]: event.target.checked
    });
  };

  return (
    <div className="form ">
      <div className="card shadow-sm">
        <AlarmForm
          onSubmit={onSubmit}
          onChange={onChange}
          dayOnChange={dayOnChange}
          values={alarm}
          button={"create new alarm"}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { plant: state.plants.current };
}

const mapDispatchToProps = { newAlarm };

export default connect(mapStateToProps, mapDispatchToProps)(AlarmFormContainer);
