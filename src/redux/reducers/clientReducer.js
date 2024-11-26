import {
  CLEAN_ADDITIONAL_CLIENT,
  CLEAR_CLIENT_DATA,
  FETCH_ADDITIONAL_CLIENTS_BY_IDS_FAILURE,
  FETCH_ADDITIONAL_CLIENTS_BY_IDS_REQUEST,
  FETCH_ADDITIONAL_CLIENTS_BY_IDS_SUCCESS,
  FETCH_CLIENT_BY_ID_FAILURE,
  FETCH_CLIENT_BY_ID_REQUEST,
  FETCH_CLIENT_BY_ID_SUCCESS,
  FETCH_CLIENTS_BY_IDS_REQUEST,
  REGISTER_CLIENT_FAILURE,
  REGISTER_CLIENT_REQUEST,
  REGISTER_CLIENT_SUCCESS,
  UPDATE_ADD_CLIENT_BY_ID_FAILURE,
  UPDATE_ADD_CLIENT_BY_ID_REQUEST,
  UPDATE_ADD_CLIENT_BY_ID_SUCCESS,
  UPDATE_CLIENT_BY_ID_FAILURE,
  UPDATE_CLIENT_BY_ID_REQUEST,
  UPDATE_CLIENT_BY_ID_SUCCESS,
} from "../type";

const initialState = {
  loading: false,
  client: null,
  error: null,
  additionalClient: null,
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLIENT_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CLIENT_BY_ID_SUCCESS:
      return { ...state, loading: false, client: action.payload, error: null };
    case FETCH_CLIENT_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_CLIENT_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_CLIENT_BY_ID_SUCCESS:
      return { ...state, loading: false, client: action.payload, error: null };
    case UPDATE_CLIENT_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case REGISTER_CLIENT_REQUEST:
      return { ...state, loading: true };
    case REGISTER_CLIENT_SUCCESS:
      return { ...state, loading: false, client: action.payload, error: null };
    case REGISTER_CLIENT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_ADDITIONAL_CLIENTS_BY_IDS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ADDITIONAL_CLIENTS_BY_IDS_SUCCESS:
      return { ...state, loading: false, additionalClient: action.payload, error: null };
    case FETCH_ADDITIONAL_CLIENTS_BY_IDS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_ADD_CLIENT_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
      case UPDATE_ADD_CLIENT_BY_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          additionalClient: state.additionalClient.map((client) =>
            client.clientId === action.payload.clientId
              ? { ...action.payload }
              : client
          ),
          error: null,
        };
    case UPDATE_ADD_CLIENT_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CLEAN_ADDITIONAL_CLIENT:
      return { ...state, loading: false, additionalClient: null, error: null };
    case CLEAR_CLIENT_DATA:
      return initialState;
    default:
      return state;
  }
};

export default clientReducer;
