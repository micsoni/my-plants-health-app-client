import request from "superagent";

const baseUrl = "http://localhost:4000";

//signup action
function createUser(userName) {
  return {
    type: "CREATE_USER",
    payload: userName
  };
}

export function signup(email, password, username) {
  return async function(dispatch) {
    try {
      const response = await request
        .post(`${baseUrl}/user`)
        .send({ email, password, username });
      const action = createUser(response.body);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
}

//login action
function makeLogin(loginData) {
  return {
    type: "LOGGED_IN",
    payload: loginData
  };
}

export function login(email, password) {
  return async function(dispatch) {
    try {
      const response = await request
        .post(`${baseUrl}/login`)
        .send({ email, password });

      const action = makeLogin(response.body);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
}

//logout action
export function logout() {
  return {
    type: "LOG_OUT",
    payload: ""
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
      const response = await request.get(`${baseUrl}/user/current`)
      .set("Authorization", `Bearer ${user.loginInfo.jwt}`)
      const plants = response.body.plants;

      const action = userPlants(plants);
      dispatch(action);
    } catch (error) {
      console.error(error);
    }
  };
}
