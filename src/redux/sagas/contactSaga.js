import { call, put, takeLatest } from "redux-saga/effects";
import { API_ENDPOINTS } from "../../constants/api";
import { CREATE_CONTACT_REQUEST, GET_CONTACT_BY_KEYWORD_REQUEST, GET_CONTACT_BY_TYPE_REQUEST, GET_CONTACT_REQUEST, UPDATE_CONTACT_REQUEST } from "../type";
import { getRequest, postRequest } from "../../axios/interceptor";
import { toast } from "react-toastify";
import { handleError } from "../../utils/eventHandler";
import { getContactFailure, getContactSuccess, setSelectedContact, updateContactFailure, updateContactSuccess } from "../actions/contactActions";

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
    const { payload } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.CREATE_CONTACT, payload)
    );
    const updatedResponse = {
      ...response?.data?.data[0],
      contactId: payload?.contactId,
      contactType: payload?.contactType,
    };
    yield put(setSelectedContact(updatedResponse));
    if(response.status ==200){
      toast.success("contact created!");
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

export function* contactSaga() {
  yield takeLatest(GET_CONTACT_BY_TYPE_REQUEST, getContactByType);
  yield takeLatest(UPDATE_CONTACT_REQUEST, updateContact);
  yield takeLatest(CREATE_CONTACT_REQUEST,createContact);
  yield takeLatest(GET_CONTACT_BY_KEYWORD_REQUEST, getContactByKeyword);
}
