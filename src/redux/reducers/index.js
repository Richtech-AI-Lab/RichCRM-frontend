import { combineReducers } from "redux";
import authReducer from "./authReducer";
import caseReducer from "./caseReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  case: caseReducer
});

export default rootReducer;
