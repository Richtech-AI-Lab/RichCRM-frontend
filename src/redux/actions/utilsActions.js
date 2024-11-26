import {
  CREATE_ADD_CLIENT_ADDRESS_REQUEST,
  CREATE_ADDRESS_CONTACT_REQUEST,
  CREATE_ADDRESS_REQUEST,
  FETCH_ADDRESS_BY_ID_FAILURE,
  FETCH_ADDRESS_BY_ID_REQUEST,
  FETCH_ADDRESS_BY_ID_SUCCESS,
  REGISTER_ADDRESS_FAILURE,
  REGISTER_ADDRESS_REQUEST,
  REGISTER_ADDRESS_SUCCESS,
  SEND_MAIL_FAILURE,
  SEND_MAIL_REQUEST,
  SEND_MAIL_SUCCESS,
} from "../type";

export const registerAddressRequest = (address,navigate) => ({
  type: REGISTER_ADDRESS_REQUEST,
  payload: address,
  navigate
});

export const registerAddressSuccess = (response) => ({
  type: REGISTER_ADDRESS_SUCCESS,
  payload: response,
});

export const registerAddressFailure = (error) => ({
  type: REGISTER_ADDRESS_FAILURE,
  payload: error,
});

export const createAddressContactRequest = (address) => ({
  type: CREATE_ADDRESS_CONTACT_REQUEST,
  payload: address,
});

export const createAddressRequest = (address) => ({
  type: CREATE_ADDRESS_REQUEST,
  payload: address,
});

export const fetchAddressByIdRequest = (data) => ({
  type: FETCH_ADDRESS_BY_ID_REQUEST,
  payload:data
});

export const fetchAddressByIdSuccess = (data) => ({
  type: FETCH_ADDRESS_BY_ID_SUCCESS,
  payload: data
});

export const fetchAddressByIdFailure = (error) => ({
  type: FETCH_ADDRESS_BY_ID_FAILURE,
  payload: error
});


export const sendEmailRequest = (data) => ({
  type: SEND_MAIL_REQUEST,
  payload:data
});

export const sendEmailSuccess = (data) => ({
  type: SEND_MAIL_SUCCESS,
  payload: data
});

export const sendEmailFailure = (error) => ({
  type: SEND_MAIL_FAILURE,
  payload: error
});

export const createAddClientAddressRequest = (address) => ({
  type: CREATE_ADD_CLIENT_ADDRESS_REQUEST,
  payload: address,
});

