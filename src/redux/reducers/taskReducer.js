import { STAGESNAMES } from "../../constants/constants";
import { CREATE_TASK_FAILURE, CREATE_TASK_REQUEST, CREATE_TASK_SUCCESS } from "../type";

const initialState = {
  loading: false,
  data: {},
  error: null,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_TASK_SUCCESS:
      const { currentStep,taskRes } = action.payload;
      return { ...state, loading: false, data: {
        ...state.data,
        [STAGESNAMES[currentStep]]: taskRes,
      } };
    case CREATE_TASK_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default taskReducer;