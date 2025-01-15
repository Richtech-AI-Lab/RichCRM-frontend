import { call, takeLatest } from 'redux-saga/effects';
import { CREATE_TEM_TASK_REQUEST} from '../type';
import { API_ENDPOINTS } from '../../constants/api';
import { postRequest } from '../../axios/interceptor';
import { handleError } from '../../utils/eventHandler';
import { toast } from 'react-toastify';

function* createTemplateTaskSaga(action) {
  const { payload } = action;
  try {
    const response = yield call(() => postRequest(API_ENDPOINTS.CREATE_TEM_TASK, payload));
    if (response.status == 200) {
      toast.success(`Task Template Id - ${response?.data?.data[0]?.ttid}`);
    }
  } catch (error) {
    handleError(error)
  }
}

export function* templateTaskSaga() {
  yield takeLatest(CREATE_TEM_TASK_REQUEST, createTemplateTaskSaga);
}