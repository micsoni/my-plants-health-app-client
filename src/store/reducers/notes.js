const initialState = null;

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case "LOGGED_USER_NOTES": {
      return action.payload
    }
    default:
      return state;
  }
}
