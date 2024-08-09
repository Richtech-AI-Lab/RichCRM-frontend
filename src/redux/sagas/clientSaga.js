import { call, put, takeLatest } from "redux-saga/effects";
import { API_ENDPOINTS } from "../../constants/api";
import {
  registerClientFailure,
  registerClientSuccess,
} from "../actions/clientActions";
import { REGISTER_CLIENT_REQUEST } from "../type";
import { postRequest } from "../../axios/interceptor";
import { toast } from "react-toastify";
import { registerAddressRequest } from "../actions/utilsActions";

function* registerClient(action) {
  try {
    const { payload, navigate } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.REGISTER_CLIENT, payload.clientDetails)
    );
    yield put(registerClientSuccess(response.data));
    if(response.status ==200){
      const updatedPayload = {
        ...payload, // Spread the existing payload object
        casePayload: {
          ...payload.casePayload, // Spread the existing premisesPayload object
          ...(payload.casePayload.clientType == 0 
            ? { buyerID: response.data?.data[0]?.clientId } // Replace "buyer_id_value" with actual buyerID
            : { sellerID: response.data?.data[0]?.clientId }) // Add the addressId here
        }
      };
      yield put(registerAddressRequest(updatedPayload,navigate))
      toast.success("Client created successfully");
    }
  } catch (error) {
    yield put(registerClientFailure(error.response?.data || error));
    toast.error("Failed to create case.");
  }
}

export function* clientSaga() {
  yield takeLatest(REGISTER_CLIENT_REQUEST, registerClient);
}
