import {
  FETCH_PREMISES_BY_ID_FAILURE,
  FETCH_PREMISES_BY_ID_REQUEST,
  FETCH_PREMISES_BY_ID_SUCCESS,
  FETCH_PREMISES_BY_QUERY_ID_FAILURE,
  FETCH_PREMISES_BY_QUERY_ID_REQUEST,
  FETCH_PREMISES_BY_QUERY_ID_SUCCESS,
  FETCH_PREMISES_FAILURE,
  FETCH_PREMISES_REQUEST,
  FETCH_PREMISES_SUCCESS,
  REGISTER_PREMISES_FAILURE,
  REGISTER_PREMISES_REQUEST,
  REGISTER_PREMISES_SUCCESS,
} from "../type";

export const registerPremisesRequest = (premises,navigate) => ({
  type: REGISTER_PREMISES_REQUEST,
  payload: premises,
  navigate
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

//Read Premises by Id

export const fetchPremisesByIdRequest = (premisesId) => ({
  type: FETCH_PREMISES_BY_ID_REQUEST,
  payload: { premisesId }
});

export const fetchPremisesByIdSuccess = (data) => ({
  type: FETCH_PREMISES_BY_ID_SUCCESS,
  payload: data
});

export const fetchPremisesByIdFailure = (error) => ({
  type: FETCH_PREMISES_BY_ID_FAILURE,
  payload: error
});

export const fetchPremisesByQueryIdRequest = (premisesId) => ({
  type: FETCH_PREMISES_BY_QUERY_ID_REQUEST,
  payload: { premisesId }
});

export const fetchPremisesByQueryIdSuccess = (data) => ({
  type: FETCH_PREMISES_BY_QUERY_ID_SUCCESS,
  payload: data,
});

export const fetchPremisesByQueryIdFailure = (error) => ({
  type: FETCH_PREMISES_BY_QUERY_ID_FAILURE,
  payload: error,
});
