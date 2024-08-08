export const API_ENDPOINTS = {
  FETCH_DATA: '/users',
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  FORGOT_PASSWORD: "/forgot-password",
  DELETE_USER: "/auth/delete",
  CREATE_CASE: "/case/create",
  GET_CASE: "/case/:id",
  UPDATE_CASE: "/case/update",
  DELETE_CASE: "/case/delete",
  REGISTER_PREMISES: "/premises/register",
  FETCH_PREMISES_BY_ADDRESS_ID: "/premises/query/address",
  REGISTER_CLIENT: "/client/register",
  REGISTER_ADDRESS: "/utils/address/register"
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