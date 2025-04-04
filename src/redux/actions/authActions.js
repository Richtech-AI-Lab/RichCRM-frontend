import {
  CLEAR_DATA,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  GET_AUTH_USER_FAILURE,
  GET_AUTH_USER_REQUEST,
  GET_AUTH_USER_SUCCESS
} from "../type";

export const loginRequest = (payload) => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

// Registration Actions
export const registerRequest = (payload) => ({
  type: REGISTER_REQUEST,
  payload,
});

export const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

//Forgot Password Actions
export const forgotPasswordRequest = (payload) => ({
  type: FORGOT_PASSWORD_REQUEST,
  payload,
});

export const forgotPasswordSuccess = () => ({
  type: FORGOT_PASSWORD_SUCCESS,
});

export const forgotPasswordFailure = (error) => ({
  type: FORGOT_PASSWORD_FAILURE,
  payload: error,
});

//For clear data
export const clearData = () => ({
  type: CLEAR_DATA,
});

//Delete User Actions
export const deleteUserRequest = (payload) => ({
  type: DELETE_USER_REQUEST,
  payload,
});

export const deleteUserSuccess = () => ({
  type: DELETE_USER_SUCCESS,
});

export const deleteUserFailure = (error) => ({
  type: DELETE_USER_FAILURE,
  payload: error,
});

export const updateUserRequest = (payload) => ({
  type: UPDATE_USER_REQUEST,
  payload,
});

export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

export const updateUserFailure = (error) => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});

export const getAuthUserRequest = () => {
  // console.log('Action: GET_USER_REQUEST dispatched');
  return {
    type: GET_AUTH_USER_REQUEST
  };
};

export const getAuthUserSuccess = (user) => {
  console.log('Action: GET_AUTH_USER_SUCCESS dispatched');
  return {
    type: GET_AUTH_USER_SUCCESS,
    payload: user
  }
};

export const getAuthUserFailure = (error) => ({
  type: GET_AUTH_USER_FAILURE,
  payload: error
});