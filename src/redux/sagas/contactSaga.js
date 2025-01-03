import { call, put, takeLatest } from "redux-saga/effects";
import { API_ENDPOINTS, ROUTES } from "../../constants/api";
import { CREATE_ATTORNEY_REQUEST, CREATE_BROKER_REQUEST, CREATE_CONTACT_REQUEST, CREATE_REALTOR_REQUEST, DELETE_ATTORNEY_REQUEST, DELETE_BROKER_REQUEST, DELETE_CONTACT_REQUEST, DELETE_CONTACT_SUCCESS, DELETE_REALTOR_REQUEST, FETCH_ATTORNEY_BY_ID_REQUEST, FETCH_BROKER_BY_ID_REQUEST, FETCH_REALTOR_BY_ID_REQUEST, GET_CONTACT_BY_KEYWORD_REQUEST, GET_CONTACT_BY_TYPE_REQUEST, GET_CONTACT_REQUEST, GET_MULTIPLE_CONTACT_BY_TYPE_REQUEST, READ_CASE_BY_CONTACT_REQ, UPDATE_CONTACT_REQUEST } from "../type";
import { getRequest, postRequest } from "../../axios/interceptor";
import { toast } from "react-toastify";
import { handleError } from "../../utils/eventHandler";
import { createAttorneySuccess, createBrokerFailure, createBrokerSuccess, createRealtorFailure, createRealtorSuccess, deleteAttorneySuccess, deleteBrokerFailure, deleteBrokerSuccess, deleteContactFailure, deleteContactSuccess, deleteRealtorFailure, deleteRealtorSuccess, fetchAttorneyByIdsFailure, fetchAttorneyByIdsSuccess, fetchBrokerByIdsFailure, fetchBrokerByIdsSuccess, fetchRealtorByIdsFailure, fetchRealtorByIdsSuccess, getCaseByContactFailure, getCaseByContactSuccess, getContactFailure, getContactSuccess, getMultipleTagsContactFailure, getMultipleTagsContactSuccess, setSelectedContact, updateContactFailure, updateContactSuccess } from "../actions/contactActions";
import { all } from "redux-saga/effects";
import { updateCaseContactRequest } from "../actions/caseAction";
import { takeEvery } from "redux-saga/effects";

function* getContactByType(action) {
  try {
    const contactType = action.payload;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.GET_CONTACT_BY_QUERY, contactType)
    );
    yield put(getContactSuccess(response.data));
  } catch (error) {
    handleError(error)
    yield put(getContactFailure(error.response.data || error));
  }
}
function* getContactByTag(action) {
  try {
    const contactType = action.payload;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.GET_CONTACT_BY_TAG, contactType)
    );
    yield put(getContactSuccess(response.data));
  } catch (error) {
    handleError(error)
    yield put(getContactFailure(error.response.data || error));
  }
}
function* getAttorneyByIds(action) {
  try {
    const payload= action.payload;
        // const attorneyListRes = yield all(
    //   contacts.map(id =>
    //     call(getRequest, `${API_ENDPOINTS.QUERY_CONTACT_BY_CASE_ID}/${id}`)
    //   )
    // );
    // const attorneyData = attorneyListRes.map(res => res.data.data[0]);
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.GET_CONTACT_BY_CASETAG, payload)
    );
    yield put(fetchAttorneyByIdsSuccess(response.data.data));
  } catch (error) {
    handleError(error)
    yield put(fetchAttorneyByIdsFailure(error.response.data || error));
  }
}

function* getRealtorByIds(action) {
  try {
    const payload= action.payload;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.GET_CONTACT_BY_CASETAG, payload)
    );
    yield put(fetchRealtorByIdsSuccess(response.data.data));
  } catch (error) {
    handleError(error)
    yield put(fetchRealtorByIdsFailure(error.response.data || error));
  }
}

function* getBrokerByIds(action) {
  try {
    const payload= action.payload;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.GET_CONTACT_BY_CASETAG, payload)
    );
    yield put(fetchBrokerByIdsSuccess(response.data.data));
  } catch (error) {
    handleError(error)
    yield put(fetchBrokerByIdsFailure(error.response.data || error));
  }
}

function* updateContact(action) {
  try {
    const { payload } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.UPDATE_CONTACT, payload)
    );
    const updatedResponse = {
      ...response?.data?.data[0],
      contactId: payload?.contactId,
      contactType: payload?.contactType,
    };
    yield put(setSelectedContact(updatedResponse));
    if(response.status ==200){
      toast.success("contact updated!");
    }
  } catch (error) {
    handleError(error)
    yield put(updateContactFailure(error.response?.data || error));
  }
}

function* createContact(action) {
  try {
    const { payload, navigate } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.CREATE_CONTACT, payload)
    );
    const updatedResponse = {
      ...response?.data?.data[0],
      contactId: payload?.contactId,
      contactType: payload?.contactType,
    };
    let active=0;
    yield put(setSelectedContact(updatedResponse));
    if(response.status ==200){
      toast.success("contact created!");
      navigate(ROUTES.CONTACT_PARTNER, {state: {active}});  
    }
  } catch (error) {
    handleError(error)
    yield put(updateContactFailure(error.response?.data || error));
  }
}

