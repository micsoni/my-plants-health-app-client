import request from "superagent";

const baseUrl = "https://boiling-hamlet-55290.herokuapp.com";

// action to create alarm
function addnewAlarm(newNote) {
  return {
    type: "ADD_ALARM",
    payload: newNote
  };
}

export function newAlarm(name, time, dayOfTheWeek) {
  return async function(dispatch, getState) {
    const state = getState();
    const { user } = state;
    const { plants } = state;
    const alarm = { name, time, dayOfTheWeek, plantId: plants.current.id };
    try {
      const response = await request
        .post(`${baseUrl}/alarm`)
        .set("Authorization", `Bearer ${user.loginInfo.jwt}`)
        .send(alarm);

      const action = addnewAlarm(response.body);

      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
}

// action to delete alarm
function destroyAlarm(alarmId) {
  return {
    type: "ALARM_DELETE_SUCCESS",
    payload: alarmId
  };
}

export function deleteAlarm(plantId, alarmId) {
  return async function(dispatch, getState) {
    const state = getState();
    const { user } = state;

    try {
      await request
        .delete(`${baseUrl}/alarm/${alarmId}`)
        .send({ plantId })
        .set("Authorization", `Bearer ${user.loginInfo.jwt}`);

      const action = destroyAlarm(alarmId);

      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
}

// action to update alarm
function updateAlarm(newAlarm) {
  return {
    type: "CHANGE_ALARM",
    payload: newAlarm
  };
}

export function editAlarm(plantId, alarmId, update) {
  return async function(dispatch, getState) {
    const state = getState();
    const { user } = state;
    update.plantId = plantId;
    try {
      const response = await request
        .put(`${baseUrl}/alarm/${alarmId}`)
        .set("Authorization", `Bearer ${user.loginInfo.jwt}`)
        .send(update);

      const action = updateAlarm(response.body);

      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
}

//get Logged User Alarms
function userAlarms(userAlarms) {
  return {
    type: "LOGGED_USER_ALARMS",
    payload: userAlarms
  };
}

export function getUserAlarms() {
  return async function(dispatch, getState) {
    const state = getState();
    const { user } = state;
    try {
      const response = await request
        .get(`${baseUrl}/alarm`)
        .set("Authorization", `Bearer ${user.loginInfo.jwt}`);
      const alarms = response.body;

      const action = userAlarms(alarms);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
}
