import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { CREATE_TASK_REQUEST, GET_TASK_REQUEST } from '../type';
import { API_ENDPOINTS } from '../../constants/api';
import { createTaskFailure, createTaskSuccess } from '../actions/taskActions';
import { getRequest, postRequest } from '../../axios/interceptor';
import { all } from 'redux-saga/effects';
import { STAGESNAMES } from '../../constants/constants';
import { handleError } from '../../utils/eventHandler';

function* createtaskSaga(action) {
  const { payload } = action;
  try {
    const response = yield call(() => postRequest(API_ENDPOINTS.CREATE_TASK, payload));
    yield put(createTaskSuccess(response?.data?.data[0]));
  } catch (error) {
    handleError(error)
    yield put(createTaskFailure(error.response?.data || error));
  }
}

// function* gettaskSaga(action) {
//   const { payload } = action;
//   try {
//     const response = yield call(() => getRequest(`${API_ENDPOINTS.READ_TASK}/${payload?.taskId}`));
//     yield put(createTaskSuccess(response?.data?.data[0]));
//   } catch (error) {
//     yield put(createTaskFailure(error.response?.data || error));
//   }
// }
function* getAllTaskSaga(action) {
  const { currentStageData, currentStep } = action.payload;
  // console.log(currentStageData, currentStep,"currentStageData, currentStep")
  try {
    const results = yield all(currentStageData?.map(taskId =>
      call(fetchDataForStage, taskId)
    ));
    const responses = yield all(results);
    const data = {
      currentStep,
      taskRes: responses.map(response => response.data.data[0]),
    };

    yield put(createTaskSuccess(data));
  } catch (error) {
    handleError(error)
    yield put(createTaskFailure(error.response?.data || error));
  }
}

function* fetchDataForStage(taskId) {
  // Individual task to fetch data for a specific stage ID
  const response = yield call(() => getRequest(`${API_ENDPOINTS.READ_TASK}/${taskId}`));;
  return response;
}


export function* taskSaga() {
  yield takeLatest(CREATE_TASK_REQUEST, createtaskSaga);
  yield takeLatest(GET_TASK_REQUEST, getAllTaskSaga);
}