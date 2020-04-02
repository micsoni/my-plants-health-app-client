import React from "react";
import { connect } from "react-redux";
import { deleteAlarm } from "../../store/actions/alarms";
import { Link } from "react-router-dom";

function AlarmCard(props) {
  const onDelete = event => {
    event.preventDefault();
    props.deleteAlarm(props.plant.id, alarm.id);
  };

  const { alarm } = props;

  const changeDayFormat = () => {
    return alarm.dayOfTheWeek.map(day => {
      switch (day) {
        case 0:
          return "Sunday ";
        case 1:
          return "Monday ";
        case 2:
          return "Tuesday ";
        case 3:
          return "Wednesday ";
        case 4:
          return "Thursday ";
        case 5:
          return "Friday ";
        case 6:
          return "Saturday ";
        case null:
          return null;
        default:
          return null;
      }
    });
  };

  const changeHourFormat = () => {
    const number = alarm.time;
    const hours = number / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return rhours + ":" + String(rminutes).padStart(2, "0");
  };

  const containerType = () => {
    if (props.type === "details page") {
      return (
        <div className="text-center col-12">
          <h5 className="">{alarm.name}</h5>
          <p className="text-center">
            {changeDayFormat()} at {changeHourFormat()}
          </p>
          <button className="addFile" onClick={props.toggleAlarmForm}>
            Edit alarm
          </button>{" "}
          <button className="addFile" onClick={onDelete}>
            Delete alarm
          </button>
        </div>
      );
    }
    return (
      <div className="text-center row">
        <div className="col-4">
          <img src={alarm.plant.image} className="thumb" alt="" />
        </div>
        <div className="col-8">
          <h5 className="card-title">{alarm.name} </h5>
          <p className="text-center">
            {changeDayFormat()} at {changeHourFormat()}
          </p>
          <Link
            to={`/plants/${alarm.plant.id}`}
            className="nav-link dropdown-item"
          >
            <button className="addFile"> See {alarm.plant.name}</button>
          </Link>
        </div>
      </div>
    );
  };

  return <div>{containerType()}</div>;
}

export default connect(null, { deleteAlarm })(AlarmCard);
