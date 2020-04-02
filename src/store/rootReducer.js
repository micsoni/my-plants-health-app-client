import { combineReducers } from "redux";
import user from "./reducers/user.js";
import plants from "./reducers/plants.js";
import alarms from "./reducers/alarms.js";
import notes from "./reducers/notes";

export const cookiePath = {
  "user.loginInfo.jwt": { name: "jwt" },
  "user.loginInfo.name": { name: "name" }
};

export default combineReducers({
  user,
  plants,
  alarms,
  notes
});
