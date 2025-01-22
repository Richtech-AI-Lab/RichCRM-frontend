export const API_ENDPOINTS = {
  FETCH_DATA: '/users',
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  FORGOT_PASSWORD: "/forgot-password",
  DELETE_USER: "/auth/delete",
  ACCOUNT_VERIFICATION: "/auth/account-verification",
  CREATE_CASE: "/case/create",
  READ_CASE: "/case",
  CLOSE_CASE: "/case/close",
  REOPEN_CASE: "/case/reopen",
  GET_CASE_BY_CLIENT: "/case/query/client",
  GET_CASE_BY_CONTACT: "/case/query/contact",
  UPDATE_CASE: "/case/update",
  DELETE_CASE: "/case/delete",
  REGISTER_PREMISES: "/premises/register",
  UPDATE_PREMISES: "/premises/update",
  FETCH_PREMISES_BY_ADDRESS_ID: "/premises/query/address",
  REGISTER_CLIENT: "/client/register",
  REGISTER_ADDRESS: "/utils/address/register",
  CREATE_STAGE: "/stage/create",
  READ_STAGE: "/stage",
  CREATE_TASK: "/task/create",
  READ_TASK: "/task",
  FECTH_ALL_CASES: "/case/all",
  FETCH_CLIENT_BY_ID: "/client",
  FETCH_PREMISES_BY_ID: "/premises",
  FETCH_PREMISES_BY_QUERY_ID: "/premises/query/id",
  FETCH_CLIENT_BY_QUERY: "client/query",
  FETCH_ADDRESS_BY_QUERY_ID: "/utils/address/query/id",
  UPDATE_CLIENT: "/client/update",
  GET_CONTACT_BY_CASETAG: "/contact/query/caseandtag",
  GET_CONTACT_BY_TAG: "/contact/query/tag",
  GET_CONTACT_BY_TAGS : "/contact/query/tags",
  GET_CONTACT_BY_QUERY: "/contact/query/type",
  GET_CONTACT_BY_KEYWORD: "/contact/query",
  UPDATE_CONTACT: "/contact/update",
  CREATE_CONTACT: "/contact/register",
  SEND_MAIL: "/utils/email/send",
  GET_CASES_BY_KEYWORD: "/case/query/keyword",
  GET_ORGANIZATION_BY_KEYWORD: "/organization/query",
  READ_TEMPLATE_BY_NAME: "/template/read",
  UPDATE_TEMPLATE_BY_NAME: "/template/fill",
  UPDATE_TASK: "/task/update",
  UPDATE_STAGE: "/stage/update",
  FETCH_ORGANIZATION_BY_QUERY: "/organization/query",
  REGISTER_ORGANIZATION: "/organization/register",
  FETCH_ORGANIZATION_BY_ID: "/organization",
  FETCH_ORGANIZATION_BY_TYPE: "/organization/query/type",
  UPDATE_ORGANIZATION: "/organization/update",
  DELETE_CONTACT: "/contact/delete",
  FETCH_CONTACT_BY_ID: "/contact",
  QUERY_CONTACT_BY_CASE_ID: "/contact/query/caseandtype",
  CREATE_TAG: "/tag/create",
  DELETE_TAG: "/tag/delete",
  GET_ALL_TAG: "/tag/all",
  GET_TAG_BY_TYPE: "/tag/type",
  UPDATE_TAG: "/tag/update",
  CHANGE_PASSWORD: "/auth/change-password",
  UPDATE_USER: "/auth/update",
  DELETE_CLIENT: "/client/delete",
  DELETE_ORGANIZATION: "/organization/delete",
  CREATE_TEM_TASK: "/task-template/create",
  INITIAL_TEM_TASK : "/task-template/create/default",
  GET_TEM_TASK : "/task-template/read",
  UPDATE_TEM_TASK: "/task-template/create"
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
  FORGOT_PASSWORD_THREE: "/forgot-password-three",
  EMAIL_VERIFICATION: "/email-verification",
};