function* getContactByKeyword(action) {
  try {
    const contactKeyword = action.payload;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.GET_CONTACT_BY_KEYWORD, contactKeyword)
    );
    yield put(getContactSuccess(response.data));
  } catch (error) {
    handleError(error)
    yield put(getContactFailure(error.response.data || error));
  }
}

function* createAttorney(action) {
  try {
    const { payload } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.CREATE_CONTACT, payload)
    );
    yield put(createAttorneySuccess(response.data.data[0]));
  } catch (error) {
    handleError(error)
    yield put(updateContactFailure(error.response?.data || error));
  }
}
function* deleteAttorney(action) {
  try {
    const { payload } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.DELETE_CONTACT,{contactId: payload})
    );
    yield put(deleteAttorneySuccess(payload));
  } catch (error) {
    handleError(error)
    yield put(updateContactFailure(error.response?.data || error));
  }
}

function* createBroker(action) {
  try {
    const { payload } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.CREATE_CONTACT, payload)
    );
    yield put(createBrokerSuccess(response.data.data[0]));
  } catch (error) {
    handleError(error)
    yield put(createBrokerFailure(error.response?.data || error));
  }
}
function* deleteBroker(action) {
  try {
    const { payload } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.DELETE_CONTACT,{contactId: payload})
    );
    yield put(deleteBrokerSuccess(payload));
  } catch (error) {
    handleError(error)
    yield put(deleteBrokerFailure(error.response?.data || error));
  }
}

function* deleteContact(action) {
  try {
    const { payload } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.DELETE_CONTACT,{contactId: payload})
    );
    yield put(deleteContactSuccess(payload));
    toast.success("Contact deleted!");
  } catch (error) {
    handleError(error)
    yield put(deleteContactFailure(error.response?.data || error));
  }
}
function* getCaseByContact(action) {
  try {
      const { payload } = action;

      // Create payloads for both API calls
      const closedTruePayload = { ...payload, closed: true };
      const closedFalsePayload = { ...payload, closed: false };

      // Make both API calls in parallel
      const [responseTrue, responseFalse] = yield all([
          call(() => postRequest(API_ENDPOINTS.GET_CASE_BY_CONTACT, closedTruePayload)),
          call(() => postRequest(API_ENDPOINTS.GET_CASE_BY_CONTACT, closedFalsePayload)),
      ]);

      // Check the status of both responses and combine data if both are successful
      if (responseTrue?.status === 200 && responseFalse?.status === 200) {
          const combinedData = [
              responseTrue?.data?.data || [], // First API response data
              responseFalse?.data?.data || [], // Second API response data
          ];
          // console.log(combinedData,"responseTrue?.data?.data")
          // Dispatch success action with combined data
          yield put(getCaseByContactSuccess(combinedData));
      } else {
          // Handle failure if any of the responses fail
          throw new Error('One or both API calls failed');
      }
  } catch (error) {
      handleError(error);
      yield put(getCaseByContactFailure(error.response.data || error));
  }
}

function* getMultipleContactByTag(action) {
  try {
    const contactType = action.payload;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.GET_CONTACT_BY_TAGS, contactType)
    );
    yield put(getMultipleTagsContactSuccess(response?.data?.data));
  } catch (error) {
    console.log(error,"err")
    handleError(error)
    yield put(getMultipleTagsContactFailure(error.response.data || error));
  }
}

export function* contactSaga() {
  yield takeLatest(READ_CASE_BY_CONTACT_REQ, getCaseByContact);
  // yield takeLatest(GET_CONTACT_BY_TYPE_REQUEST, getContactByType);
  yield takeLatest(GET_CONTACT_BY_TYPE_REQUEST, getContactByTag);
  yield takeLatest(FETCH_ATTORNEY_BY_ID_REQUEST, getAttorneyByIds);
  yield takeLatest(FETCH_REALTOR_BY_ID_REQUEST, getRealtorByIds);
  yield takeLatest(FETCH_BROKER_BY_ID_REQUEST, getBrokerByIds);
  yield takeLatest(UPDATE_CONTACT_REQUEST, updateContact);
  yield takeLatest(CREATE_CONTACT_REQUEST,createContact);
  yield takeLatest(GET_CONTACT_BY_KEYWORD_REQUEST, getContactByKeyword);
  yield takeLatest(CREATE_ATTORNEY_REQUEST, createAttorney);
  yield takeLatest(DELETE_ATTORNEY_REQUEST, deleteAttorney);
  yield takeLatest(CREATE_BROKER_REQUEST, createBroker);
  yield takeLatest(DELETE_BROKER_REQUEST, deleteBroker);
  yield takeLatest(DELETE_CONTACT_REQUEST, deleteContact);
  yield takeLatest(GET_MULTIPLE_CONTACT_BY_TYPE_REQUEST, getMultipleContactByTag);
}
