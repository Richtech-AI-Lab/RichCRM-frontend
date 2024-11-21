import { CREATE_ATTORNEY_FAILURE, CREATE_ATTORNEY_REQUEST, CREATE_ATTORNEY_SUCCESS, CREATE_BROKER_FAILURE, CREATE_BROKER_REQUEST, CREATE_BROKER_SUCCESS, CREATE_CONTACT_FAILURE, CREATE_CONTACT_REQUEST, CREATE_CONTACT_SUCCESS, CREATE_REALTOR_FAILURE, CREATE_REALTOR_REQUEST, CREATE_REALTOR_SUCCESS, DELETE_ATTORNEY_FAILURE, DELETE_ATTORNEY_REQUEST, DELETE_ATTORNEY_SUCCESS, DELETE_BROKER_FAILURE, DELETE_BROKER_REQUEST, DELETE_BROKER_SUCCESS, DELETE_CONTACT_FAILURE, DELETE_CONTACT_REQUEST, DELETE_CONTACT_SUCCESS, DELETE_REALTOR_FAILURE, DELETE_REALTOR_REQUEST, DELETE_REALTOR_SUCCESS, FETCH_ATTORNEY_BY_ID_FAILURE, FETCH_ATTORNEY_BY_ID_REQUEST, FETCH_ATTORNEY_BY_ID_SUCCESS, FETCH_BROKER_BY_ID_FAILURE, FETCH_BROKER_BY_ID_REQUEST, FETCH_BROKER_BY_ID_SUCCESS, FETCH_REALTOR_BY_ID_FAILURE, FETCH_REALTOR_BY_ID_REQUEST, FETCH_REALTOR_BY_ID_SUCCESS, GET_CONTACT_BY_TYPE_FAILURE, GET_CONTACT_BY_TYPE_REQUEST, GET_CONTACT_BY_TYPE_SUCCESS,READ_CASE_BY_CONTACT_FAILURE,READ_CASE_BY_CONTACT_REQ,READ_CASE_BY_CONTACT_SUCCESS,SET_ATTORNEY_EMPTY,SET_BROKER_EMPTY,SET_CONTACT_CASES_EMPTY,SET_REALTOR_EMPTY,SET_SELECTED_CONTACT,UPDATE_CONTACT_FAILURE, UPDATE_CONTACT_REQUEST, UPDATE_CONTACT_SUCCESS } from "../type";

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

export const clearContactCases = () => ({
    type: SET_CONTACT_CASES_EMPTY,
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

export const getCaseByContactRequest = (payload) => ({
    type: READ_CASE_BY_CONTACT_REQ,
    payload,
});
export const getCaseByContactSuccess = (payload) => ({
    type: READ_CASE_BY_CONTACT_SUCCESS,
    payload,
});
export const getCaseByContactFailure = (payload) => ({
    type: READ_CASE_BY_CONTACT_FAILURE,
    payload,
});

export const createBrokerRequest = (payload) => ({
    type: CREATE_BROKER_REQUEST,
    payload
});

export const createBrokerSuccess = (contact) => ({
    type: CREATE_BROKER_SUCCESS,
    payload: contact,
});

export const createBrokerFailure = (error) => ({
    type: CREATE_BROKER_FAILURE,
    payload: error,
});

export const deleteBrokerRequest = (payload) => ({
    type: DELETE_BROKER_REQUEST,
    payload
});

export const deleteBrokerSuccess = (contact) => ({
    type: DELETE_BROKER_SUCCESS,
    payload: contact,
});

export const deleteBrokerFailure = (error) => ({
    type: DELETE_BROKER_FAILURE,
    payload: error,
});

export const clearBroker = () => ({
    type: SET_BROKER_EMPTY,
});

export const fetchBrokerByIdsRequest = (payload) => ({
    type: FETCH_BROKER_BY_ID_REQUEST,
    payload
});

export const fetchBrokerByIdsSuccess = (contact) => ({
    type: FETCH_BROKER_BY_ID_SUCCESS,
    payload: contact,
});

export const fetchBrokerByIdsFailure = (error) => ({
    type: FETCH_BROKER_BY_ID_FAILURE,
    payload: error,
});