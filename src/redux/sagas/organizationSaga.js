import { FETCH_ORG_BY_ID_REQUEST, REGISTER_ORG_REQUEST } from "../type";
import { API_ENDPOINTS } from "../../constants/api";
import { getRequest, postRequest } from "../../axios/interceptor";
import { call, put } from "redux-saga/effects";
import { handleError } from "../../utils/eventHandler";
import { all } from "redux-saga/effects";
import { toast } from "react-toastify";
import { takeLatest } from "redux-saga/effects";
import { registerAddressRequest } from "../actions/utilsActions";
import { fetchOrganizationByIdFailure, fetchOrganizationByIdSuccess } from "../actions/organizationActions";


function* registerOrganization(action) {
  try {
    const { payload, navigate } = action;
    console.log(payload,"payload");
    const response = yield call(() =>
      postRequest(API_ENDPOINTS.REGISTER_ORGANIZATION, payload.companyDetails)
    );
    const organizationListRes = yield all(
      payload.companyList?.map(companydetails =>
        call(postRequest, API_ENDPOINTS.REGISTER_ORGANIZATION, companydetails)
      )
    );
    const organizationIds = organizationListRes.map(res => res.data.data[0].organizationId);
    
    console.log(organizationIds, "organizationIds")
    // yield put(registerorganizationSuccess(response.data));
    if(response.status ==200){
      const updatedPayload = {
        ...payload,
        casePayload: {
          ...payload.casePayload,
          additionalClients: organizationIds,
          organizationId: response.data?.data[0]?.organizationId,
        }
      };
      yield put(registerAddressRequest(updatedPayload,navigate))
      toast.success("Client created successfully");
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
export function* organizationSaga() {
  yield takeLatest(REGISTER_ORG_REQUEST, registerOrganization);
  yield takeLatest(FETCH_ORG_BY_ID_REQUEST, fetchOrganizationById);
}
