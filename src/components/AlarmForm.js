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
          <input 
            className="form-check-input"
            type="checkbox"
            name={day}
            onChange={props.dayOnChange}
            checked={props.values.day}
          />
          <label className="form-check-label">{day}</label>
        </div>
      );
    });
    return daysList;
  };

  const timesListForm = () => {
    const hourOfTheDay = [...Array(24)].map((_, i) => i);

    const generateHourRange = hour => [
      { text: `${hour}:00`, value: hour * 60 },
      { text: `${hour}:15`, value: hour * 60 + 15 },
      { text: `${hour}:30`, value: hour * 60 + 30 },
      { text: `${hour}:45`, value: hour * 60 + 45 }
    ];

    const timeOfTheDay = hourOfTheDay.reduce(
      (acc, hour) => acc.concat(generateHourRange(hour)),
      []
    );

    const timesList = timeOfTheDay.map(time => {
      return <option key={Math.random()} value={time.value}>{time.text}</option>;
    });

    return timesList;
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
          <label >
            Choose the time of the day
          </label>
          <select
            name="hourInMinuts"
            onChange={props.onChange}
            className="form-control"
          >
            {timesListForm()}
          </select>
        </div>

        <button type="submit" className="btn">
          create new alarm
        </button>
      </form>
    </div>
  );
}
