import { call, put, takeLatest } from 'redux-saga/effects';
import { CREATE_TASK_REQUEST, GET_TASK_REQUEST } from '../type';
import { API_ENDPOINTS } from '../../constants/api';
import { createTaskFailure, createTaskSuccess } from '../actions/taskActions';
import { getRequest, postRequest } from '../../axios/interceptor';

function* createtaskSaga(action) {
  const { payload } = action;
  try {
    const response = yield call(() => postRequest(API_ENDPOINTS.CREATE_TASK, payload));
    yield put(createTaskSuccess(response?.data?.data[0]));
  } catch (error) {
    yield put(createTaskFailure(error.response?.data || error));
  }
}

function* gettaskSaga(action) {
  const { payload } = action;
  try {
    const response = yield call(() => getRequest(`${API_ENDPOINTS.READ_TASK}/${payload?.taskId}`));
    yield put(createTaskSuccess(response?.data?.data[0]));
  } catch (error) {
    yield put(createTaskFailure(error.response?.data || error));
  }
}


export function* taskSaga() {
  yield takeLatest(CREATE_TASK_REQUEST, createtaskSaga);
  yield takeLatest(GET_TASK_REQUEST, gettaskSaga);
}