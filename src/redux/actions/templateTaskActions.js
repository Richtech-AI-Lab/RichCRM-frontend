import { CREATE_TEM_TASK_FAILURE, CREATE_TEM_TASK_REQUEST, CREATE_TEM_TASK_SUCCESS } from "../type";


export const createTemTaskRequest = (temTaskData) => ({
  type: CREATE_TEM_TASK_REQUEST,
  payload: temTaskData,
});

export const createTemTaskSuccess = (response) => ({
  type: CREATE_TEM_TASK_SUCCESS,
  payload: response,
});

export const createTemTaskFailure = (error) => ({
  type: CREATE_TEM_TASK_FAILURE,
  payload: error,
});
