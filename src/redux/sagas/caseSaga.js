import { takeLatest, put, call } from "redux-saga/effects";
import { caseCreateSuccess, caseCreateFailure, updateCaseSuccess, updateCaseFailure, deleteCaseSuccess, deleteCaseFailure, fetchAllCasesSuccess, fetchAllCasesFailure } from "../actions/caseAction";
import { POST_CASE_REQUEST, UPDATE_CASE_REQUEST, DELETE_CASE_REQUEST, FETCH_ALL_CASES_REQUEST } from "../type";
import { postRequest, getRequest } from "../../axios/interceptor";
import { API_ENDPOINTS, ROUTES } from "../../constants/api";
import { toast } from "react-toastify";
import { createStageRequest } from "../actions/stagesActions";
import { fetchClientByIdRequest } from "../actions/clientActions";
import { all } from "redux-saga/effects";
import { handleError } from "../../utils/eventHandler";


function* createCase(action) {
    try {
        const { payload, navigate } = action;
        const updatedPayload = {
            ...payload,
            casePayload: {
                ...payload.casePayload
            }
        };

        const response = yield call(() => postRequest(API_ENDPOINTS.CREATE_CASE, updatedPayload.casePayload));
        yield put(caseCreateSuccess(response.data));
        if (response.status == 200) {
            const caseId = response.data?.data[0].caseId;
            let sagaPayload = {
                stageType: 0,
                caseId: caseId,
            }
            yield put(createStageRequest(sagaPayload));
            localStorage.setItem('c_id', caseId);
            toast.success("Cases successfully registered!");
            navigate(ROUTES.NEW_CASE_INFO);
        }
    } catch (error) {
        handleError(error)
        yield put(caseCreateFailure(error.response.data || error));
        // toast.error("Failed to register cases.");
    }
}

function* fetchAllCases(action) {
    try {
        const { payload } = action;
        const response = yield call(() => postRequest(API_ENDPOINTS.FECTH_ALL_CASES, payload));
        if (response.status == 200) {
            // const ids = [...new Set(
            //     response?.data?.data
            //         .map(caseItem => caseItem.sellerId || caseItem.buyerId) // Take sellerId if available, otherwise take buyerId
            // )];
            // const premisesIds = [...new Set(response?.data?.data.map(caseItem => caseItem.premisesId))];

            // const clientIdsData = yield all(
            //     ids.map((id) =>
            //         call(function* () {
            //             try {
            //                 let res = yield call(getRequest, `${API_ENDPOINTS.FETCH_CLIENT_BY_ID}/${id}`);
            //                 return res.data.data[0];
            //             } catch (error) {
            //                 //   handleError(error);
            //                 return null; // Return null or some default value if the call fails
            //             }
            //         })
            //     )
            // );
            // const premisesIdsData = yield all(
            //     premisesIds.map((id) =>
            //         call(function* () {
            //             try {
            //                 let res = yield call(getRequest, `${API_ENDPOINTS.FETCH_PREMISES_BY_ID}/${id}`);
            //                 return res.data.data[0];
            //             } catch (error) {
            //                 //   handleError(error);
            //                 return null; 
            //                 // Return null or some default value if the call fails
            //             }
            //         })
            //     )
            // );
            // const updatedCases = response?.data?.data.map(caseItem => {
            //     const clients = clientIdsData.find(p =>
            //         p.clientId === caseItem.sellerId || p.clientId === caseItem.buyerId
            //     );
            //     return {
            //         ...caseItem,
            //         clientsId: clients

            //         // Replace premisesId with the entire premises object
            //     };
            // });
            yield put(fetchAllCasesSuccess(response?.data?.data));
        }
    } catch (error) {
        handleError(error)
        yield put(fetchAllCasesFailure(error.response.data || error));
    }
}

function* updateCase(action) {
    try {
        const { id } = action.payload;
        const response = yield call(() => postRequest(`${API_ENDPOINTS.GET_CASE}/${id}`));
        yield put(updateCaseSuccess(response.data));
    } catch (error) {
        handleError(error)
        yield put(updateCaseFailure(error.response.data || error));
    }
}

function* deleteCase(action) {
    try {
        const { payload } = action;
        const response = yield call(() => postRequest(API_ENDPOINTS.DELETE_CASE, payload));
        yield put(deleteCaseSuccess(response.data));
    } catch (error) {
        handleError(error)
        yield put(deleteCaseFailure(error.response.data || error));
    }
}

export function* caseSaga() {
    yield takeLatest(POST_CASE_REQUEST, createCase);
    yield takeLatest(FETCH_ALL_CASES_REQUEST, fetchAllCases);
    yield takeLatest(UPDATE_CASE_REQUEST, updateCase);
    yield takeLatest(DELETE_CASE_REQUEST, deleteCase);
}
