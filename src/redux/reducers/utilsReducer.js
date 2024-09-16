import {
  CLEAR_DATA,
  FETCH_ADDRESS_BY_ID_FAILURE,
  FETCH_ADDRESS_BY_ID_REQUEST,
  FETCH_ADDRESS_BY_ID_SUCCESS,
  REGISTER_ADDRESS_FAILURE,
  REGISTER_ADDRESS_REQUEST,
  REGISTER_ADDRESS_SUCCESS,
  SEND_MAIL_FAILURE,
  SEND_MAIL_REQUEST,
  SEND_MAIL_SUCCESS,
} from "../type";

const initialState = {
  loading: false,
  address: null,
  error: null,
};

const utilsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        address: action.payload,
      };
    case REGISTER_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_ADDRESS_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ADDRESS_BY_ID_SUCCESS:
      return { ...state, loading: false, address: action.payload, error: null };
    case FETCH_ADDRESS_BY_ID_FAILURE:
      return { ...state, address:[], loading: false, error: action.payload };
    case CLEAR_DATA:
      return initialState;
    case SEND_MAIL_REQUEST:
      return { ...state, loading: true, error: null };
    case SEND_MAIL_SUCCESS:
      return { ...state, loading: false, error: null };
    case SEND_MAIL_FAILURE:
      return { ...state, loading: false, error: null };
    default:
      return state;
  }
};

export default utilsReducer;
