import React, { useState } from "react";
import { connect } from "react-redux";
import AlarmCard from "./AlarmCard";
import EditAlarmFormContainer from "../forms/EditAlarmFormContainer";

function AlarmsCardsList(props) {
  const [alarmsInEdit, setAlarmsInEdit] = useState([]);

  const toggleAlarmForm = alarm => {
    const newState = alarmsInEdit.includes(alarm.id)
      ? alarmsInEdit.filter(id => id !== alarm.id)
      : alarmsInEdit.concat(alarm.id);

    setAlarmsInEdit(newState);
  };

  return props.plant.alarms.map(alarm => {
    const showForm = alarmsInEdit.includes(alarm.id);
    return (
      <div className="card" key={alarm.id}>
        <AlarmCard
          type={"details page"}
          plant={props.plant}
          alarm={alarm}
          toggleAlarmForm={() => toggleAlarmForm(alarm)}
        />
        <div>
          {showForm && (
            <EditAlarmFormContainer
              onEdit={() => toggleAlarmForm(alarm)}
              plant={props.plant}
              alarm={alarm}
            />
          )}
        </div>
      </div>
    );
  });
}

function mapStateToProps(state) {
  return {
    plant: state.plants.current
  };
}

export default connect(mapStateToProps)(AlarmsCardsList);
