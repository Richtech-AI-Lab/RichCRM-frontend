import { combineReducers } from "redux";
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
    CLEAR_DATA,

} from "../type";

const initialCreateCaseState = {
    cases: null,
    loading: false,
    error: null,
};

const initialGetCaseState = {
    cases: null,
    loading: false,
    error: null,
};

const initialUpdateCaseState = {
    cases: null,
    loading: false,
    error: null,
};

const initialDeleteCaseState = {
    cases: null,
    loading: false,
    error: null,
};

const createCaseReducer = (state = initialCreateCaseState, action) => {
    switch (action.type) {
        case POST_CASE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case POST_CASE_SUCCESS:
            return {
                ...state,
                loading: false,
                cases: action.payload,
                error: null,
            };
        case POST_CASE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_DATA:
            return initialCreateCaseState;
        default:
            return state;
    }
};

const getCaseReducer = (state = initialGetCaseState, action) => {
    switch (action.type) {
        case GET_CASE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_CASE_SUCCESS:
            return {
                ...state,
                loading: false,
                cases: action.payload,
                error: null,
            };
        case GET_CASE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_DATA:
            return initialGetCaseState;
        default:
            return state;
    }
};

const updateCaseReducer = (state = initialUpdateCaseState, action) => {
    switch (action.type) {
        case UPDATE_CASE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case UPDATE_CASE_SUCCESS:
            return {
                ...state,
                loading: false,
                cases: action.payload,
                error: null,
            };
        case UPDATE_CASE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_DATA:
            return initialUpdateCaseState;
        default:
            return state;
    }
};

const deleteCaseReducer = (state = initialDeleteCaseState, action) => {
    switch (action.type) {
        case DELETE_CASE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case DELETE_CASE_SUCCESS:
            return {
                ...state,
                loading: false,
                cases: action.payload,
                error: null,
            };
        case DELETE_CASE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_DATA:
            return initialDeleteCaseState;
        default:
            return state;
    }
};

const caseReducer = combineReducers({
    createCase: createCaseReducer,
    getCase: getCaseReducer,
    updateCase: updateCaseReducer,
    deleteCase: deleteCaseReducer
});

export default caseReducer;
