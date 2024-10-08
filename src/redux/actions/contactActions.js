import { CREATE_ATTORNEY_FAILURE, CREATE_ATTORNEY_REQUEST, CREATE_ATTORNEY_SUCCESS, CREATE_CONTACT_FAILURE, CREATE_CONTACT_REQUEST, CREATE_CONTACT_SUCCESS, GET_CONTACT_BY_TYPE_FAILURE, GET_CONTACT_BY_TYPE_REQUEST, GET_CONTACT_BY_TYPE_SUCCESS,SET_ATTORNEY_EMPTY,SET_SELECTED_CONTACT,UPDATE_CONTACT_FAILURE, UPDATE_CONTACT_REQUEST, UPDATE_CONTACT_SUCCESS } from "../type";

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

export const clearAttorney = () => ({
    type: SET_ATTORNEY_EMPTY,
});
