import { call, put, takeLatest } from 'redux-saga/effects';
import { CREATE_TEM_TASK_REQUEST, GET_TEM_BY_TASK_REQUEST, INITIALIZE_TEM_TASK_REQUEST } from '../type';
import { API_ENDPOINTS } from '../../constants/api';
import { postRequest } from '../../axios/interceptor';
import { handleError } from '../../utils/eventHandler';
import { toast } from 'react-toastify';
import { createTaskRequest } from '../actions/taskActions';

function* createTemplateTaskSaga(action) {
  const { payload } = action;
  try {
    const response = yield call(() => postRequest(API_ENDPOINTS.CREATE_TEM_TASK, payload?.temptaskPayload));
    if (response.status == 200) {
      toast.success(`Task Template Id - ${response?.data?.data[0]?.ttid}`);
      yield put(createTaskRequest(
        { ...payload?.taskPayload,
          ttid: response?.data?.data[0]?.ttid
         }
        , payload?.taskArr));
    }
  } catch (error) {
    handleError(error)
  }
}

function* initializeTemplateTaskSaga(action) {
  const { payload } = action;
  try {
    const response = yield call(() => postRequest(API_ENDPOINTS.INITIAL_TEM_TASK, payload));
    if (response.status == 200) {
      toast.success(`Task Template Id - ${response?.data?.data[0]?.ttid}`);
    }
  } catch (error) {
    handleError(error)
  }
}

// this function is get current task id and the prev ttid and next ttid

function* getTemplateTaskSaga(action) {
  const { payload } = action;
  let getPayload = {
    ttid: payload.taskId
  }
  try {
    const templateResponse = yield call(() => postRequest(API_ENDPOINTS.GET_TEM_TASK, getPayload));
    if (templateResponse.status == 200) {
      const responsePaylaod = {
        ...templateResponse?.data?.data[0],
        prevTtid: payload?.prevId,
        nextTtid: payload?.nextId
      };
      const UpdatedResponse = yield call(() => postRequest(API_ENDPOINTS.UPDATE_TEM_TASK, responsePaylaod));
      // toast.success(``);
    }
  } catch (error) {
    handleError(error)
  }
}

export function* templateTaskSaga() {
  yield takeLatest(CREATE_TEM_TASK_REQUEST, createTemplateTaskSaga);
  yield takeLatest(INITIALIZE_TEM_TASK_REQUEST, initializeTemplateTaskSaga);
  yield takeLatest(GET_TEM_BY_TASK_REQUEST, getTemplateTaskSaga);
}