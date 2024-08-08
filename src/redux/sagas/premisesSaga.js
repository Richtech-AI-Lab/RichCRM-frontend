import { call, put, takeLatest } from "redux-saga/effects";
import { postRequest } from "../../axios/interceptor";
import { API_ENDPOINTS, ROUTES } from "../../constants/api";
import {
  fetchPremisesFailure,
  fetchPremisesSuccess,
  registerPremisesFailure,
  registerPremisesSuccess,
} from "../actions/premisesActions";
import { FETCH_PREMISES_REQUEST, REGISTER_PREMISES_REQUEST } from "../type";
import { toast } from "react-toastify";

//Register Premises Saga
function* registerPremises(action) {
  try {
    const { payload,navigate } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.REGISTER_PREMISES, payload)
    );
    yield put(registerPremisesSuccess(response.data));
    if(response.status==200){
      toast.success("Premises successfully registered!");
      navigate(ROUTES.NEW_CASE_INFO);
    }
  } catch (error) {
    yield put(registerPremisesFailure(error.response?.data || error));
    toast.error("Failed to register premises.");
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

export function* premisesSaga() {
  yield takeLatest(REGISTER_PREMISES_REQUEST, registerPremises);
  yield takeLatest(FETCH_PREMISES_REQUEST, fetchPremises);
}

