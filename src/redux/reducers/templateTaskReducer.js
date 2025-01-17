import { STAGESNAMES } from "../../constants/constants";
import { CLEAR_TASK_DATA, CREATE_TASK_FAILURE, CREATE_TASK_REQUEST, CREATE_TASK_SUCCESS, FINISH_ALL_TASK_FAILURE, FINISH_ALL_TASK_REQUEST, FINISH_ALL_TASK_SUCCESS, UPDATE_STATUS_TASK_SUCCESS } from "../type";

const initialState = {
  loading: false,
  data: {},
  error: null,
};

const templateTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK_REQUEST:
      return { ...state, loading: false, error: null };
    default:
      return state;
  }
};

export default templateTaskReducer;
