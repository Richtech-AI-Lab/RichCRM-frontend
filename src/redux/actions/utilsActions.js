import {
  REGISTER_ADDRESS_FAILURE,
  REGISTER_ADDRESS_REQUEST,
  REGISTER_ADDRESS_SUCCESS,
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
