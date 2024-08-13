import { combineReducers } from "redux";
import authReducer from "./authReducer";
import caseReducer from "./caseReducer";
import premisesReducer from "./premisesReducer";
import clientReducer from "./clientReducer";
import utilsReducer from "./utilsReducer";
import stageReducer from "./stagesReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  case: caseReducer,
  premises: premisesReducer,
  client: clientReducer,
  utils: utilsReducer,
  stages:stageReducer
});

export default rootReducer;
