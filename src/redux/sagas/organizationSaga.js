import { CREATE_ORG_REQUEST, FETCH_ADDITIONAL_ORG_BY_IDS_REQUEST, FETCH_ORG_BY_ID_REQUEST, FETCH_ORG_BY_TYPE_REQUEST, REGISTER_ORG_REQUEST, UPDATE_ADD_ORG_BY_ID_REQUEST, UPDATE_ORG_BY_ID_REQUEST } from "../type";
import { API_ENDPOINTS, ROUTES } from "../../constants/api";
import { getRequest, postRequest } from "../../axios/interceptor";
import { call, put } from "redux-saga/effects";
import { handleError } from "../../utils/eventHandler";
import { all } from "redux-saga/effects";
import { toast } from "react-toastify";
import { takeLatest } from "redux-saga/effects";
import { registerAddressRequest } from "../actions/utilsActions";
import { fetchAdditionalOrganizationByIdsFailure, fetchAdditionalOrganizationByIdsSuccess, fetchOrganizationByIdFailure, fetchOrganizationByIdSuccess, fetchOrganizationByTypeFailure, fetchOrganizationByTypeSuccess, setSelectedOrganization, updateAddOrganizationByIdFailure, updateAddOrganizationByIdSuccess, updateOrganizationByIdFailure, updateOrganizationByIdSuccess } from "../actions/organizationActions";
import { updateClientByIdSuccess } from "../actions/clientActions";
import { takeEvery } from "redux-saga/effects";


function* registerOrganization(action) {

  try {
    const { payload, navigate } = action;
    let details = payload.casePayload.clientType == 1 ? payload.companyDetails : payload.trustDetail;
    let list = payload.casePayload.clientType == 1 ? payload.companyList : payload.trustList;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.REGISTER_ORGANIZATION, details)
    );
    const organizationListRes = yield all(
      list?.map(companydetails =>
        call(postRequest, API_ENDPOINTS.REGISTER_ORGANIZATION, companydetails)
      )
    );
    const organizationIds = organizationListRes.map(res => res.data.data[0].organizationId);

    // yield put(registerorganizationSuccess(response.data));
    if (response.status == 200) {
      const updatedPayload = {
        ...payload,
        casePayload: {
          ...payload.casePayload,
          additionalOrganizations: organizationIds,
          organizationId: response.data?.data[0]?.organizationId,
        }
      };
      yield put(registerAddressRequest(updatedPayload, navigate))
      toast.success("Organization created successfully");
    }
  } catch (error) {
    handleError(error)
    // yield put(registerOrganizationFailure(error.response?.data || error));
  }
}


function* fetchOrganizationById(action) {
  try {
    const { organizationId } = action.payload;
    const orgResponse = yield call(() =>
      getRequest(`${API_ENDPOINTS.FETCH_ORGANIZATION_BY_ID}/${organizationId}`)
    );
    if (orgResponse.status == 200 && orgResponse?.data?.data[0]?.addressId) {
      let payload = {
        addressId: orgResponse?.data?.data[0]?.addressId,
        // addressId: 'Virginia Beach VA 23462-3012',
      }
      const addResponse = yield call(() => postRequest(API_ENDPOINTS.FETCH_ADDRESS_BY_QUERY_ID, payload));
      orgResponse.data.data[0] = { ...orgResponse?.data?.data[0], ...addResponse?.data?.data[0] };
    }
    yield put(fetchOrganizationByIdSuccess(orgResponse.data));
  } catch (error) {
    handleError(error)
    yield put(fetchOrganizationByIdFailure(error.response.data || error));
  }
}

