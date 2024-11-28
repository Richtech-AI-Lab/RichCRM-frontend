import {
  CLEAN_ADDITIONAL_CLIENT,
  CLEAR_ORGANIZATION_DATA,
  FETCH_ADDITIONAL_CLIENTS_BY_IDS_FAILURE,
  FETCH_ADDITIONAL_CLIENTS_BY_IDS_REQUEST,
  FETCH_ADDITIONAL_CLIENTS_BY_IDS_SUCCESS,
  FETCH_ADDITIONAL_ORG_BY_IDS_FAILURE,
  FETCH_ADDITIONAL_ORG_BY_IDS_REQUEST,
  FETCH_ADDITIONAL_ORG_BY_IDS_SUCCESS,
  FETCH_CLIENT_BY_ID_FAILURE,
  FETCH_CLIENT_BY_ID_REQUEST,
  FETCH_CLIENT_BY_ID_SUCCESS,
  FETCH_ORG_BY_ID_FAILURE,
  FETCH_ORG_BY_ID_REQUEST,
  FETCH_ORG_BY_ID_SUCCESS,
  FETCH_ORG_BY_TYPE_FAILURE,
  FETCH_ORG_BY_TYPE_REQUEST,
  FETCH_ORG_BY_TYPE_SUCCESS,
  REGISTER_CLIENT_FAILURE,
  REGISTER_CLIENT_REQUEST,
  REGISTER_CLIENT_SUCCESS,
  SET_SELECTED_ORG,
  UPDATE_ADD_ORG_BY_ID_FAILURE,
  UPDATE_ADD_ORG_BY_ID_REQUEST,
  UPDATE_ADD_ORG_BY_ID_SUCCESS,
  UPDATE_CLIENT_BY_ID_FAILURE,
  UPDATE_CLIENT_BY_ID_REQUEST,
  UPDATE_CLIENT_BY_ID_SUCCESS,
  UPDATE_ORG_BY_ID_FAILURE,
  UPDATE_ORG_BY_ID_REQUEST,
  UPDATE_ORG_BY_ID_SUCCESS,
} from "../type";

const initialState = {
  loading: false,
  organization: null,
  error: null,
  additionalOrganization: null,
};

const organizationReducer = (state = initialState, action) => {
  console.log(state.additionalOrganization, "______", action?.payload)
  switch (action.type) {
    case FETCH_ORG_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ORG_BY_ID_SUCCESS:
      return { ...state, loading: false, organization: action.payload, error: null };
    case FETCH_ORG_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_ORG_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_ORG_BY_ID_SUCCESS:
      return { ...state, loading: false, organization: action.payload, error: null };
    case UPDATE_ORG_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    // case REGISTER_CLIENT_REQUEST:
    //   return { ...state, loading: true };
    // case REGISTER_CLIENT_SUCCESS:
    //   return { ...state, loading: false, organization: action.payload, error: null };
    // case REGISTER_CLIENT_FAILURE:
    //   return { ...state, loading: false, error: action.payload };
    case FETCH_ADDITIONAL_ORG_BY_IDS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ADDITIONAL_ORG_BY_IDS_SUCCESS:
      return { ...state, loading: false, additionalOrganization: action.payload, error: null };
    case FETCH_ADDITIONAL_ORG_BY_IDS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FETCH_ORG_BY_TYPE_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ORG_BY_TYPE_SUCCESS:
      return { ...state, loading: false, organization: action.payload, error: null };
    case FETCH_ORG_BY_TYPE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    // case CLEAN_ADDITIONAL_CLIENT:
    //   return { ...state, loading: false, additionalClient: null, error: null };
    case SET_SELECTED_ORG:
      // console.log(action.payload, "action.payload")
      return {
        ...state,
        loading: false,
        selectedItem: action.payload,
      };
    case CLEAR_ORGANIZATION_DATA:
      return initialState;
    case UPDATE_ADD_ORG_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_ADD_ORG_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        additionalOrganization: state.additionalOrganization.map((organization) =>
          organization.organizationId === action.payload.organizationId
            ? { ...action.payload }
            : organization
        ),
        error: null,
      };
    case UPDATE_ADD_ORG_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default organizationReducer;
