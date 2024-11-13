import { CREATE_TAG_FAILURE, CREATE_TAG_REQUEST, CREATE_TAG_SUCCESS, DELETE_TAG_FAILURE, DELETE_TAG_REQUEST, DELETE_TAG_SUCCESS, FETCH_ALL_TAG_FAILURE, FETCH_ALL_TAG_REQUEST, FETCH_ALL_TAG_SUCCESS } from "../type";

export const createTagRequest = (payload) => ({
    type: CREATE_TAG_REQUEST,
    payload
});

export const createTagSuccess = (contact) => ({
    type: CREATE_TAG_SUCCESS,
    payload: contact,
});

export const createTagFailure = (error) => ({
    type: CREATE_TAG_FAILURE,
    payload: error,
});

export const deleteTagRequest = (payload) => ({
    type: DELETE_TAG_REQUEST,
    payload
});

export const deleteTagSuccess = (contact) => ({
    type: DELETE_TAG_SUCCESS,
    payload: contact,
});

export const deleteTagFailure = (error) => ({
    type: DELETE_TAG_FAILURE,
    payload: error,
});

export const fetchAllTagsRequest = () => ({
    type: FETCH_ALL_TAG_REQUEST
  });
  
  export const fetchAllTagsSuccess = (response) => ({
    type: FETCH_ALL_TAG_SUCCESS,
    payload: response,
  });
  
  export const fetchAllTagsFailure = (error) => ({
    type: FETCH_ALL_TAG_FAILURE,
    payload: error,
  });