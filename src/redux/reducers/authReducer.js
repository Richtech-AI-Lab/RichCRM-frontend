import { combineReducers } from "redux";
import { 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE, 
  LOGOUT, 
  REGISTER_REQUEST, 
  REGISTER_SUCCESS, 
  REGISTER_FAILURE, 
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  CLEAR_DATA
} from "../type";

const initialLoginState = {
  user: null,
  loading: false,
  error: null,
};

const initialRegisterState = {
  user: null,
  loading: false,
  error: null,
};

const initialForgotPasswordState = {
  loading: false,
  error: null,
  success: false,
};
const loginReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return initialLoginState; 
      case CLEAR_DATA:
      return initialLoginState;
    default:
      return state;
  }
};

const registerReducer = (state = initialRegisterState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case CLEAR_DATA:
      return initialRegisterState;
    default:
      return state;
  }
};

const forgotPasswordReducer = (state = initialForgotPasswordState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
      };
    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
      case CLEAR_DATA:
      return initialForgotPasswordState
    default:
      return state;
  }
};

const authReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  forgotPassword: forgotPasswordReducer,

});

export default authReducer;
