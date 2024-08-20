import { call, put, takeLatest } from "redux-saga/effects";
import { postRequest } from "../../axios/interceptor";
import { API_ENDPOINTS, ROUTES } from "../../constants/api";
import {
  fetchPremisesByIdFailure,
  fetchPremisesByIdSuccess,
  fetchPremisesByQueryIdFailure,
  fetchPremisesByQueryIdSuccess,
  fetchPremisesFailure,
  fetchPremisesSuccess,
  registerPremisesFailure,
  registerPremisesSuccess,
} from "../actions/premisesActions";
import { FETCH_PREMISES_BY_ID_REQUEST, FETCH_PREMISES_BY_QUERY_ID_FAILURE, FETCH_PREMISES_BY_QUERY_ID_REQUEST, FETCH_PREMISES_BY_QUERY_ID_SUCCESS, FETCH_PREMISES_REQUEST, REGISTER_PREMISES_REQUEST } from "../type";
import { toast } from "react-toastify";
import { caseCreateRequest } from "../actions/caseAction";
import { handleError } from "../../utils/eventHandler";

//Register Premises Saga
function* registerPremises(action) {
  try {
    const { payload,navigate } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.REGISTER_PREMISES, payload.premisesPayload)
    );
    yield put(registerPremisesSuccess(response.data));
    if(response.status==200){
      const updatedPayload = {
        ...payload, 
        casePayload: {
          ...payload.casePayload, 
          premisesId: response.data?.data[0]?.premisesId,
        }
      };
      toast.success("Premises successfully registered!");
      // navigate(ROUTES.NEW_CASE_INFO);
      yield put(caseCreateRequest(updatedPayload, navigate));
    }
  } catch (error) {
    handleError(error)
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
    handleError(error)
    yield put(fetchPremisesFailure(error.response?.data || error));
  }
}


function* fetchPremisesById(action) {
  try {
    const { premisesId } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.FETCH_PREMISES_BY_ID, premisesId)
    );
    yield put(fetchPremisesByIdSuccess(response.data));
  } catch (error) {
    handleError(error)
    yield put(fetchPremisesByIdFailure(error.response?.data || error));
  }
}

function* fetchPremisesByQueryId(action) {
  try {
    const { premisesId } = action.payload;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.FETCH_PREMISES_BY_QUERY_ID,premisesId)
    );
    yield put(fetchPremisesByQueryIdSuccess(response.data));
  } catch (error) {
    yield put(fetchPremisesByQueryIdFailure(error.response?.data || error));
  }
}

export function* premisesSaga() {
  yield takeLatest(REGISTER_PREMISES_REQUEST, registerPremises);
  yield takeLatest(FETCH_PREMISES_REQUEST, fetchPremises);
  yield takeLatest(FETCH_PREMISES_BY_ID_REQUEST, fetchPremisesById);
  yield takeLatest(FETCH_PREMISES_BY_QUERY_ID_REQUEST, fetchPremisesByQueryId);
}

