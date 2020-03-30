import React, {useState} from 'react'
import AlarmForm from "./AlarmForm"

export default function AlarmFormContainer() {
  const [alarm, setAlarm] = useState({
    name: "",
    sunday:false,
    monday: false,
    tuesday: false,
    wednesday:false,
    thursday:false,
    friday:false,
    saturday:false,
    hourInMinuts: ""

  });

  const onSubmit = event => {
    event.preventDefault();
    //props.login(user.email, user.password);
  };

  const onChange = event => {
    setAlarm({
      ...alarm,
      [event.target.name]: event.target.value
    });
    console.log(alarm)
  };

  const dayOnChange = event => {
    setAlarm({
      ...alarm,
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
          />
        </div>
      </div>
    );
  }
