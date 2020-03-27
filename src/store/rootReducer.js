import { combineReducers } from "redux";
import user from "./reducers/user.js";
import plants from "./reducers/plants.js"

export default combineReducers({
  user,
  plants
});