function* fetchOrganizationsByIds(action) {
  try {
    const organizationIds = action.payload;

    const organizationResponses = yield all(
      organizationIds.map(organizationId =>
        call(getRequest, `${API_ENDPOINTS.FETCH_ORGANIZATION_BY_ID}/${organizationId}`)
      )
    );
    
    // Map over responses to extract the relevant data
    const organizations = organizationResponses.map(response => response?.data?.data[0]);
    console.log(organizations, "addressResponses")
    
    // const addressResponses = yield all(
    //   organizations.map(org =>
    //     call(postRequest, API_ENDPOINTS.FETCH_ADDRESS_BY_QUERY_ID, { addressId: org.addressId })
    //   )
    // );

    // Merge address data into the respective clients
    const mergedOrganizations = organizations?.map((client, index) => ({
      ...client,
      // ...addressResponses[index]?.data?.data[0], // Merge address details
    }));

    // Dispatch success with merged client data
    yield put(fetchAdditionalOrganizationByIdsSuccess(mergedOrganizations));

  } catch (error) {
    handleError(error);
    yield put(fetchAdditionalOrganizationByIdsFailure(error.response?.data || error));
  }
}

function* updateOrganizationById(action) {
  try {
    const { payload } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.UPDATE_ORGANIZATION, payload?.organization)
    );

    if (response.status == 200) {
      if (response?.data?.data[0]?.addressId && payload.util) {
        // let payload = {
        //   addressId: response?.data?.data[0]?.addressId,
        //   // addressId: 'Virginia Beach VA 23462-3012',
        // }
        // const addResponse = yield call(() => postRequest(API_ENDPOINTS.FETCH_ADDRESS_BY_QUERY_ID, payload));
        response.data.data[0] = { ...response?.data?.data[0], ...payload.util };
      }
      yield put(updateOrganizationByIdSuccess(response.data));
      toast.success("Organization Updated!");
    }
  } catch (error) {
    handleError(error)
    yield put(updateOrganizationByIdFailure(error.response?.data || error));
  }
}

function* fetchOrganizationByType(action) {
  try {
    const contactType = action.payload;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.FETCH_ORGANIZATION_BY_TYPE, contactType)
    );
    yield put(fetchOrganizationByTypeSuccess(response?.data?.data));
  } catch (error) {
    handleError(error)
    yield put(fetchOrganizationByTypeFailure(error.response.data || error));
  }
}
function* createOrganization(action) {
  try {
    const { payload, navigate } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.REGISTER_ORGANIZATION, payload)
    );
    let active = 1;
    if (response?.status == 200) {
      yield put(setSelectedOrganization(response?.data?.data[0]))
      navigate(ROUTES.CONTACT_PARTNER, { state: { active } });
      toast.success("Organization created successfully");
    }
  } catch (error) {
    handleError(error)

    // yield put(registerOrganizationFailure(error.response?.data || error));
  }
}
function* updateAddOrganizationById(action) {
  try {
    const { payload } = action;
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.UPDATE_ORGANIZATION, payload?.organization)
    );

    if (response.status == 200) {
      if (response?.data?.data[0]?.addressId && payload.util) {
        // let payload = {
        //   addressId: response?.data?.data[0]?.addressId,
        //   // addressId: 'Virginia Beach VA 23462-3012',
        // }
        // const addResponse = yield call(() => postRequest(API_ENDPOINTS.FETCH_ADDRESS_BY_QUERY_ID, payload));
        response.data.data[0] = { ...response?.data?.data[0], ...payload.util };
      }
      yield put(updateAddOrganizationByIdSuccess(response.data.data[0]));
      toast.success("Organization Updated!");
    }
  } catch (error) {
    handleError(error)
    yield put(updateAddOrganizationByIdFailure(error.response?.data || error));
  }
}
export function* organizationSaga() {
  yield takeLatest(REGISTER_ORG_REQUEST, registerOrganization); // created organization or list then address 
  yield takeLatest(FETCH_ORG_BY_ID_REQUEST, fetchOrganizationById);
  yield takeLatest(FETCH_ADDITIONAL_ORG_BY_IDS_REQUEST, fetchOrganizationsByIds);
  yield takeLatest(UPDATE_ORG_BY_ID_REQUEST, updateOrganizationById);
  yield takeEvery(UPDATE_ADD_ORG_BY_ID_REQUEST, updateAddOrganizationById);
  yield takeLatest(FETCH_ORG_BY_TYPE_REQUEST, fetchOrganizationByType);
  yield takeLatest(CREATE_ORG_REQUEST, createOrganization);
}
