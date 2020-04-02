import { getStateFromCookies } from "redux-cookies-middleware";

const paths = {
  "loginInfo.jwt": { name: "jwt" },
  "loginInfo.name": { name: "name" }
};

let initialState = { loginInfo: { jwt: "", name: "" } };
initialState = getStateFromCookies(initialState, paths);

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case "CREATE_USER": {
      return {
        ...state,
        loginInfo: action.payload
      };
    }
    case "LOGGED_IN": {
      return {
        ...state,
        loginInfo: action.payload
      };
    }
    case "LOG_OUT": {
      return {
        loginInfo: action.payload
      };
    }
    default:
      return state;
  }
}
