import { combineReducers } from "redux";
import authReducer from "./authReducer";
import premisesReducer from "./premisesReducer";
import clientReducer from "./clientReducer";
import utilsReducer from "./utilsReducer";
import stageReducer from "./stagesReducer";
import taskReducer from "./taskReducer";
import casesReducer from "./caseReducer"
import contactReducer from "./contactReducer";
import organizationReducer from "./organizationReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  case: casesReducer,
  premises: premisesReducer,
  client: clientReducer,
  utils: utilsReducer,
  stages:stageReducer,
  task:taskReducer,
  contact:contactReducer,
  organization: organizationReducer,
});

export default rootReducer;
