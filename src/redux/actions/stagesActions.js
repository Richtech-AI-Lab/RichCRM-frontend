import { CLEAR_STAGE_DATA, CREATE_STAGE_FAILURE, CREATE_STAGE_REQUEST, CREATE_STAGE_SUCCESS, GET_STAGE_REQUEST, LINK_TASK_INTO_STAGE_FAILURE, LINK_TASK_INTO_STAGE_REQUEST, LINK_TASK_INTO_STAGE_SUCCESS, START_LOADING, STOP_LOADING, UPDATE_STATUS_STAGE_REQUEST } from "../type";


export const createStageRequest = (stageData) => ({
  type: CREATE_STAGE_REQUEST,
  payload: stageData,
});

export const createStageSuccess = (response) => ({
  type: CREATE_STAGE_SUCCESS,
  payload: response,
});

export const createStageFailure = (error) => ({
  type: CREATE_STAGE_FAILURE,
  payload: error,
});

export const getStageRequest = (payload) => ({
  type: GET_STAGE_REQUEST,
  payload,
});

export const startStageLoading = () => ({
  type: START_LOADING
});

export const stopStageLoading = () => ({
  type: STOP_LOADING
});

export const clearStageData = () => ({
  type: CLEAR_STAGE_DATA
});

export const updateStageStatusRequest = (stageData) => ({
  type: UPDATE_STATUS_STAGE_REQUEST,
  payload:stageData,
});


export const LinkTaskStageRequest = (stageData) => ({
  type: LINK_TASK_INTO_STAGE_REQUEST,
  payload: stageData,
});

export const LinkTaskStageSuccess = (response) => ({
  type: LINK_TASK_INTO_STAGE_SUCCESS,
  payload: response,
});

export const LinkTaskStageFailure = (error) => ({
  type: LINK_TASK_INTO_STAGE_FAILURE,
  payload: error,
});
