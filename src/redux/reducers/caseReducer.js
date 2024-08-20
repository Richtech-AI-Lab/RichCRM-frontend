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
} from "../type";

const initialCasesState = {
  cases: [],
  closedCases: [],
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
        cases: [...state.cases, action.payload],
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
      return {
        ...state,
        loading: false,
        cases: action.payload.cases,
        closedCases: action.payload.closedCases,
        error: null,
      };
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
    case CLEAR_DATA:
      return initialCasesState;
    default:
      return state;
  }
};

export default combineReducers({
  casesData: casesReducer,
});
