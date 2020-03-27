const initialState = { all: [], current: {} };

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case "NEW_PLANT": {
      const updatedPlants = { ...state.all.concat(action.payload) };
      return {
        ...state,
        all: updatedPlants
      };
    }
    default:
      return state;
  }
}
