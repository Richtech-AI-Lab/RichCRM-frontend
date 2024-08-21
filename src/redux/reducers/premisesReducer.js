import {
  CLEAR_DATA,
  FETCH_PREMISES_BY_ID_FAILURE,
  FETCH_PREMISES_BY_ID_REQUEST,
  FETCH_PREMISES_BY_ID_SUCCESS,
  FETCH_PREMISES_BY_QUERY_ID_FAILURE,
  FETCH_PREMISES_BY_QUERY_ID_REQUEST,
  FETCH_PREMISES_BY_QUERY_ID_SUCCESS,
  FETCH_PREMISES_FAILURE,
  FETCH_PREMISES_REQUEST,
  FETCH_PREMISES_SUCCESS,
  REGISTER_PREMISES_FAILURE,
  REGISTER_PREMISES_REQUEST,
  REGISTER_PREMISES_SUCCESS,
  START_LOADING,
  STOP_LOADING,
} from "../type";

const initialState = {
  loading: false,
  premises: null,
  error: null,
};

const premisesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PREMISES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PREMISES_SUCCESS:
      return {
        ...state,
        loading: false,
        premises: action.payload,
        error: null,
      };
    case FETCH_PREMISES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_PREMISES_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PREMISES_BY_ID_SUCCESS:
      return { ...state, loading: false, premises: action.payload, error: null };
    case FETCH_PREMISES_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case REGISTER_PREMISES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REGISTER_PREMISES_SUCCESS:
      return {
        ...state,
        loading: false,
        premises: action.payload,
        error: null,
      };
    case REGISTER_PREMISES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_PREMISES_BY_QUERY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PREMISES_BY_QUERY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        premises: action.payload,
        error: null,
      };
    case FETCH_PREMISES_BY_QUERY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_DATA:
      return initialState;
    case START_LOADING:
      return { ...state, loading: true };
    case STOP_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default premisesReducer;
