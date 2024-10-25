import { call, put, takeLatest } from "redux-saga/effects";
import { API_ENDPOINTS, ROUTES } from "../../constants/api";
import { CREATE_ATTORNEY_REQUEST, CREATE_CONTACT_REQUEST, DELETE_ATTORNEY_REQUEST, FETCH_ATTORNEY_BY_ID_REQUEST, FETCH_REALTOR_BY_ID_REQUEST, GET_CONTACT_BY_KEYWORD_REQUEST, GET_CONTACT_BY_TYPE_REQUEST, GET_CONTACT_REQUEST, UPDATE_CONTACT_REQUEST } from "../type";
import { getRequest, postRequest } from "../../axios/interceptor";
import { toast } from "react-toastify";
import { handleError } from "../../utils/eventHandler";
import { createAttorneySuccess, deleteAttorneySuccess, fetchAttorneyByIdsFailure, fetchAttorneyByIdsSuccess, fetchRealtorByIdsFailure, fetchRealtorByIdsSuccess, getContactFailure, getContactSuccess, setSelectedContact, updateContactFailure, updateContactSuccess } from "../actions/contactActions";
import { all } from "redux-saga/effects";
import { updateCaseContactRequest } from "../actions/caseAction";

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
      postRequest(API_ENDPOINTS.QUERY_CONTACT_BY_CASE_ID, payload)
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
      postRequest(API_ENDPOINTS.QUERY_CONTACT_BY_CASE_ID, payload)
    );
    yield put(fetchRealtorByIdsSuccess(response.data.data));
  } catch (error) {
    handleError(error)
    yield put(fetchRealtorByIdsFailure(error.response.data || error));
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
    // const attorneyListRes = yield all(
    //   payload?.map(At =>
    //     call(postRequest, API_ENDPOINTS.CREATE_CONTACT, At)
    //   )
    // );
    // const attorneyData = attorneyListRes.map(res => res.data.data[0]);
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

export function* contactSaga() {
  yield takeLatest(GET_CONTACT_BY_TYPE_REQUEST, getContactByType);
  yield takeLatest(FETCH_ATTORNEY_BY_ID_REQUEST, getAttorneyByIds);
  yield takeLatest(FETCH_REALTOR_BY_ID_REQUEST, getRealtorByIds);
  yield takeLatest(UPDATE_CONTACT_REQUEST, updateContact);
  yield takeLatest(CREATE_CONTACT_REQUEST,createContact);
  yield takeLatest(GET_CONTACT_BY_KEYWORD_REQUEST, getContactByKeyword);
  yield takeLatest(CREATE_ATTORNEY_REQUEST, createAttorney);
  yield takeLatest(DELETE_ATTORNEY_REQUEST, deleteAttorney);
}
