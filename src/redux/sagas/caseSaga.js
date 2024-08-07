import { takeLatest, put, call } from "redux-saga/effects";
import { caseCreateSuccess, caseCreateFailure, getCaseSuccess, getCaseFailure, updateCaseSuccess, updateCaseFailure, deleteCaseSuccess, deleteCaseFailure } from "../actions/caseAction";
import { POST_CASE_REQUEST, GET_CASE_REQUEST, UPDATE_CASE_REQUEST, DELETE_CASE_REQUEST } from "../type";
import { postRequest, getRequest } from "../../axios/interceptor";
import { API_ENDPOINTS } from "../../constants/api";


function* createCase(action) {
    try {
        const { payload } = action;
        const response = yield call(() => postRequest(API_ENDPOINTS.CREATE_CASE, payload));
        yield put(caseCreateSuccess(response.data));
    } catch (error) {
        yield put(caseCreateFailure(error.response.data || error));
    }
}

function* getCase(action) {
    try {
        const { payload } = action;
        const response = yield call(() => getRequest(API_ENDPOINTS.GET_CASE, payload));
        yield put(getCaseSuccess(response.data));
    } catch (error) {
        yield put(getCaseFailure(error.response.data || error));
    }
}

function* updateCase(action) {
    try {
        const { id } = action.payload;
        const response = yield call(() => postRequest(`${API_ENDPOINTS.GET_CASE}/${id}`));
        yield put(updateCaseSuccess(response.data));
    } catch (error) {
        yield put(updateCaseFailure(error.response.data || error));
    }
}

function* deleteCase(action) {
    try {
        const { payload } = action;
        const response = yield call(() => postRequest(API_ENDPOINTS.DELETE_CASE, payload));
        yield put(deleteCaseSuccess(response.data));
    } catch (error) {
        yield put(deleteCaseFailure(error.response.data || error));
    }
}

export function* caseSaga() {
    yield takeLatest(POST_CASE_REQUEST, createCase);
    yield takeLatest(GET_CASE_REQUEST, getCase);
    yield takeLatest(UPDATE_CASE_REQUEST, updateCase);
    yield takeLatest(DELETE_CASE_REQUEST, deleteCase);
}