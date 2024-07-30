import { combineReducers } from "redux";
import authReducer from "./authReducer";
import caseReducer from "./caseReducer";
import premisesReducer from "./premisesReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  case: caseReducer,
  premises: premisesReducer,
});

export default rootReducer;
