import { call, put, takeLatest } from "redux-saga/effects";
import { postRequest } from "../../axios/interceptor";
import { API_ENDPOINTS } from "../../constants/api";
import {
  fetchPremisesFailure,
  fetchPremisesSuccess,
  registerPremisesFailure,
  registerPremisesSuccess,
} from "../actions/premisesActions";
import { FETCH_PREMISES_REQUEST, REGISTER_PREMISES_REQUEST } from "../type";

//Register Premises Saga
function* registerPremises(action) {
  try {
    const { payload } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.REGISTER_PREMISES, payload)
    );
    console.log("Register Premises Response:", response);
    yield put(registerPremisesSuccess(response.data));
  } catch (error) {
    yield put(registerPremisesFailure(error.response?.data || error));
  }
}

//Fetch Premises Saga By Address Id
function* fetchPremises(action) {
  try {
    const { payload } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.FETCH_PREMISES_BY_ADDRESS_ID, payload)
    );
    console.log("Premises Response By Address Id:", response);
    yield put(fetchPremisesSuccess(response.data));
  } catch (error) {
    yield put(fetchPremisesFailure(error.response?.data || error));
  }
}

function* premisesSaga() {
  yield takeLatest(REGISTER_PREMISES_REQUEST, registerPremises);
  yield takeLatest(FETCH_PREMISES_REQUEST, fetchPremises);
}

export default premisesSaga;
