import {
  CLEAR_DATA,
  FETCH_PREMISES_FAILURE,
  FETCH_PREMISES_REQUEST,
  FETCH_PREMISES_SUCCESS,
  REGISTER_PREMISES_FAILURE,
  REGISTER_PREMISES_REQUEST,
  REGISTER_PREMISES_SUCCESS,
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
    case CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};

export default premisesReducer;