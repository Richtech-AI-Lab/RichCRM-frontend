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
  FETCH_ALL_CASES_REQUEST,
  FETCH_ALL_CASES_SUCCESS,
  FETCH_ALL_CASES_FAILURE,
  SET_STAGE,
  SET_SEARCH_CASES,
  UPDATE_CASE_DATE_SUCCESS,
  READ_CASE_BY_CONTACT,
} from "../type";

const initialCasesState = {
  cases: [],
  loading: false,
  error: null,
};

const casesReducer = (state = initialCasesState, action) => {
  switch (action.type) {
    case POST_CASE_REQUEST:
    case UPDATE_CASE_REQUEST:
    case DELETE_CASE_REQUEST:
    case FETCH_ALL_CASES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case POST_CASE_SUCCESS:
      return {
        ...state,
        loading: false,
        cases: [action.payload],
        error: null,
      };
    case UPDATE_CASE_SUCCESS:
      return {
        ...state,
        loading: false,
        cases: state.cases.map((caseItem) =>
          caseItem.id === action.payload.id ? action.payload : caseItem
        ),
        error: null,
      };
    case DELETE_CASE_SUCCESS:
      return {
        ...state,
        loading: false,
        cases: state.cases.filter(
          (caseItem) => caseItem.id !== action.payload.id
        ),
        error: null,
      };
    case FETCH_ALL_CASES_SUCCESS:
      if (action.payload.closed) {
        return {
          ...state,
          loading: false,
          closedCases: action.payload.cases,
          error: null,
        };
      } else {
        return {
          ...state,
          loading: false,
          cases: action.payload.cases,
          error: null,
        };
      }

    // case FETCH_ALL_CASES_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     cases: action.payload.cases,
    //     error: null,
    //   };
    case GET_CASE_FAILURE:
    case POST_CASE_FAILURE:
    case UPDATE_CASE_FAILURE:
    case DELETE_CASE_FAILURE:
    case FETCH_ALL_CASES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_STAGE:
      return {
        ...state,
        cases: state.cases.map((caseItem) =>
          caseItem.caseId === action.payload.caseId
            ? { ...caseItem, stage: action.payload.stage }
            : caseItem
        ),
        loading: false,
        error: null,
      };
    case UPDATE_CASE_DATE_SUCCESS:
      return {
        ...state,
        cases: state.cases.map((caseItem) =>
          caseItem.caseId === action.payload.caseId
            ? { ...caseItem, ...action.payload }
            : caseItem
        ),
        loading: false,
        error: null,
      };
    case CLEAR_DATA:
      return initialCasesState;

    case SET_SEARCH_CASES:
      return {
        ...state,
        loading: false,
        searchData: action.payload.cases,
        filterStatus: action.payload.filterStatus,
        error: null,
      }
    case READ_CASE_BY_CONTACT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

export default combineReducers({
  casesData: casesReducer,
});
