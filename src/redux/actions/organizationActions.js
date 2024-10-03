import { FETCH_ORG_BY_ID_FAILURE, FETCH_ORG_BY_ID_REQUEST, FETCH_ORG_BY_ID_SUCCESS, REGISTER_ORG_FAILURE, REGISTER_ORG_REQUEST, REGISTER_ORG_SUCCESS } from "../type";

  export const registerOrganizationRequest = (organizationData,navigate) => ({
    type: REGISTER_ORG_REQUEST,
    payload: organizationData,
    navigate
  });
  
  export const registerOrganizationSuccess = (response) => ({
    type: REGISTER_ORG_SUCCESS,
    payload: response,
  });
  
  export const registerOrganizationFailure = (error) => ({
    type: REGISTER_ORG_FAILURE,
    payload: error,
  });

  export const fetchOrganizationByIdRequest = (organizationId) => ({
    type: FETCH_ORG_BY_ID_REQUEST,
    payload: { organizationId }
  });
  
  export const fetchOrganizationByIdSuccess = (data) => ({
    type: FETCH_ORG_BY_ID_SUCCESS,
    payload: data
  });
  
  export const fetchOrganizationByIdFailure = (error) => ({
    type: FETCH_ORG_BY_ID_FAILURE,
    payload: error
  });
  
