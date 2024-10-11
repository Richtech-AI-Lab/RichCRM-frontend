import { CREATE_ORG_REQUEST, FETCH_ADDITIONAL_ORG_BY_IDS_FAILURE, FETCH_ADDITIONAL_ORG_BY_IDS_REQUEST, FETCH_ADDITIONAL_ORG_BY_IDS_SUCCESS, FETCH_ORG_BY_ID_FAILURE, FETCH_ORG_BY_ID_REQUEST, FETCH_ORG_BY_ID_SUCCESS, FETCH_ORG_BY_TYPE_FAILURE, FETCH_ORG_BY_TYPE_REQUEST, FETCH_ORG_BY_TYPE_SUCCESS, REGISTER_ORG_FAILURE, REGISTER_ORG_REQUEST, REGISTER_ORG_SUCCESS, SET_SELECTED_ORG, UPDATE_ORG_BY_ID_FAILURE, UPDATE_ORG_BY_ID_REQUEST, UPDATE_ORG_BY_ID_SUCCESS } from "../type";

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
  
  export const fetchAdditionalOrganizationByIdsRequest = (data) => ({
    type: FETCH_ADDITIONAL_ORG_BY_IDS_REQUEST,
    payload: data
  });
  export const fetchAdditionalOrganizationByIdsSuccess = (data) => ({
    type: FETCH_ADDITIONAL_ORG_BY_IDS_SUCCESS,
    payload: data
  });
  export const fetchAdditionalOrganizationByIdsFailure = (error) => ({
    type: FETCH_ADDITIONAL_ORG_BY_IDS_FAILURE,
    payload: error
  });

  export const fetchOrganizationByTypeRequest = (data) => ({
    type: FETCH_ORG_BY_TYPE_REQUEST,
    payload: data
  });
  
  export const fetchOrganizationByTypeSuccess = (data) => ({
    type: FETCH_ORG_BY_TYPE_SUCCESS,
    payload: data
  });
  
  export const fetchOrganizationByTypeFailure = (error) => ({
    type: FETCH_ORG_BY_TYPE_FAILURE,
    payload: error
  });

  export const updateOrganizationByIdRequest = (organizationData) => ({
    type: UPDATE_ORG_BY_ID_REQUEST,
    payload: organizationData
  });
  
  export const updateOrganizationByIdSuccess = (data) => ({
    type: UPDATE_ORG_BY_ID_SUCCESS,
    payload: data
  });
  
  export const updateOrganizationByIdFailure = (error) => ({
    type: UPDATE_ORG_BY_ID_FAILURE,
    payload: error
  });

  export const setSelectedOrganization = (organization) => ({
    type: SET_SELECTED_ORG,
    payload: organization,
});

export const createOrgContactRequest = (organizationData,navigate) => ({
  type: CREATE_ORG_REQUEST,
  payload: organizationData,
  navigate
});
