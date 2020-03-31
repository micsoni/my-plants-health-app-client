import request from "superagent";

const baseUrl = "http://localhost:4000";

//thunk action to create plant **it doesn't send a action to the store

export function createPlant(data) {
  return async function(dispatch, getState) {
    const state = getState();
    const { user } = state;
    if (data.image === "") {
      data = { name: data.name };
    }
    console.log(data);
    try {
      const response = await request
        .post(`${baseUrl}/plant`)
        .set("Authorization", `Bearer ${user.loginInfo.jwt}`)
        .send(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
}

//get Logged User Plants
function userPlants(userPlants) {
  return {
    type: "LOGGED_USER_PLANTS",
    payload: userPlants
  };
}

export function getUserPlants() {
  return async function(dispatch, getState) {
    const state = getState();
    const { user } = state;
    try {
      const response = await request
        .get(`${baseUrl}/plant`)
        .set("Authorization", `Bearer ${user.loginInfo.jwt}`);
      const plants = response.body;

      const action = userPlants(plants);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
}


function currentPlant(PlantDetails) {
  return {
    type: "CURRENT_PLANT",
    payload: PlantDetails
  };
}

export function getCurrentPlant(plantId) {
  return async function(dispatch, getState) {
    const state = getState();
    const { user } = state;
    try {
      const response = await request
        .get(`${baseUrl}/plant/${plantId}`)
        .set("Authorization", `Bearer ${user.loginInfo.jwt}`);
      const plants = response.body;

      const action = currentPlant(plants);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
}

//thunk action to create alarm **it doesn't send a action to the store

export function newAlarm(name, time, dayOfTheWeek) {
  return async function(dispatch, getState) {
    const state = getState();
    const { user } = state;
    const {plants} = state;
     const alarm = {name, time, dayOfTheWeek, plantId: plants.current.id}
    try {
      const response = await request
        .post(`${baseUrl}/alarm`)
        .set("Authorization", `Bearer ${user.loginInfo.jwt}`)
        .send(alarm);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
}

// action to update plant
function updatePlant(newPlant) {
  return {
    type: "CHANGE_PLANT",
    payload: newPlant
  };
}

export function editPlant(id, update) {
  return async function(dispatch, getState) {
    const state = getState();
    const { user } = state;
    try {
      const response = await request
        .put(`${baseUrl}/plant/${id}`)
        .set("Authorization", `Bearer ${user.loginInfo.jwt}`)
        .send(update);

      const action = updatePlant(response.body);

      dispatch(action);
    } catch (error) {
      console.log(error)
    }
  };
}

// action to delete plant
function destroyPlant(plantId) {
  return {
    type: "PLANT_DELETE_SUCCESS",
    payload: plantId
  };
}

export function deletePlant(id) {
  return async function(dispatch, getState) {
    const state = getState();
    const { user } = state;

    try {
      await request
        .delete(`${baseUrl}/plant/${id}`)
        .set("Authorization", `Bearer ${user.loginInfo.jwt}`);

      const action = destroyPlant(id);

      dispatch(action);
    } catch (error) {
      console.log(error)
    }
  };
}
