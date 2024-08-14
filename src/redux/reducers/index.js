import { combineReducers } from "redux";
import authReducer from "./authReducer";
import caseReducer from "./caseReducer";
import premisesReducer from "./premisesReducer";
import clientReducer from "./clientReducer";
import utilsReducer from "./utilsReducer";
import stageReducer from "./stagesReducer";
import taskReducer from "./taskReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  case: caseReducer,
  premises: premisesReducer,
  client: clientReducer,
  utils: utilsReducer,
  stages:stageReducer,
  task:taskReducer
});

export default rootReducer;
