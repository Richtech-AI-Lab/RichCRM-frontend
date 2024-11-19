import { CREATE_ATTORNEY_FAILURE, CREATE_ATTORNEY_REQUEST, CREATE_ATTORNEY_SUCCESS, CREATE_CONTACT_FAILURE, CREATE_CONTACT_REQUEST, CREATE_CONTACT_SUCCESS, DELETE_ATTORNEY_FAILURE, DELETE_ATTORNEY_REQUEST, DELETE_ATTORNEY_SUCCESS, DELETE_CONTACT_FAILURE, DELETE_CONTACT_REQUEST, DELETE_CONTACT_SUCCESS, FETCH_ATTORNEY_BY_ID_FAILURE, FETCH_ATTORNEY_BY_ID_REQUEST, FETCH_ATTORNEY_BY_ID_SUCCESS, FETCH_REALTOR_BY_ID_FAILURE, FETCH_REALTOR_BY_ID_REQUEST, FETCH_REALTOR_BY_ID_SUCCESS, GET_CONTACT_BY_TYPE_FAILURE, GET_CONTACT_BY_TYPE_REQUEST, GET_CONTACT_BY_TYPE_SUCCESS,SET_ATTORNEY_EMPTY,SET_REALTOR_EMPTY,SET_SELECTED_CONTACT,UPDATE_CONTACT_FAILURE, UPDATE_CONTACT_REQUEST, UPDATE_CONTACT_SUCCESS } from "../type";

//Get Case
export const getContactRequest = (payload) => ({
    type: GET_CONTACT_BY_TYPE_REQUEST,
    payload,
});

export const getContactSuccess = (contact) => ({
    type: GET_CONTACT_BY_TYPE_SUCCESS,
    payload: contact,
});

export const getContactFailure = (error) => ({
    type: GET_CONTACT_BY_TYPE_FAILURE,
    payload: error,
});

//Update Contact
export const updateContactRequest = (payload) => ({
    type: UPDATE_CONTACT_REQUEST,
    payload,
});

export const updateContactSuccess = (contact) => ({
    type: UPDATE_CONTACT_SUCCESS,
    payload: contact,
});

export const updateContactFailure = (error) => ({
    type: UPDATE_CONTACT_FAILURE,
    payload: error,
});

//Create Contact
export const createContactRequest = (payload, navigate) => ({
    type: CREATE_CONTACT_REQUEST,
    payload,
    navigate
});

export const createContactSuccess = (contact) => ({
    type: CREATE_CONTACT_SUCCESS,
    payload: contact,
});

export const createContactFailure = (error) => ({
    type: CREATE_CONTACT_FAILURE,
    payload: error,
});

export const setSelectedContact = (contact) => ({
    type: SET_SELECTED_CONTACT,
    payload: contact,
});

export const createAttorneyRequest = (payload) => ({
    type: CREATE_ATTORNEY_REQUEST,
    payload
});

export const createAttorneySuccess = (contact) => ({
    type: CREATE_ATTORNEY_SUCCESS,
    payload: contact,
});

export const createAttorneyFailure = (error) => ({
    type: CREATE_ATTORNEY_FAILURE,
    payload: error,
});

export const deleteAttorneyRequest = (payload) => ({
    type: DELETE_ATTORNEY_REQUEST,
    payload
});

export const deleteAttorneySuccess = (contact) => ({
    type: DELETE_ATTORNEY_SUCCESS,
    payload: contact,
});

export const deleteAttorneyFailure = (error) => ({
    type: DELETE_ATTORNEY_FAILURE,
    payload: error,
});

export const clearAttorney = () => ({
    type: SET_ATTORNEY_EMPTY,
});

export const clearRealtor = () => ({
    type: SET_REALTOR_EMPTY,
});

export const fetchAttorneyByIdsRequest = (payload) => ({
    type: FETCH_ATTORNEY_BY_ID_REQUEST,
    payload
});

export const fetchAttorneyByIdsSuccess = (contact) => ({
    type: FETCH_ATTORNEY_BY_ID_SUCCESS,
    payload: contact,
});

export const fetchAttorneyByIdsFailure = (error) => ({
    type: FETCH_ATTORNEY_BY_ID_FAILURE,
    payload: error,
});

export const fetchRealtorByIdsRequest = (payload) => ({
    type: FETCH_REALTOR_BY_ID_REQUEST,
    payload
});

export const fetchRealtorByIdsSuccess = (contact) => ({
    type: FETCH_REALTOR_BY_ID_SUCCESS,
    payload: contact,
});

export const fetchRealtorByIdsFailure = (error) => ({
    type: FETCH_REALTOR_BY_ID_FAILURE,
    payload: error,
});

export const deleteContactRequest = (payload) => ({
    type: DELETE_CONTACT_REQUEST,
    payload
});

export const deleteContactSuccess = (contact) => ({
    type: DELETE_CONTACT_SUCCESS,
    payload: contact,
});

export const deleteContactFailure = (error) => ({
    type: DELETE_CONTACT_FAILURE,
    payload: error,
});