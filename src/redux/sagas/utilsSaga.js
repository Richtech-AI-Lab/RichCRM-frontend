import { call, put, takeLatest } from "redux-saga/effects";
import { postRequest } from "../../axios/interceptor";
import { API_ENDPOINTS, ROUTES } from "../../constants/api";
import {
  fetchAddressByIdFailure,
  fetchAddressByIdSuccess,
  registerAddressFailure,
  registerAddressSuccess,
  sendEmailFailure,
  sendEmailSuccess,
} from "../actions/utilsActions";
import { CREATE_ADD_CLIENT_ADDRESS_REQUEST, CREATE_ADD_ORGANIZATION_ADDRESS_REQUEST, CREATE_ADDRESS_CONTACT_REQUEST, CREATE_ADDRESS_REQUEST, FETCH_ADDRESS_BY_ID_REQUEST, REGISTER_ADDRESS_REQUEST, SEND_MAIL_REQUEST } from "../type";
import { registerPremisesRequest, updatePremisesRequest } from "../actions/premisesActions";
import { toast } from "react-toastify";
import { handleError } from "../../utils/eventHandler";
import { createTenantRequest, updateAddClientByIdRequest, updateClientByIdRequest } from "../actions/clientActions";
import { createContactRequest, updateContactRequest } from "../actions/contactActions";
import { updateAddOrganizationByIdRequest, updateOrganizationByIdRequest } from "../actions/organizationActions";
import { all } from "axios";
import { takeEvery } from "redux-saga/effects";

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
    // yield put(registerAddressSuccess(response.data));
    // console.log(payload)
    if (response.status === 200) {
      let updatedPayload;
      // console.log(payload,"_________")
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
      }
      // else if (payload.tenant && payload.premises) {
      //   updatedPayload = {
      //     ...payload,
      //     premises: {
      //       ...payload.premises,
      //       addressId: response.data?.data[0]?.addressId,
      //       name: `${response.data?.data[0]?.addressLine1}_${response.data?.data[0]?.addressId}`,
      //     },
      //     util: {
      //       ...payload.util,
      //       addressId: response.data?.data[0]?.addressId,
      //     },
      //   };
      //   yield put(createTenantRequest(updatedPayload));
      //   toast.success("Address updated!");
      // }
      else if (payload.premises) {
        yield put(registerAddressSuccess(response.data));
        updatedPayload = {
          ...payload,
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
        toast.success("Address updated!");
      }else if (payload.contact) {
        yield put(registerAddressSuccess(response.data));
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
        toast.success("Address updated!");
      }else if (payload.organization) {
        updatedPayload = {
          organization: {
            ...payload.organization,
            addressId: response.data?.data[0]?.addressId,
          },
          util: {
            ...payload.util,
            addressId: response.data?.data[0]?.addressId,
          },
        };

        yield put(updateOrganizationByIdRequest(updatedPayload));
        toast.success("Address updated!");
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

function* createAddressThenContact(action) {
  try {
    const { payload } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.REGISTER_ADDRESS, payload?.util)
    );
    yield put(registerAddressSuccess(response.data));
    if (response.status === 200) {
      let updatedPayload;

      if (payload.contact) {
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
  
        yield put(createContactRequest(updatedPayload.contact));
        toast.success("Address updated!");
      }
    } 

  } catch (error) {
    handleError(error)
    yield put(registerAddressFailure(error.response?.data || error));
    // toast.error("Failed to register address.");
  }
}

function* sendMail(action) {
  try {
    const { payload } = action;
    const response = yield call(() => postRequest(API_ENDPOINTS.SEND_MAIL, payload));
    if (response.status === 200) {
      toast.success("Email Sent!");
      yield put(sendEmailSuccess(response.data));
    }

  } catch (error) {
    handleError(error)
    yield put(sendEmailFailure(error.response.data || error));
  }
}

function* createAddClientAddress(action) {
  try {
    const { payload } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.REGISTER_ADDRESS, payload?.util)
    );
    // yield put(registerAddressSuccess(response.data));
    // console.log(payload)
    if (response.status === 200) {
      let updatedPayload;
      // console.log(payload,"_________")
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

        yield put(updateAddClientByIdRequest(updatedPayload));
        // toast.success("Address updated!");
      }
    } 
  } catch (error) {
    handleError(error)
    yield put(registerAddressFailure(error.response?.data || error));
    // toast.error("Failed to register address.");
  }
}

function* createAddOrgAddress(action) {
  try {
    const { payload } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.REGISTER_ADDRESS, payload?.util)
    );
    // yield put(registerAddressSuccess(response.data));
    // console.log(payload)
    if (response.status === 200) {
      let updatedPayload;
      // console.log(payload,"_________")
      if (payload.organization) {
        updatedPayload = {
          organization: {
            ...payload.organization,
            addressId: response.data?.data[0]?.addressId,
          },
          util: {
            ...payload.util,
            addressId: response.data?.data[0]?.addressId,
          },
        };

        yield put(updateAddOrganizationByIdRequest(updatedPayload));
        // toast.success("Address updated!");
      }
    } 
  } catch (error) {
    handleError(error)
    yield put(registerAddressFailure(error.response?.data || error));
    // toast.error("Failed to register address.");
  }
}

export function* utilsSaga() {
  yield takeLatest(REGISTER_ADDRESS_REQUEST, registerAddress);
  yield takeLatest(CREATE_ADDRESS_REQUEST, createAddress);
  yield takeEvery(CREATE_ADD_CLIENT_ADDRESS_REQUEST, createAddClientAddress);
  yield takeEvery(CREATE_ADD_ORGANIZATION_ADDRESS_REQUEST, createAddOrgAddress);
  yield takeLatest(CREATE_ADDRESS_CONTACT_REQUEST, createAddressThenContact);
  yield takeLatest(FETCH_ADDRESS_BY_ID_REQUEST, fetchAddressById);
  yield takeLatest(SEND_MAIL_REQUEST, sendMail);
  
}
