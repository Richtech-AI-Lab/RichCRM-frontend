import { call, put, takeLatest } from "redux-saga/effects";
import { API_ENDPOINTS } from "../../constants/api";
import {
  fetchClientByIdFailure,
  fetchClientByIdSuccess,
  registerClientFailure,
  registerClientSuccess,
  updateClientByIdFailure,
  updateClientByIdSuccess,
} from "../actions/clientActions";
import { FETCH_CLIENT_BY_ID_REQUEST, REGISTER_CLIENT_REQUEST, UPDATE_CLIENT_BY_ID_REQUEST } from "../type";
import { getRequest, postRequest } from "../../axios/interceptor";
import { toast } from "react-toastify";
import { registerAddressRequest } from "../actions/utilsActions";
import { handleError } from "../../utils/eventHandler";
import { update } from "lodash";

function* registerClient(action) {
  try {
    const { payload, navigate } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.REGISTER_CLIENT, payload.clientDetails)
    );
    yield put(registerClientSuccess(response.data));
    if(response.status ==200){
      const updatedPayload = {
        ...payload,
        casePayload: {
          ...payload.casePayload,
          ...(payload.casePayload.caseType == 0 
            ? { buyerId: response.data?.data[0]?.clientId } 
            : { sellerId: response.data?.data[0]?.clientId })
        }
      };
      yield put(registerAddressRequest(updatedPayload,navigate))
      toast.success("Client created successfully");
    }
  } catch (error) {
    handleError(error)
    yield put(registerClientFailure(error.response?.data || error));
  }
}

function* fetchClientById(action) {
  try {
    const { clientId } = action.payload;
    const response = yield call(() =>
      getRequest(`${API_ENDPOINTS.FETCH_CLIENT_BY_ID}/${clientId}`)
    );
    yield put(fetchClientByIdSuccess(response.data));
  } catch (error) {
    handleError(error)
    yield put(fetchClientByIdFailure(error.response.data || error));
  }
}

function* updateClientById(action) {
  try {
    const { payload } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.UPDATE_CLIENT, payload?.client)
    );
    // console.log(payload?.client,"____")
    yield put(updateClientByIdSuccess(response.data));
    if(response.status ==200){
      const updatedPayload = {
        ...payload.util,
        addressId: response.data.data[0].addressId
      };
      // yield put(registerAddressRequest(updatedPayload))
      toast.success("Client Updated!");
    }
  } catch (error) {
    handleError(error)
    yield put(updateClientByIdFailure(error.response?.data || error));
  }
}

export function* clientSaga() {
  yield takeLatest(REGISTER_CLIENT_REQUEST, registerClient);
  yield takeLatest(FETCH_CLIENT_BY_ID_REQUEST, fetchClientById);
  yield takeLatest(UPDATE_CLIENT_BY_ID_REQUEST, updateClientById);
}
