import { call, put, takeLatest } from "redux-saga/effects";
import { API_ENDPOINTS } from "../../constants/api";
import { GET_CONTACT_BY_TYPE_REQUEST, GET_CONTACT_REQUEST, UPDATE_CONTACT_REQUEST } from "../type";
import { getRequest, postRequest } from "../../axios/interceptor";
import { toast } from "react-toastify";
import { handleError } from "../../utils/eventHandler";
import { getContactFailure, getContactSuccess, updateContactFailure, updateContactSuccess } from "../actions/contactActions";

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
    // console.log(payload?.client,"____")
    yield put(updateContactSuccess(response.data));
    if(response.status ==200){
      toast.success("contact updated!");
    }
  } catch (error) {
    handleError(error)
    yield put(updateContactFailure(error.response?.data || error));
  }
}

export function* contactSaga() {
  yield takeLatest(GET_CONTACT_BY_TYPE_REQUEST, getContactByType);
  yield takeLatest(UPDATE_CONTACT_REQUEST, updateContact);
}
