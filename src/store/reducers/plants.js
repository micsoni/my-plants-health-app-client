const initialState = { all: {}, current: {}, sample:"" };

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case "LOGGED_USER_PLANTS": {
      return {
        ...state,
        all: action.payload
      };
    }
    case "USER_PLANTS_SAMPLE": {
      return {
        ...state,
        sample: action.payload
      };
    }
    default:
      return state;
  }
}
