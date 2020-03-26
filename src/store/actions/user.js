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
