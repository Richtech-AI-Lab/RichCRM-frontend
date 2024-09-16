import { CLEAR_DATA, CREATE_TASK_FAILURE, CREATE_TASK_REQUEST, CREATE_TASK_SUCCESS, GET_TASK_REQUEST } from "../type";


export const createTaskRequest = (taskData) => ({
  type: CREATE_TASK_REQUEST,
  payload: taskData,
});

export const createTaskSuccess = (response) => ({
  type: CREATE_TASK_SUCCESS,
  payload: response,
});

export const createTaskFailure = (error) => ({
  type: CREATE_TASK_FAILURE,
  payload: error,
});

export const getTaskRequest = (payload) => ({
  type: GET_TASK_REQUEST,
  payload,
});

export const clearTaskData = () => ({
  type: CLEAR_DATA
});
