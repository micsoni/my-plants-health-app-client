const initialState = { all: {}, current: {} };

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case "LOGGED_USER_PLANTS": {
      return {
        ...state,
        all: action.payload
      };
    }
    case "CURRENT_PLANT": {
      return {
        ...state,
        current: action.payload
      };
    }
    case "CHANGE_PLANT": {
      
      const plantUpdated = {...state.current, name:action.payload.name,
        image:action.payload.image,
        description:action.payload.description}
          return {
            ...state,
            current:plantUpdated
          };
        }
    case "PLANT_DELETE_SUCCESS": {
      const plantId = action.payload;
      const allMinusDeleted = state.plant.all.rows.filter(
        plant => plant.id !== plantId
      );

      const updatedPlants = { ...state.all, rows: allMinusDeleted };
      return {
        ...state,
        all: updatedPlants
      };
    }

    default:
      return state;
  }
}
