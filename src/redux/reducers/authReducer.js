import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLEAR_DATA,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  GET_AUTH_USER_REQUEST,
  GET_AUTH_USER_SUCCESS,
  GET_AUTH_USER_FAILURE
} from "../type";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case UPDATE_USER_REQUEST: 
      return {
        ...state,
        loading: true,
        error: null,
      };
      
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case UPDATE_USER_SUCCESS: 
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
      
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case UPDATE_USER_FAILURE: 
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      
    case LOGOUT:
    case CLEAR_DATA:
      return initialState;

    case GET_AUTH_USER_REQUEST:
      return { ...state, loading: true, error: null };
  
    case GET_AUTH_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };
  
    case GET_AUTH_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
      
    default:
      return state;
  }
};

export default authReducer;
