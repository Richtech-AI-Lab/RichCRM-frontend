import {
  CLEAR_DATA,
  FETCH_CLIENT_BY_ID_FAILURE,
  FETCH_CLIENT_BY_ID_REQUEST,
  FETCH_CLIENT_BY_ID_SUCCESS,
  REGISTER_CLIENT_FAILURE,
  REGISTER_CLIENT_REQUEST,
  REGISTER_CLIENT_SUCCESS,
} from "../type";

const initialState = {
  loading: false,
  client: null,
  error: null,
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLIENT_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CLIENT_BY_ID_SUCCESS:
      return { ...state, loading: false, client: action.payload, error: null };
    case FETCH_CLIENT_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case REGISTER_CLIENT_REQUEST:
      return { ...state, loading: true };
    case REGISTER_CLIENT_SUCCESS:
      return { ...state, loading: false, client: action.payload, error: null };
    case REGISTER_CLIENT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};

export default clientReducer;
