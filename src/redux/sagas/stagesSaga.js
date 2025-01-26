import { call, put, takeLatest } from 'redux-saga/effects';
import { CREATE_STAGE_REQUEST, GET_STAGE_REQUEST, LINK_TASK_INTO_STAGE_REQUEST, UPDATE_STATUS_STAGE_REQUEST, UPDATE_TASK_ORDER_STAGE_REQUEST } from '../type';
import { API_ENDPOINTS } from '../../constants/api';
import { createStageFailure, createStageSuccess, getStageRequest, LinkTaskStageSuccess, startStageLoading } from '../actions/stagesActions';
import { getRequest, postRequest } from '../../axios/interceptor';
import { handleError } from '../../utils/eventHandler';

function* createStageSaga(action) {
  const { payload } = action;

  try {
    const response = yield call(() => postRequest(API_ENDPOINTS.CREATE_STAGE, payload));
    yield put(createStageSuccess(response?.data?.data[0]));
  } catch (error) {
    handleError(error)
    yield put(createStageFailure(error.response?.data || error));
  }
}

function* getStageSaga(action) {
  yield put(startStageLoading());
  const { payload } = action;
  // console.log(`${API_ENDPOINTS.READ_STAGE}/${payload?.caseId}/${payload?.stageType}`,"payload")
  try {
    const response = yield call(() => getRequest(`${API_ENDPOINTS.READ_STAGE}/${payload?.caseId}/${payload?.stageType}`));
    yield put(createStageSuccess(response?.data?.data[0]));
  } catch (error) {
    handleError(error);
    yield put(createStageFailure(error.response?.data || error));
  }
}
function* updateStatusStageSaga(action) {
  const { payload } = action;
  // console.log(payload,"______")
  try {
    const response = yield call(() => postRequest(API_ENDPOINTS.UPDATE_STAGE, payload));
    // yield put(updateTaskStatusSuccess(data));
  } catch (error) {
    handleError(error)
    // yield put(updateTaskStatusFailure(error.response?.data || error));
  }
}
function* updateTaskOrderStageSaga(action) {
  const { payload } = action;
  try {
    const response = yield call(() => postRequest(API_ENDPOINTS.UPDATE_STAGE, payload));
    let stagePayload = {
      stageType: response?.data?.data[0]?.stageType || 0,
      caseId: localStorage.getItem('c_id'), // we can use response case id 
    }
    yield put(getStageRequest(stagePayload));
    // yield put(updateTaskStatusSuccess(data));
  } catch (error) {
    handleError(error)
    // yield put(updateTaskStatusFailure(error.response?.data || error));
  }
}
function* linkTaskStageSaga(action) {
  const { payload } = action;
  // console.log(payload,"______")
  try {
    const response = yield call(() => postRequest(API_ENDPOINTS.UPDATE_STAGE, payload));
    let stagePayload = {
      stageType: response?.data?.data[0]?.stageType || 0,
      caseId: localStorage.getItem('c_id'), // we can use response case id 
    }
    yield put(getStageRequest(stagePayload));
    // yield put(LinkTaskStageSuccess(response));
  } catch (error) {
    handleError(error)
    // yield put(updateTaskStatusFailure(error.response?.data || error));
  }
}

export function* stagesSaga() {
  yield takeLatest(CREATE_STAGE_REQUEST, createStageSaga);
  yield takeLatest(GET_STAGE_REQUEST, getStageSaga);
  yield takeLatest(UPDATE_STATUS_STAGE_REQUEST, updateStatusStageSaga);
  yield takeLatest(UPDATE_TASK_ORDER_STAGE_REQUEST, updateTaskOrderStageSaga);
  yield takeLatest(LINK_TASK_INTO_STAGE_REQUEST, linkTaskStageSaga);
}