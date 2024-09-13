import {
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
  UPDATE_CLIENT_BY_ID_FAILURE,
  UPDATE_CLIENT_BY_ID_REQUEST,
  UPDATE_CLIENT_BY_ID_SUCCESS,
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

export const updateClientByIdRequest = (clientData) => ({
  type: UPDATE_CLIENT_BY_ID_REQUEST,
  payload: clientData
});

export const updateClientByIdSuccess = (data) => ({
  type: UPDATE_CLIENT_BY_ID_SUCCESS,
  payload: data
});

export const updateClientByIdFailure = (error) => ({
  type: UPDATE_CLIENT_BY_ID_FAILURE,
  payload: error
});

export const fetchAdditionalClientByIdsRequest = (data) => ({
  type: FETCH_ADDITIONAL_CLIENTS_BY_IDS_REQUEST,
  payload: data
});
export const fetchAdditionalClientByIdsSuccess = (data) => ({
  type: FETCH_ADDITIONAL_CLIENTS_BY_IDS_SUCCESS,
  payload: data
});
export const fetchAdditionalClientByIdsFailure = (error) => ({
  type: FETCH_ADDITIONAL_CLIENTS_BY_IDS_FAILURE,
  payload: error
});