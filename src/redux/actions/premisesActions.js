import {
  FETCH_PREMISES_FAILURE,
  FETCH_PREMISES_REQUEST,
  FETCH_PREMISES_SUCCESS,
  REGISTER_PREMISES_FAILURE,
  REGISTER_PREMISES_REQUEST,
  REGISTER_PREMISES_SUCCESS,
} from "../type";

export const registerPremisesRequest = (premises) => ({
  type: REGISTER_PREMISES_REQUEST,
  payload: premises,
});

export const registerPremisesSuccess = (response) => ({
  type: REGISTER_PREMISES_SUCCESS,
  payload: response,
});

export const registerPremisesFailure = (error) => ({
  type: REGISTER_PREMISES_FAILURE,
  payload: error,
});

//Read Premises by AddressId Actions
export const fetchPremisesRequest = (addressId) => ({
  type: FETCH_PREMISES_REQUEST,
  payload: addressId,
});

export const fetchPremisesSuccess = (data) => ({
  type: FETCH_PREMISES_SUCCESS,
  payload: data,
});

export const fetchPremisesFailure = (error) => ({
  type: FETCH_PREMISES_FAILURE,
  payload: error,
});
