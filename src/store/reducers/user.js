const initialState = { loginInfo: "", plants: "" };

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
    case "LOGGED_USER_PLANTS": {
      return {
        ...state,
        plants: action.payload
      };
    }
    default:
      return state;
  }
}
