import { CREATE_STAGE_FAILURE, CREATE_STAGE_REQUEST, CREATE_STAGE_SUCCESS } from "../type";


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
