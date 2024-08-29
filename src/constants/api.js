export const API_ENDPOINTS = {
  FETCH_DATA: '/users',
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  FORGOT_PASSWORD: "/forgot-password",
  DELETE_USER: "/auth/delete",
  CREATE_CASE: "/case/create",
  READ_CASE: "/case",
  CLOSE_CASE: "/case/close",
  GET_CASE_BY_CLIENT: "/case/query/client",
  UPDATE_CASE: "/case/update",
  DELETE_CASE: "/case/delete",
  REGISTER_PREMISES: "/premises/register",
  UPDATE_PREMISES:"/premises/update",
  FETCH_PREMISES_BY_ADDRESS_ID: "/premises/query/address",
  REGISTER_CLIENT: "/client/register",
  REGISTER_ADDRESS: "/utils/address/register",
  CREATE_STAGE:"/stage/create",
  READ_STAGE: "/stage",
  CREATE_TASK:"/task/create",
  READ_TASK:"/task",
  FECTH_ALL_CASES:"/case/all",
  FETCH_CLIENT_BY_ID:"/client",
  FETCH_PREMISES_BY_ID:"/premises",
  FETCH_PREMISES_BY_QUERY_ID:"/premises/query/id",
  FETCH_CLIENT_BY_QUERY:"client/query",
  FETCH_ADDRESS_BY_QUERY_ID:"/utils/address/query/id",
  UPDATE_CLIENT:"/client/update",
  GET_CONTACT_BY_QUERY:"/contact/query/type",
  UPDATE_CONTACT:"/contact/update",
};

export const ROUTES = {
  LOGIN: "/",
  REGISTER: "/register",
  DASHBOARD: "/rich-crm/dashboard",
  CASES: "/rich-crm/cases",
  NEW_CASE_INFO: "/rich-crm/newcaseinfo",
  CASES_CATEGORY: "/rich-crm/casescategory",
  CASES_DETAILS: "/rich-crm/casedetails",
  CASES_DATA: "/rich-crm/casesdata",
  CALENDAR: "/rich-crm/calendar",
  CONTACTS: "/rich-crm/contacts",
  CONTACT_PARTNER: "/rich-crm/contactpartner",
  DOCUMENTS: "/rich-crm/documents",
  SETTINGS: "/rich-crm/settings",
  FORGOT_PASSWORD_ONE: "/forgot-password-one",
  FORGOT_PASSWORD_TWO: "/forgot-password-two",
  FORGOT_PASSWORD_THREE: "/forgot-password-three"
};