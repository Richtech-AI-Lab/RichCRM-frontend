import { call, put, takeLatest } from "redux-saga/effects";
import { API_ENDPOINTS } from "../../constants/api";
import {
  fetchAdditionalClientByIdsFailure,
  fetchAdditionalClientByIdsSuccess,
  fetchClientByIdFailure,
  fetchClientByIdSuccess,
  registerClientFailure,
  registerClientSuccess,
  updateClientByIdFailure,
  updateClientByIdSuccess,
} from "../actions/clientActions";
import { FETCH_ADDITIONAL_CLIENTS_BY_IDS_REQUEST, FETCH_CLIENT_BY_ID_REQUEST, FETCH_CLIENTS_BY_IDS_REQUEST, REGISTER_CLIENT_REQUEST, UPDATE_CLIENT_BY_ID_REQUEST } from "../type";
import { getRequest, postRequest } from "../../axios/interceptor";
import { toast } from "react-toastify";
import { registerAddressRequest } from "../actions/utilsActions";
import { handleError } from "../../utils/eventHandler";
import { update } from "lodash";
import { all } from "redux-saga/effects";

function* registerClient(action) {
  try {
    const { payload, navigate } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.REGISTER_CLIENT, payload.clientDetails)
    );
    const clientListRes = yield all(
      payload.clientList?.map(clientDetails =>
        call(postRequest, API_ENDPOINTS.REGISTER_CLIENT, clientDetails)
      )
    );
    const clientIds = clientListRes.map(res => res.data.data[0].clientId);
    // console.log(clientIds,"______")
    
    yield put(registerClientSuccess(response.data));
    if(response.status ==200){
      const updatedPayload = {
        ...payload,
        casePayload: {
          ...payload.casePayload,
          additionalClients: clientIds,
          clientId: response.data?.data[0]?.clientId,
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
function* fetchClientsByIds(action) {
  try {
    const clientIds  = action.payload;

    const clientResponses = yield all(
      clientIds.map(clientId =>
        call(getRequest, `${API_ENDPOINTS.FETCH_CLIENT_BY_ID}/${clientId}`)
      )
    );

    // Map over responses to extract the relevant data
    const clients = clientResponses.map(response => response?.data?.data[0]);
    // Dispatch success with merged client data
    yield put(fetchAdditionalClientByIdsSuccess(clients));

  } catch (error) {
    handleError(error);
    yield put(fetchAdditionalClientByIdsFailure(error.response?.data || error));
  }
}
export function* clientSaga() {
  yield takeLatest(REGISTER_CLIENT_REQUEST, registerClient);
  yield takeLatest(FETCH_CLIENT_BY_ID_REQUEST, fetchClientById);
  yield takeLatest(UPDATE_CLIENT_BY_ID_REQUEST, updateClientById);
  yield takeLatest(FETCH_ADDITIONAL_CLIENTS_BY_IDS_REQUEST, fetchClientsByIds);

}
