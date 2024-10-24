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
import { FETCH_ADDITIONAL_CLIENTS_BY_IDS_REQUEST, FETCH_CLIENT_BY_ID_REQUEST, FETCH_CLIENTS_BY_IDS_REQUEST, REGISTER_CLIENT_REQUEST, REGISTER_TENANT_REQUEST, UPDATE_CLIENT_BY_ID_REQUEST } from "../type";
import { getRequest, postRequest } from "../../axios/interceptor";
import { toast } from "react-toastify";
import { createAddressRequest, registerAddressRequest } from "../actions/utilsActions";
import { handleError } from "../../utils/eventHandler";
import { update } from "lodash";
import { all } from "redux-saga/effects";
import { updatePremisesRequest } from "../actions/premisesActions";

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
    if (response.status == 200) {
      const updatedPayload = {
        ...payload,
        casePayload: {
          ...payload.casePayload,
          additionalClients: clientIds,
          clientId: response.data?.data[0]?.clientId,
        }
      };
      yield put(registerAddressRequest(updatedPayload, navigate))
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
    const clientResponse = yield call(() =>
      getRequest(`${API_ENDPOINTS.FETCH_CLIENT_BY_ID}/${clientId}`)
    );
    if (clientResponse.status == 200 && clientResponse?.data?.data[0]?.addressId) {
      let payload = {
        addressId: clientResponse?.data?.data[0]?.addressId,
        // addressId: 'Virginia Beach VA 23462-3012',
      }
      const addResponse = yield call(() => postRequest(API_ENDPOINTS.FETCH_ADDRESS_BY_QUERY_ID, payload));
      clientResponse.data.data[0] = { ...clientResponse?.data?.data[0], ...addResponse?.data?.data[0] };
    }
    yield put(fetchClientByIdSuccess(clientResponse.data));
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
    if(response.status == 200){
      if(response?.data?.data[0]?.addressId && payload.util) {
          // let payload = {
          //   addressId: response?.data?.data[0]?.addressId,
          //   // addressId: 'Virginia Beach VA 23462-3012',
          // }
          // const addResponse = yield call(() => postRequest(API_ENDPOINTS.FETCH_ADDRESS_BY_QUERY_ID, payload));
          response.data.data[0] = { ...response?.data?.data[0], ...payload.util};
        }
        yield put(updateClientByIdSuccess(response.data));
        toast.success("Client Updated!");
    }
     
    // if (response.status == 200) {
    //   // const updatedPayload = {
    //   //   ...payload.util,
    //   //   addressId: response.data.data[0].addressId
    //   // };
    //   // yield put(registerAddressRequest(updatedPayload))
    //   toast.success("Client Updated!");
    // }
  } catch (error) {
    handleError(error)
    yield put(updateClientByIdFailure(error.response?.data || error));
  }
}
function* fetchClientsByIds(action) {
  try {
    const clientIds = action.payload;

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

function* registerTenant(action) {
  try {
    const { payload } = action;
    const tenantListRes = yield all(
      payload.tenant?.map(tenantDetails =>
        call(postRequest, API_ENDPOINTS.REGISTER_CLIENT, tenantDetails)
      )
    );
    const clientData = tenantListRes.map(res => res.data.data[0]);
    // console.log(clientData);
    
    if (clientData.length > 0) {
      let updatedPayload = {
        ...payload,
        tenant: [
          ...clientData
        ],
        premises: {
          ...payload.premises,
          ...(clientData.length >= 1  && payload.premises.isTwoFamily == 0 && { twoFamilyFirstFloorTenantId:clientData[0]?.clientId }),
          ...(clientData.length === 2 && payload.premises.isTwoFamily == 1 && { twoFamilySecondFloorTenantId:clientData[1]?.clientId })
        },
      };
      // console.log(updatedPayload, "cliue");
      yield put(createAddressRequest(updatedPayload));
    }
    
    toast.success("Tenant updated successfully");
  } catch (error) {
    handleError(error)
    yield put(registerClientFailure(error.response?.data || error));
  }
}

export function* clientSaga() {
  yield takeLatest(REGISTER_CLIENT_REQUEST, registerClient);
  yield takeLatest(FETCH_CLIENT_BY_ID_REQUEST, fetchClientById);
  yield takeLatest(UPDATE_CLIENT_BY_ID_REQUEST, updateClientById);
  yield takeLatest(FETCH_ADDITIONAL_CLIENTS_BY_IDS_REQUEST, fetchClientsByIds);
  yield takeLatest(REGISTER_TENANT_REQUEST, registerTenant);

}
