import {
  REGISTER_CLIENT_FAILURE,
  REGISTER_CLIENT_REQUEST,
  REGISTER_CLIENT_SUCCESS,
} from "../type";

export const registerClientRequest = (clientData,navigate) => ({
  type: REGISTER_CLIENT_REQUEST,
  payload: clientData,
  navigate
});

export const registerClientSuccess = (response) => ({
  type: REGISTER_CLIENT_SUCCESS,
  payload: response,
});

export const registerClientFailure = (error) => ({
  type: REGISTER_CLIENT_FAILURE,
  payload: error,
});
