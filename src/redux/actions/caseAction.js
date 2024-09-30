import {
    POST_CASE_REQUEST,
    POST_CASE_SUCCESS,
    POST_CASE_FAILURE,
    GET_CASE_REQUEST,
    GET_CASE_SUCCESS,
    GET_CASE_FAILURE,
    UPDATE_CASE_REQUEST,
    UPDATE_CASE_SUCCESS,
    UPDATE_CASE_FAILURE,
    DELETE_CASE_REQUEST,
    DELETE_CASE_SUCCESS,
    DELETE_CASE_FAILURE,
    FETCH_ALL_CASES_REQUEST,
    FETCH_ALL_CASES_SUCCESS,
    FETCH_ALL_CASES_FAILURE,
    READ_CASE_REQUEST,
    READ_CASE_BY_CLIENT,
    CLOSE_CASE,
    READ_CASE_BY_CONTACT,
    SET_STAGE,
    SET_SEARCH_CASES,
    UPDATE_CASE_DATE_REQUEST,
    CLEAR_DATA,
    UPDATE_CASE_DATE_SUCCESS
} from "../type";


//Create case
export const caseCreateRequest = (payload,navigate) => ({
    type: POST_CASE_REQUEST,
    payload,
    navigate
});

export const caseCreateSuccess = (user) => ({
    type: POST_CASE_SUCCESS,
    payload: user,
});

export const caseCreateFailure = (error) => ({
    type: POST_CASE_FAILURE,
    payload: error,
});

//Fetch Case
export const getCaseRequest = (payload) => ({
    type: GET_CASE_REQUEST,
    payload,
});

export const getCaseSuccess = (user) => ({
    type: GET_CASE_SUCCESS,
    payload: user,
});

export const getCaseFailure = (error) => ({
    type: GET_CASE_FAILURE,
    payload: error,
});

//Update Case
export const updateCaseRequest = (payload) => ({
    type: UPDATE_CASE_REQUEST,
    payload,
});

export const updateCaseSuccess = (user) => ({
    type: UPDATE_CASE_SUCCESS,
    payload: user,
});

export const updateCaseFailure = (error) => ({
    type: UPDATE_CASE_FAILURE,
    payload: error,
});

//Delete Case
export const deleteCaseRequest = (payload) => ({
    type: DELETE_CASE_REQUEST,
    payload,
});

export const deleteCaseSuccess = (user) => ({
    type: DELETE_CASE_SUCCESS,
    payload: user,
});

export const deleteCaseFailure = (error) => ({
    type: DELETE_CASE_FAILURE,
    payload: error,
});

//Fetch All Cases
export const fetchAllCasesRequest = (payload) => ({
    type: FETCH_ALL_CASES_REQUEST,
    payload,
});

export const fetchAllCasesSuccess = (cases) => ({
    type: FETCH_ALL_CASES_SUCCESS,
    payload: { cases },
});

export const fetchAllCasesFailure = (error) => ({
    type: FETCH_ALL_CASES_FAILURE,
    payload: error,
});


//read cases
export const getClientByIdRequest = (payload) => ({
    type: READ_CASE_REQUEST,
    payload,
});

//read cases
export const getCaseByClientRequest = (payload) => ({
    type: READ_CASE_BY_CLIENT,
    payload,
});

export const getCaseByContactRequest = (payload) => ({
    type: READ_CASE_BY_CONTACT,
    payload,
});
//close case
export const closeCaseRequest = (payload,navigate) => ({
    type: CLOSE_CASE,
    payload,
    navigate
});

export const caseSetStage = (data) => ({
    type: SET_STAGE,
    payload: data,
});

export const setSearchCases = (cases, filterStatus) => ({
    type: SET_SEARCH_CASES,
    payload: {cases, filterStatus },
});


//Update Case
export const updateCaseDateRequest = (payload) => ({
    type: UPDATE_CASE_DATE_REQUEST,
    payload,
});



export const clearCasesData = () => ({
    type: CLEAR_DATA
});

export const caseDateSuccess = (payload) => ({
    type: UPDATE_CASE_DATE_SUCCESS,
    payload,
});