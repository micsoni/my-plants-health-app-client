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

//get Logged User Plants
function userPlantsSample(userPlants) {
  return {
    type: "USER_PLANTS_SAMPLE",
    payload: userPlants
  };
}

export function getUserPlantsSample() {
  return async function(dispatch, getState) {
    const state = getState();
    const { user } = state;
    try {
      const response = await request
        .get(`${baseUrl}/plant?limit=4&offset=0`)
        .set("Authorization", `Bearer ${user.loginInfo.jwt}`);
      const plants = response.body;

      const action = userPlantsSample(plants);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
}
