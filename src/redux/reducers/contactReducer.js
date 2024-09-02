import { GET_CONTACT_BY_TYPE_FAILURE, GET_CONTACT_BY_TYPE_REQUEST, GET_CONTACT_BY_TYPE_SUCCESS, GET_CONTACT_REQUEST, GET_CONTACT_SUCCESS, SET_SELECTED_CONTACT, UPDATE_CONTACT_FAILURE, UPDATE_CONTACT_REQUEST, UPDATE_CONTACT_SUCCESS } from "../type";

const initialState = {
  loading: false,
  contact: null,
  error: null,
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
    case SET_SELECTED_CONTACT:
      return {
        ...state,
        contact:{
          ...state.contact,
          selectedItem: action.payload, 
        }
      };
    default:
      return state;
  }
};

export default contactReducer;
