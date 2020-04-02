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
      const plantUpdated = {
        ...state.current,
        name: action.payload.name,
        image: action.payload.image,
        description: action.payload.description
      };
      return {
        ...state,
        current: plantUpdated
      };
    }
    case "PLANT_DELETE_SUCCESS": {
      const plantId = action.payload;
      const allMinusDeleted = state.all.rows.filter(
        plant => plant.id !== plantId
      );

      const updatedPlants = { ...state.all, rows: allMinusDeleted };
      return {
        ...state,
        all: updatedPlants
      };
    }
    case "CHANGE_NOTE": {
      const updatedNotes = state.current.notes.map(note => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });
      const plantUpdated = { ...state.current, notes: updatedNotes };
      return {
        ...state,
        current: plantUpdated
      };
    }
    case "NOTE_DELETE_SUCCESS": {
      const noteId = action.payload;
      const allMinusDeleted = state.current.notes.filter(
        note => note.id !== noteId
      );

      const updatedNotes = { ...state.current, notes: allMinusDeleted };
      return {
        ...state,
        current: updatedNotes
      };
    }
    case "ADD_NOTE": {
      const allNotes = [...state.current.notes].concat(action.payload);
      const completePlant = { ...state.current, notes: allNotes };
      return {
        ...state,
        current: completePlant
      };
    }
    case "ALARM_DELETE_SUCCESS": {
      const alarmId = action.payload;
      const allMinusDeleted = state.current.alarms.filter(
        alarm => alarm.id !== alarmId
      );

      const updatedAlarms = { ...state.current, alarms: allMinusDeleted };
      return {
        ...state,
        current: updatedAlarms
      };
    }
    case "CHANGE_ALARM": {
      const updateAlarms = state.current.alarms.map(alarm => {
        if (alarm.id === action.payload.id) {
          return action.payload;
        }
        return alarm;
      });
      const plantUpdated = { ...state.current, alarms: updateAlarms };
      return {
        ...state,
        current: plantUpdated
      };
    }
    case "ADD_ALARM": {
      const allAlarms = [...state.current.alarms].concat(action.payload);
      const completePlant = { ...state.current, alarms: allAlarms };
      return {
        ...state,
        current: completePlant
      };
    }
    default:
      return state;
  }
}
