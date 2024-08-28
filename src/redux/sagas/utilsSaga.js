import { call, put, takeLatest } from "redux-saga/effects";
import { postRequest } from "../../axios/interceptor";
import { API_ENDPOINTS, ROUTES } from "../../constants/api";
import {
  fetchAddressByIdFailure,
  fetchAddressByIdSuccess,
  registerAddressFailure,
  registerAddressSuccess,
} from "../actions/utilsActions";
import { CREATE_ADDRESS_REQUEST, FETCH_ADDRESS_BY_ID_REQUEST, REGISTER_ADDRESS_REQUEST } from "../type";
import { registerPremisesRequest, updatePremisesRequest } from "../actions/premisesActions";
import { toast } from "react-toastify";
import { handleError } from "../../utils/eventHandler";
import { updateClientByIdRequest } from "../actions/clientActions";
import { updateContactRequest } from "../actions/contactActions";

function* registerAddress(action) {
  try {
    const { payload, navigate } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.REGISTER_ADDRESS, payload.addressDetails)
    );
    yield put(registerAddressSuccess(response.data));
    if (response.status == 200) {
      const updatedPayload = {
        ...payload,
        premisesPayload: {
          ...payload.premisesPayload,
          addressId: response.data?.data[0]?.addressId,
          name: `${response.data?.data[0]?.addressLine1}_${response.data?.data[0]?.addressId}`,
        }
      };

      yield put(registerPremisesRequest(updatedPayload, navigate));
      toast.success("Address successfully registered!");
    }

  } catch (error) {
    handleError(error)
    yield put(registerAddressFailure(error.response?.data || error));
    // toast.error("Failed to register address.");
  }
}

function* createAddress(action) {
  try {
    const { payload } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.REGISTER_ADDRESS, payload?.util)
    );
    yield put(registerAddressSuccess(response.data));
    if (response.status === 200) {
      let updatedPayload;

      if (payload.client) {
        updatedPayload = {
          client: {
            ...payload.client,
            addressId: response.data?.data[0]?.addressId,
          },
          util: {
            ...payload.util,
            addressId: response.data?.data[0]?.addressId,
          },
        };

        yield put(updateClientByIdRequest(updatedPayload));
        toast.success("Address updated!");
      } else if (payload.premises) {
        updatedPayload = {
          premises: {
            ...payload.premises,
            addressId: response.data?.data[0]?.addressId,
            name: `${response.data?.data[0]?.addressLine1}_${response.data?.data[0]?.addressId}`,
          },
          util: {
            ...payload.util,
            addressId: response.data?.data[0]?.addressId,
          },
        };
  
        yield put(updatePremisesRequest(updatedPayload));
        toast.success("address updated!");
      }else if (payload.contact) {
        updatedPayload = {
          contact: {
            ...payload.contact,
            mailingAddress: response.data?.data[0]?.addressId,
          },
          util: {
            ...payload.util,
            addressId: response.data?.data[0]?.addressId,
          },
        };
  
        yield put(updateContactRequest(updatedPayload.contact));
        toast.success("address updated!");
      }
    } 

  } catch (error) {
    handleError(error)
    yield put(registerAddressFailure(error.response?.data || error));
    // toast.error("Failed to register address.");
  }
}

function* fetchAddressById(action) {
  try {
    const { payload } = action;
    const response = yield call(() => postRequest(API_ENDPOINTS.FETCH_ADDRESS_BY_QUERY_ID, payload));
    yield put(fetchAddressByIdSuccess(response.data));
  } catch (error) {
    handleError(error)
    yield put(fetchAddressByIdFailure(error.response.data || error));
  }
}

export function* utilsSaga() {
  yield takeLatest(REGISTER_ADDRESS_REQUEST, registerAddress);
  yield takeLatest(CREATE_ADDRESS_REQUEST, createAddress);
  yield takeLatest(FETCH_ADDRESS_BY_ID_REQUEST, fetchAddressById);
}
