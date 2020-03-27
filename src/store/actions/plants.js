import request from "superagent";

const baseUrl = "http://localhost:4000";

//action to create new event
function newPlant(plantData) {
  return {
    type: "NEW_PLANT",
    payload: plantData
  };
}

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

      const action = newPlant(response.body);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
}
