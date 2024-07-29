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
  CLEAR_DATA,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE
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

const initialDeleteUserState = {
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

const deleteUserReducer = (state = initialDeleteUserState, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case CLEAR_DATA:
      return initialDeleteUserState
    default:
      return state;
  }
};

const authReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  forgotPassword: forgotPasswordReducer,
  deleteUser: deleteUserReducer
});

export default authReducer;
