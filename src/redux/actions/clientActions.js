import {
  FETCH_CLIENT_BY_ID_FAILURE,
  FETCH_CLIENT_BY_ID_REQUEST,
  FETCH_CLIENT_BY_ID_SUCCESS,
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


export const fetchClientByIdRequest = (clientId) => ({
  type: FETCH_CLIENT_BY_ID_REQUEST,
  payload: { clientId }
});

export const fetchClientByIdSuccess = (data) => ({
  type: FETCH_CLIENT_BY_ID_SUCCESS,
  payload: data
});

export const fetchClientByIdFailure = (error) => ({
  type: FETCH_CLIENT_BY_ID_FAILURE,
  payload: error
});