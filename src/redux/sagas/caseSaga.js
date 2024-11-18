import { takeLatest, put, call } from "redux-saga/effects";
import { caseCreateSuccess, caseCreateFailure, updateCaseSuccess, updateCaseFailure, deleteCaseSuccess, deleteCaseFailure, fetchAllCasesSuccess, fetchAllCasesFailure, caseSetStage, clearCasesData, caseDateSuccess, updateCaseContactSuccess } from "../actions/caseAction";
import { POST_CASE_REQUEST, UPDATE_CASE_REQUEST, DELETE_CASE_REQUEST, FETCH_ALL_CASES_REQUEST, READ_CASE_REQUEST, READ_CASE_BY_CLIENT, CLOSE_CASE, READ_CASE_BY_CONTACT, UPDATE_CASE_DATE_REQUEST, UPDATE_CASE_CONTACT_REQUEST } from "../type";
import { postRequest, getRequest } from "../../axios/interceptor";
import { API_ENDPOINTS, ROUTES } from "../../constants/api";
import { toast } from "react-toastify";
import { clearStageData, createStageRequest } from "../actions/stagesActions";
import { fetchClientByIdRequest } from "../actions/clientActions";
import { all } from "redux-saga/effects";
import { handleError } from "../../utils/eventHandler";
import { clearTaskData } from "../actions/taskActions";


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
        yield put(caseCreateSuccess(response.data?.data[0]));
        if (response.status == 200) {
            const casedetails = response.data?.data[0];
            const caseId = response.data?.data[0].caseId;
            // let sagaPayload = {
            //     stageType: 0,
            //     caseId: caseId,
            // }
            // yield put(createStageRequest(sagaPayload));
            localStorage.setItem('c_id', caseId);
            console.log(updatedPayload, "ccc")
            toast.success("Cases successfully registered!");
            navigate(ROUTES.CASES_DATA, { state: { casedetails } });
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
            const casedata = response?.data?.data;
            localStorage.setItem('c_data', JSON.stringify(casedata));
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

// function* updateCase(action) {
//     try {
//         const { payload } = action;
//         const response = yield call(() => postRequest(API_ENDPOINTS.UPDATE_CASE, payload));
//         yield put(caseCreateSuccess(response?.data?.data[0]));
//     } catch (error) {
//         handleError(error)
//         yield put(updateCaseFailure(error.response.data || error));
//     }
// }

function* updateCaseStage(action) {
    try {
        const { payload } = action;
        const response = yield call(() => postRequest(API_ENDPOINTS.UPDATE_CASE, payload));
        if (response.status == 200) {
            const updatedPayload = {
                ...payload,
                stage: response?.data?.data[0]?.stage,
            };
            yield put(caseSetStage(updatedPayload));
        }


    } catch (error) {
        handleError(error)
        yield put(updateCaseFailure(error.response.data || error));
    }
}

function* deleteCase(action) {
    try {
        const { payload, navigate} = action;
        const response = yield call(() => postRequest(API_ENDPOINTS.DELETE_CASE, payload));
        if (response.status == 200) {
            localStorage.removeItem('c_id');
            yield put(clearTaskData());
            yield put(clearStageData());
            yield put(clearCasesData());
            toast.success("Case Deleted Success!");
            navigate(ROUTES.CASES);
        }
        // yield put(deleteCaseSuccess(response.data));
    } catch (error) {
        handleError(error)
        yield put(deleteCaseFailure(error.response.data || error));
    }
}

function* getCase(action) {
    const { payload } = action;
    // console.log(`${API_ENDPOINTS.READ_STAGE}/${payload?.caseId}/${payload?.stageType}`,"payload")
    // console.log(payload)
    try {
        const response = yield call(() => getRequest(`${API_ENDPOINTS.READ_CASE}/${payload}`));
        yield put(caseCreateSuccess(response?.data?.data[0]));
    } catch (error) {
        handleError(error);
        yield put(caseCreateFailure(error.response?.data || error));
    }
}

function* getCaseByClient(action) {
    try {
        const { payload } = action;
        const response = yield call(() => postRequest(API_ENDPOINTS.GET_CASE_BY_CLIENT, payload));
        yield put(caseCreateSuccess(response.data));
        if (response.status == 200) {
            toast.success("Case Closed!");
        }
    } catch (error) {
        handleError(error)
        yield put(updateCaseFailure(error.response.data || error));
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
            yield put(caseCreateSuccess(combinedData));
        } else {
            // Handle failure if any of the responses fail
            throw new Error('One or both API calls failed');
        }
    } catch (error) {
        handleError(error);
        yield put(updateCaseFailure(error.response.data || error));
    }
}



function* closeCaseByCaseId(action) {
    try {
        const { payload, navigate } = action;
        const response = yield call(() => postRequest(API_ENDPOINTS.CLOSE_CASE, payload));
        if (response.status == 200) {
            localStorage.removeItem('c_id');
            yield put(clearTaskData());
            yield put(clearStageData());
            yield put(clearCasesData());
            toast.success("Case Closed Success!");
            navigate(ROUTES.CASES);
        }
    } catch (error) {
        handleError(error)
        yield put(updateCaseFailure(error.response.data || error));
    }
}

function* updateCasedate(action) {
    try {
        const { payload } = action;
        const response = yield call(() => postRequest(API_ENDPOINTS.UPDATE_CASE, payload));
        if (response.status == 200) {
            yield put(caseDateSuccess(response.data.data[0])); 
            toast.success("Case Details Updated!");
        }
    } catch (error) {
        handleError(error)
    }
}

function* updateCaseContact(action) {
    try {
        const { payload } = action;
        const response = yield call(() => postRequest(API_ENDPOINTS.UPDATE_CASE, payload));
        yield put(updateCaseContactSuccess(response.data.data[0]))
        if (response.status == 200) {
            toast.success("Contacts Updated!");
        }
    } catch (error) {
        handleError(error)
    }
}


export function* caseSaga() {
    yield takeLatest(POST_CASE_REQUEST, createCase);
    yield takeLatest(FETCH_ALL_CASES_REQUEST, fetchAllCases);
    yield takeLatest(UPDATE_CASE_REQUEST, updateCaseStage);
    yield takeLatest(DELETE_CASE_REQUEST, deleteCase);
    yield takeLatest(READ_CASE_REQUEST, getCase);
    yield takeLatest(READ_CASE_BY_CLIENT, getCaseByClient);
    yield takeLatest(READ_CASE_BY_CONTACT, getCaseByContact);
    yield takeLatest(UPDATE_CASE_DATE_REQUEST,updateCasedate);
    yield takeLatest(UPDATE_CASE_CONTACT_REQUEST,updateCaseContact);
    yield takeLatest(CLOSE_CASE, closeCaseByCaseId);
}
