import { call, put, takeLatest } from 'redux-saga/effects';
import { CREATE_STAGE_REQUEST, GET_STAGE_REQUEST } from '../type';
import { API_ENDPOINTS } from '../../constants/api';
import { createStageFailure, createStageSuccess } from '../actions/stagesActions';
import { getRequest, postRequest } from '../../axios/interceptor';

function* createStageSaga(action) {
  const { payload } = action;

  try {
    const response = yield call(() => postRequest(API_ENDPOINTS.CREATE_STAGE, payload));
    yield put(createStageSuccess(response?.data?.data[0]));
  } catch (error) {
    yield put(createStageFailure(error.response?.data || error));
  }
}

function* getStageSaga(action) {
  const { payload } = action;
  try {
    const response = yield call(() => getRequest(`${API_ENDPOINTS.READ_STAGE}/${payload?.caseId}/${payload?.stageType}`));
    yield put(createStageSuccess(response?.data?.data[0]));
  } catch (error) {
    yield put(createStageFailure(error.response?.data || error));
  }
}


export function* stagesSaga() {
  yield takeLatest(CREATE_STAGE_REQUEST, createStageSaga);
  yield takeLatest(GET_STAGE_REQUEST, getStageSaga);
}