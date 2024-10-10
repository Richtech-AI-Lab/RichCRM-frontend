import {CLEAR_TASK_DATA, CREATE_TASK_FAILURE, CREATE_TASK_REQUEST, CREATE_TASK_SUCCESS, GET_TASK_REQUEST, UPDATE_STATUS_TASK_FAILURE, UPDATE_STATUS_TASK_REQUEST, UPDATE_STATUS_TASK_SUCCESS } from "../type";


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
  type: CLEAR_TASK_DATA
});

export const updateTaskStatusRequest = (taskData) => ({
  type: UPDATE_STATUS_TASK_REQUEST,
  payload: taskData,
});

export const updateTaskStatusSuccess = (response) => ({
  type: UPDATE_STATUS_TASK_SUCCESS,
  payload: response,
});

export const updateTaskStatusFailure = (error) => ({
  type: UPDATE_STATUS_TASK_FAILURE,
  payload: error,
});