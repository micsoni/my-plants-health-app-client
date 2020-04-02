import React, { useState } from "react";
import { connect } from "react-redux";
import AlarmForm from "./AlarmForm";
import { editAlarm } from "../../store/actions/alarms";
import "../../style/Forms.css";

function EditAlarmFormContainer(props) {
  const [alarm, setAlarm] = useState({
    name: props.alarm.name,
    time: props.alarm.time
  });

  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ];

  const dayOfTheWeekB = days.reduce((acc, day, i) => {
    acc[day] = props.alarm.dayOfTheWeek[i] > 0;
    return acc;
  }, {});

  const [dayOfTheWeek, setDayOfTheWeek] = useState(dayOfTheWeekB);

  const onSubmit = event => {
    event.preventDefault();

    const time =
      typeof alarm.time === "number"
        ? alarm.time
        : alarm.time
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
    props
      .editAlarm(props.plant.id, props.alarm.id, {
        name: alarm.name,
        time: time,
        dayOfTheWeek: days
      })
      .then(props.onEdit);
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
        <p className="text-center">Edit information </p>
        <AlarmForm
          onSubmit={onSubmit}
          onChange={onChange}
          dayOnChange={dayOnChange}
          values={{ ...alarm, day: dayOfTheWeek }}
          button={"Update Alarm"}
        />
      </div>
    </div>
  );
}

export default connect(null, { editAlarm })(EditAlarmFormContainer);
