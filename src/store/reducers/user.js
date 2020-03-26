const initialState = { loginInfo: "" };

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
    default:
      return state;
  }
}
