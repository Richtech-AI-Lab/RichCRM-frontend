import { STAGESNAMES } from "../../constants/constants";
import { CLEAR_DATA, CREATE_TASK_FAILURE, CREATE_TASK_REQUEST, CREATE_TASK_SUCCESS, UPDATE_STATUS_TASK_SUCCESS } from "../type";

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
    case UPDATE_STATUS_TASK_SUCCESS:
      const { stageName,taskData } = action.payload;
      return { ...state, loading: false, 
        data: {
        ...state.data,
        [STAGESNAMES[stageName]]: state.data[STAGESNAMES[stageName]].map(task => 
          task.taskId === taskData.taskId 
            ? { ...task, status: taskData.status }
            : task 
        ),
      } };
    case CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};

export default taskReducer;
