import { FETCH_ADDITIONAL_ORG_BY_IDS_REQUEST, FETCH_ORG_BY_ID_REQUEST, REGISTER_ORG_REQUEST } from "../type";
import { API_ENDPOINTS } from "../../constants/api";
import { getRequest, postRequest } from "../../axios/interceptor";
import { call, put } from "redux-saga/effects";
import { handleError } from "../../utils/eventHandler";
import { all } from "redux-saga/effects";
import { toast } from "react-toastify";
import { takeLatest } from "redux-saga/effects";
import { registerAddressRequest } from "../actions/utilsActions";
import { fetchAdditionalOrganizationByIdsFailure, fetchAdditionalOrganizationByIdsSuccess, fetchOrganizationByIdFailure, fetchOrganizationByIdSuccess } from "../actions/organizationActions";


function* registerOrganization(action) {

  try {
    const { payload, navigate } = action;
    let details= payload.casePayload.clientType == 1 ? payload.companyDetails : payload.trustDetail;
    let list= payload.casePayload.clientType == 1 ? payload.companyList : payload.trustList;
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
    if(response.status ==200){
      const updatedPayload = {
        ...payload,
        casePayload: {
          ...payload.casePayload,
          additionalOrganizations: organizationIds,
          organizationId: response.data?.data[0]?.organizationId,
        }
      };
      yield put(registerAddressRequest(updatedPayload,navigate))
      toast.success("Organization created successfully");
    }
  } catch (error) {
    handleError(error)
    // yield put(registerClientFailure(error.response?.data || error));
  }
}


function* fetchOrganizationById(action) {
  try {
    const { organizationId } = action.payload;
    const response = yield call(() =>
      getRequest(`${API_ENDPOINTS.FETCH_ORGANIZATION_BY_ID}/${organizationId}`)
    );
    yield put(fetchOrganizationByIdSuccess(response.data));
  } catch (error) {
    handleError(error)
    yield put(fetchOrganizationByIdFailure(error.response.data || error));
  }
}

function* fetchOrganizationsByIds(action) {
  try {
    const organizationIds  = action.payload;

    const organizationResponses = yield all(
      organizationIds.map(organizationId =>
        call(getRequest, `${API_ENDPOINTS.FETCH_ORGANIZATION_BY_ID}/${organizationId}`)
      )
    );

    // Map over responses to extract the relevant data
    const organizations = organizationResponses.map(response => response?.data?.data[0]);
    console.log(organizations,"organizations")
    // Dispatch success with merged client data
    yield put(fetchAdditionalOrganizationByIdsSuccess(organizations));

  } catch (error) {
    handleError(error);
    yield put(fetchAdditionalOrganizationByIdsFailure(error.response?.data || error));
  }
}
export function* organizationSaga() {
  yield takeLatest(REGISTER_ORG_REQUEST, registerOrganization);
  yield takeLatest(FETCH_ORG_BY_ID_REQUEST, fetchOrganizationById);
  yield takeLatest(FETCH_ADDITIONAL_ORG_BY_IDS_REQUEST, fetchOrganizationsByIds);
}
