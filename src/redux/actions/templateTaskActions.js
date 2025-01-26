import { CREATE_TEM_TASK_FAILURE, CREATE_TEM_TASK_REQUEST, CREATE_TEM_TASK_SUCCESS, GET_TEM_BY_TASK_FAILURE, GET_TEM_BY_TASK_REQUEST, GET_TEM_BY_TASK_SUCCESS, INITIALIZE_TEM_TASK_FAILURE, INITIALIZE_TEM_TASK_REQUEST, INITIALIZE_TEM_TASK_SUCCESS } from "../type";


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

export const initializeTemTaskRequest = (temTaskData) => ({
  type: INITIALIZE_TEM_TASK_REQUEST,
  payload: temTaskData,
});

export const initializeTemTaskSuccess = (response) => ({
  type: INITIALIZE_TEM_TASK_SUCCESS,
  payload: response,
});

export const initializeTemTaskFailure = (error) => ({
  type: INITIALIZE_TEM_TASK_FAILURE,
  payload: error,
});

export const getTemplateByTaskRequest = (taskArr) => ({
  type: GET_TEM_BY_TASK_REQUEST,
  payload: taskArr,
});

export const getTemplateByTaskSuccess = (response) => ({
  type: GET_TEM_BY_TASK_SUCCESS,
  payload: response,
});

export const getTemplateByTaskFailure = (error) => ({
  type: GET_TEM_BY_TASK_FAILURE,
  payload: error,
});
