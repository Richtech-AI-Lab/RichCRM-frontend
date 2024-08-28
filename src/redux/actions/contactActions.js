import { GET_CONTACT_BY_TYPE_FAILURE, GET_CONTACT_BY_TYPE_REQUEST, GET_CONTACT_BY_TYPE_SUCCESS,SET_SELECTED_CONTACT,UPDATE_CONTACT_FAILURE, UPDATE_CONTACT_REQUEST, UPDATE_CONTACT_SUCCESS } from "../type";

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

export const setSelectedContact = (contact) => ({
    type: SET_SELECTED_CONTACT,
    payload: contact,
});

