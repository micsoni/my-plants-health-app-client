import React from "react";

export default function AlarmForm(props) {
  const daysOfTheWeekForm = () => {
    const daysOfTheWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
    ];

    const daysList = daysOfTheWeek.map(day => {
      return (
        <div className="form-check" key={day}>
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="checkbox"
              name={day}
              onChange={props.dayOnChange}
              checked={props.values.day && props.values.day[day]}
            />
            {day}
          </label>
        </div>
      );
    });
    return daysList;
  };

  return (
    <div className="text-center">
      <form onSubmit={props.onSubmit}>
        <div className="form-group col-12">
          <label className="col-sm-2">Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            onChange={props.onChange}
            value={props.values.name}
          />
        </div>
        <p> Choose the days you want the receive a notification</p>
        {daysOfTheWeekForm()}
        <div className="form-group col-12">
          <label> Choose the time of the day</label>
          <input
            className="form-control"
            type="time"
            name="time"
            onChange={props.onChange}
            value={props.values.time}
          />
        </div>
        <button type="submit" className="btn">
          {props.button}
        </button>
      </form>
    </div>
  );
}
