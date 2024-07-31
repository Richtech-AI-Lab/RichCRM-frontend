import {
  REGISTER_CLIENT_FAILURE,
  REGISTER_CLIENT_REQUEST,
  REGISTER_CLIENT_SUCCESS,
} from "../type";

export const registerClientRequest = (clientData) => ({
  type: REGISTER_CLIENT_REQUEST,
  payload: clientData,
});

export const registerClientSuccess = (response) => ({
  type: REGISTER_CLIENT_SUCCESS,
  payload: response,
});

export const registerClientFailure = (error) => ({
  type: REGISTER_CLIENT_FAILURE,
  payload: error,
});
