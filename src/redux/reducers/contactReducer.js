import { CREATE_ATTORNEY_FAILURE, CREATE_ATTORNEY_REQUEST, CREATE_ATTORNEY_SUCCESS, CREATE_BROKER_FAILURE, CREATE_BROKER_REQUEST, CREATE_BROKER_SUCCESS, CREATE_CONTACT_FAILURE, CREATE_CONTACT_REQUEST, CREATE_CONTACT_SUCCESS, CREATE_REALTOR_FAILURE, CREATE_REALTOR_REQUEST, CREATE_REALTOR_SUCCESS, DELETE_ATTORNEY_SUCCESS, DELETE_BROKER_SUCCESS, DELETE_CONTACT_SUCCESS, DELETE_REALTOR_SUCCESS, FETCH_ATTORNEY_BY_ID_FAILURE, FETCH_ATTORNEY_BY_ID_REQUEST, FETCH_ATTORNEY_BY_ID_SUCCESS, FETCH_BROKER_BY_ID_FAILURE, FETCH_BROKER_BY_ID_REQUEST, FETCH_BROKER_BY_ID_SUCCESS, FETCH_REALTOR_BY_ID_FAILURE, FETCH_REALTOR_BY_ID_REQUEST, FETCH_REALTOR_BY_ID_SUCCESS, GET_CONTACT_BY_KEYWORD_FAILURE, GET_CONTACT_BY_KEYWORD_REQUEST, GET_CONTACT_BY_KEYWORD_SUCCESS, GET_CONTACT_BY_TYPE_FAILURE, GET_CONTACT_BY_TYPE_REQUEST, GET_CONTACT_BY_TYPE_SUCCESS, GET_MULTIPLE_CONTACT_BY_TYPE_FAILURE, GET_MULTIPLE_CONTACT_BY_TYPE_REQUEST, GET_MULTIPLE_CONTACT_BY_TYPE_SUCCESS, READ_CASE_BY_CONTACT_FAILURE, READ_CASE_BY_CONTACT_REQ, READ_CASE_BY_CONTACT_SUCCESS, SET_ATTORNEY_EMPTY, SET_BROKER_EMPTY, SET_CONTACT_CASES_EMPTY, SET_REALTOR_EMPTY, SET_SELECTED_CONTACT, UPDATE_CONTACT_FAILURE, UPDATE_CONTACT_REQUEST, UPDATE_CONTACT_SUCCESS } from "../type";

const initialState = {
  loading: false,
  contact: null,
  attorney: [],
  error: null,
  cases: []
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACT_BY_TYPE_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_CONTACT_BY_TYPE_SUCCESS:
      return { ...state, loading: false, contact: action.payload.data, error: null };
    case GET_CONTACT_BY_TYPE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_CONTACT_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_CONTACT_SUCCESS:
      return { ...state, loading: false, contact: action.payload, error: null };
    case UPDATE_CONTACT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CREATE_CONTACT_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_CONTACT_SUCCESS:
      return { ...state, loading: false, contact: action.payload, error: null };
    case CREATE_CONTACT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_CONTACT_BY_KEYWORD_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_CONTACT_BY_KEYWORD_SUCCESS:
      return { ...state, loading: false, contact: action.payload.data, error: null };
    case GET_CONTACT_BY_KEYWORD_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CREATE_ATTORNEY_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_ATTORNEY_SUCCESS:
      return { ...state, loading: false, attorney: [...state.attorney, action.payload], error: null };
    case CREATE_ATTORNEY_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_ATTORNEY_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ATTORNEY_BY_ID_SUCCESS:
      return { ...state, loading: false, attorney: action.payload, error: null };
    case FETCH_ATTORNEY_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_REALTOR_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_REALTOR_BY_ID_SUCCESS:
      return { ...state, loading: false, realtor: action.payload, error: null };
    case FETCH_REALTOR_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_CONTACT_SUCCESS:
      return { ...state, loading: false, contact: state.contact.filter(item => item.contactId !== action.payload), error: null };
    case DELETE_ATTORNEY_SUCCESS:
      return { ...state, loading: false, attorney: state.attorney.filter(item => item.contactId !== action.payload), error: null };
    case SET_ATTORNEY_EMPTY:
      return { ...state, loading: false, attorney: [], error: action.payload };
    case SET_REALTOR_EMPTY:
      return { ...state, loading: false, realtor: [], error: action.payload };
    case SET_CONTACT_CASES_EMPTY:
      return { ...state, loading: false, cases: [] };
    case SET_SELECTED_CONTACT:
      // console.log(action.payload, "action.payload")
      return {
        ...state,
        loading: false,
        selectedItem: action.payload || null,
      };
    case READ_CASE_BY_CONTACT_REQ:
      return { ...state, loading: true, error: null };
    case READ_CASE_BY_CONTACT_SUCCESS:
      return { ...state, loading: false, cases: [action.payload], error: null };
    case READ_CASE_BY_CONTACT_FAILURE:
      return { ...state, loading: false, cases: [], error: action.payload };
    case SET_BROKER_EMPTY:
      return { ...state, loading: false, broker: [], error: null };
    case CREATE_BROKER_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_BROKER_SUCCESS:
      return { ...state, loading: false, broker: [...state.broker, action.payload], error: null };
    case CREATE_BROKER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case DELETE_BROKER_SUCCESS:
      return { ...state, loading: false, broker: state.broker.filter(item => item.contactId !== action.payload), error: null };
    case FETCH_BROKER_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_BROKER_BY_ID_SUCCESS:
      return { ...state, loading: false, broker: action.payload, error: null };
    case FETCH_BROKER_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
      case GET_MULTIPLE_CONTACT_BY_TYPE_REQUEST:
        return { ...state, loading: true, error: null };
      case GET_MULTIPLE_CONTACT_BY_TYPE_SUCCESS:
        return { ...state, loading: false, contact: action.payload, error: null };
      case GET_MULTIPLE_CONTACT_BY_TYPE_FAILURE:
        return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default contactReducer;
