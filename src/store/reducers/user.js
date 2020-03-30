import { defineState } from "redux-localstore";

const defaultState = { loginInfo: "" };

const initialState = defineState(defaultState)("user");

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
        plants: action.payload,
        loginInfo: action.payload
      };
    }
    default:
      return state;
  }
}
