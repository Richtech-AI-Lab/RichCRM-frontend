import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { CREATE_TAG_REQUEST, CREATE_TASK_REQUEST, FINISH_ALL_TASK_FAILURE, FINISH_ALL_TASK_REQUEST, GET_TASK_REQUEST, UPDATE_STATUS_TASK_REQUEST } from '../type';
import { API_ENDPOINTS } from '../../constants/api';
import { createTaskFailure, createTaskSuccess, finishAllTaskFailure, finishAllTaskSuccess, updateTaskStatusFailure, updateTaskStatusSuccess } from '../actions/taskActions';
import { getRequest, postRequest } from '../../axios/interceptor';
import { all } from 'redux-saga/effects';
import { STAGESNAMES } from '../../constants/constants';
import { handleError } from '../../utils/eventHandler';
import { createTagFailure, createTagSuccess } from '../actions/tagActions';

function* createtagSaga(action) {
  const { payload } = action;
  try {
    const response = yield call(() => postRequest(API_ENDPOINTS.CREATE_TAG, payload));
    yield put(createTagSuccess(response?.data?.data[0]));
  } catch (error) {
    handleError(error)
    yield put(createTagFailure(error.response?.data || error));
  }
}

function* updateStatusTaskSaga(action) {
  const { payload } = action;
  // console.log(payload,"______")
  try {
    const response = yield call(() => postRequest(API_ENDPOINTS.UPDATE_TASK, payload?.taskData));
    const data = {
      stageName:payload.currentStep,
      taskData: {
        ...response.data.data[0],
        taskId:payload?.taskData.taskId
      },
    };
    yield put(updateTaskStatusSuccess(data));
  } catch (error) {
    handleError(error)
    yield put(updateTaskStatusFailure(error.response?.data || error));
  }
}
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
function* finishAllTaskSaga(action) {
  const { payload } = action;
  // console.log(payload,"______")
  try {
    const taskListRes = yield all(
      payload?.taskData?.map(taskData=>
        call(postRequest, API_ENDPOINTS.UPDATE_TASK, taskData)
      )
    );
    const listIds = taskListRes?.map(res => res.data.data[0]);
    const data = {
      finishStageNo:payload?.currentStep,
      finishTaskData: listIds,
    };
    yield put(finishAllTaskSuccess(data));
  } catch (error) {
    handleError(error)
    yield put(finishAllTaskFailure(error.response?.data || error));
  }
}

export function* tagSaga() {
  yield takeLatest(CREATE_TAG_REQUEST, createtagSaga);
  // yield takeLatest(GET_TASK_REQUEST, getAllTaskSaga);
  // yield takeLatest(UPDATE_STATUS_TASK_REQUEST, updateStatusTaskSaga);
  // yield takeLatest(FINISH_ALL_TASK_REQUEST, finishAllTaskSaga);
}