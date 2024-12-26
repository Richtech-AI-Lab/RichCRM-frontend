export const GET_USERS_REQUESTED = "GET_USERS_REQUESTED";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAILED = "GET_USERS_FAILED";
export const GET_USERS = "GET_USERS";

//authTypes
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT = "LOGOUT";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = " FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILURE = "FORGOT_PASSWORD_FAILURE";

export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = " DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

export const CLEAR_DATA = "CLEAR_DATA";

export const CLEAR_CLIENT_DATA="CLEAR_CLIENT_DATA";
export const CLEAR_ORGANIZATION_DATA="CLEAR_ORGANIZATION_DATA";
export const CLEAR_CASES_DATA = "CLEAR_CASES_DATA";
export const CLEAR_PREMISES_DATA ="CLEAR_PREMISES_DATA";
export const CLEAR_STAGE_DATA = "CLEAR_STAGE_DATA";
export const CLEAR_TASK_DATA = "CLEAR_TASK_DATA";
export const CLEAR_UTIL_DATA = "CLEAR_UTIL_DATA";

// Fetch All cases
export const FETCH_ALL_CASES_REQUEST = "FETCH_ALL_CASES_REQUEST";
export const FETCH_ALL_CASES_SUCCESS = "FETCH_ALL_CASES_SUCCESS";
export const FETCH_ALL_CASES_FAILURE = "FETCH_ALL_CASES_FAILURE";

// search cases 
export const SET_SEARCH_CASES = "SET_SEARCH_CASES";

// Read cases
export const READ_CASE_REQUEST = "READ_CASE_REQUEST";

// read case by client id
export const READ_CASE_BY_CLIENT = "READ_CASE_BY_CLIENT";
export const READ_CASE_BY_CONTACT_REQ = "READ_CASE_BY_CONTACT_REQ";
export const READ_CASE_BY_CONTACT_SUCCESS = "READ_CASE_BY_CONTACT_SUCCESS";
export const READ_CASE_BY_CONTACT_FAILURE = "READ_CASE_BY_CONTACT_FAILURE";

export const CLEAN_ADDITIONAL_CLIENT = "CLEAN_ADDITIONAL_CLIENT";

export const FETCH_ADDITIONAL_CLIENTS_BY_IDS_REQUEST = "FETCH_ADDITIONAL_CLIENTS_BY_IDS_REQUEST";
export const FETCH_ADDITIONAL_CLIENTS_BY_IDS_SUCCESS = "FETCH_ADDITIONAL_CLIENTS_BY_IDS_SUCCESS";
export const FETCH_ADDITIONAL_CLIENTS_BY_IDS_FAILURE = "FETCH_ADDITIONAL_CLIENTS_BY_IDS_FAILURE";

// close case
export const CLOSE_CASE = "CLOSE_CASE";

// re open case
export const REOPEN_CASE = "REOPEN_CASE";

//CaseTypes
export const UPDATE_CASE_DATE_REQUEST = "UPDATE_CASE_DATE_REQUEST";
export const UPDATE_CASE_DATE_SUCCESS = "UPDATE_CASE_DATE_SUCCESS";
export const UPDATE_CASE_DATE_FAILURE = "UPDATE_CASE_DATE_FAILURE";


export const POST_CASE_REQUEST = "POST_CASE_REQUEST";
export const POST_CASE_SUCCESS = "POST_CASE_SUCCESS";
export const POST_CASE_FAILURE = "POST_CASE_FAILURE";

export const GET_CASE_REQUEST = "GET_CASE_REQUEST";
export const GET_CASE_SUCCESS = "GET_CASE_SUCCESS";
export const GET_CASE_FAILURE = "GET_CASE_FAILURE";

export const UPDATE_CASE_REQUEST = "UPDATE_CASE_REQUEST";
export const UPDATE_CASE_SUCCESS = "UPDATE_CASE_SUCCESS";
export const UPDATE_CASE_FAILURE = "UPDATE_CASE_FAILURE";

export const DELETE_CASE_REQUEST = "DELETE_CASE_REQUEST";
export const DELETE_CASE_SUCCESS = "DELETE_CASE_SUCCESS";
export const DELETE_CASE_FAILURE = "DELETE_CASE_FAILURE";

export const SET_STAGE = "SET_STAGE";


//PremisesTypes

export const REGISTER_PREMISES_REQUEST = "REGISTER_PREMISES_REQUEST";
export const REGISTER_PREMISES_SUCCESS = "REGISTER_PREMISES_SUCCESS";
export const REGISTER_PREMISES_FAILURE = "REGISTER_PREMISES_FAILURE";

export const FETCH_PREMISES_REQUEST = "FETCH_PREMISES_REQUEST";
export const FETCH_PREMISES_SUCCESS = "FETCH_PREMISES_SUCCESS";
export const FETCH_PREMISES_FAILURE = "FETCH_PREMISES_FAILURE";

export const UPDATE_PREMISES_REQUEST = "UPDATE_PREMISES_REQUEST";

//Client Types
export const REGISTER_CLIENT_REQUEST = "REGISTER_CLIENT_REQUEST";
export const REGISTER_CLIENT_SUCCESS = "REGISTER_CLIENT_SUCCESS";
export const REGISTER_CLIENT_FAILURE = "REGISTER_CLIENT_FAILURE";

//Address Types
export const REGISTER_ADDRESS_REQUEST = 'REGISTER_ADDRESS_REQUEST';
export const REGISTER_ADDRESS_SUCCESS = 'REGISTER_ADDRESS_SUCCESS';
export const REGISTER_ADDRESS_FAILURE = 'REGISTER_ADDRESS_FAILURE';

export const CREATE_ADDRESS_REQUEST = 'CREATE_ADDRESS_REQUEST';

export const CREATE_ADDRESS_CONTACT_REQUEST = "CREATE_ADDRESS_CONTACT_REQUEST";
// Stages Types
export const CREATE_STAGE_REQUEST = 'CREATE_STAGE_REQUEST';
export const CREATE_STAGE_SUCCESS = 'CREATE_STAGE_SUCCESS';
export const CREATE_STAGE_FAILURE = 'CREATE_STAGE_FAILURE';

export const GET_STAGE_REQUEST = "GET_STAGE_REQUEST";
export const GET_STAGE_SUCCESS = "GET_STAGE_SUCCESS";
export const GET_STAGE_FAILURE = "GET_STAGE_FAILURE";

// Stages Types
export const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE';

export const GET_TASK_REQUEST = "GET_TASK_REQUEST";
export const GET_TASK_SUCCESS = "GET_TASK_SUCCESS";
export const GET_TASK_FAILURE = "GET_TASK_FAILURE";

export const START_PREMISES_LOADING = "START_PREMISES_LOADING";
export const STOP_PREMISES_LOADING = "STOP_PREMISES_LOADING";
export const START_LOADING = "START_LOADING";
export const STOP_LOADING = "STOP_LOADING";

//Fetch Client By Id
export const FETCH_CLIENT_BY_ID_REQUEST = 'FETCH_CLIENT_BY_ID_REQUEST';
export const FETCH_CLIENT_BY_ID_SUCCESS = 'FETCH_CLIENT_BY_ID_SUCCESS';
export const FETCH_CLIENT_BY_ID_FAILURE = 'FETCH_CLIENT_BY_ID_FAILURE';

export const UPDATE_CLIENT_BY_ID_REQUEST = 'UPDATE_CLIENT_BY_ID_REQUEST';
export const UPDATE_CLIENT_BY_ID_SUCCESS = 'UPDATE_CLIENT_BY_ID_SUCCESS';
export const UPDATE_CLIENT_BY_ID_FAILURE = 'UPDATE_CLIENT_BY_ID_FAILURE';


//Fetch Premises By Id
export const FETCH_PREMISES_BY_ID_REQUEST = 'FETCH_PREMISES_BY_ID_REQUEST';
export const FETCH_PREMISES_BY_ID_SUCCESS = 'FETCH_PREMISES_BY_ID_SUCCESS';
export const FETCH_PREMISES_BY_ID_FAILURE = 'FETCH_PREMISES_BY_ID_FAILURE';

//Fetch Premises By Query  Id
export const FETCH_PREMISES_BY_QUERY_ID_REQUEST = 'FETCH_PREMISES_BY_QUERY_ID_REQUEST';
export const FETCH_PREMISES_BY_QUERY_ID_SUCCESS = 'FETCH_PREMISES_BY_QUERY_ID_SUCCESS';
export const FETCH_PREMISES_BY_QUERY_ID_FAILURE = 'FETCH_PREMISES_BY_QUERY_ID_FAILURE';

//Fetch Address By Id
export const FETCH_ADDRESS_BY_ID_REQUEST = 'FETCH_ADDRESS_BY_ID_REQUEST';
export const FETCH_ADDRESS_BY_ID_SUCCESS = 'FETCH_ADDRESS_BY_ID_SUCCESS';
export const FETCH_ADDRESS_BY_ID_FAILURE = 'FETCH_ADDRESS_BY_ID_FAILURE';

// Fetch Contact
export const GET_CONTACT_BY_TYPE_REQUEST = 'GET_CONTACT_BY_TYPE_REQUEST';
export const GET_CONTACT_BY_TYPE_SUCCESS = 'GET_CONTACT_BY_TYPE_SUCCESS';
export const GET_CONTACT_BY_TYPE_FAILURE = 'GET_CONTACT_BY_TYPE_FAILURE';

export const GET_CONTACT_BY_KEYWORD_REQUEST = 'GET_CONTACT_BY_KEYWORD_REQUEST';
export const GET_CONTACT_BY_KEYWORD_SUCCESS = 'GET_CONTACT_BY_KEYWORD_SUCCESS';
export const GET_CONTACT_BY_KEYWORD_FAILURE = 'GET_CONTACT_BY_KEYWORD_FAILURE';

export const CONTACT_CONTACT_REQUEST = 'CONTACT_CONTACT_REQUEST';
export const CONTACT_CONTACT_SUCCESS = 'CONTACT_CONTACT_SUCCESS';
export const CONTACT_CONTACT_FAILURE = 'CONTACT_CONTACT_FAILURE';

export const UPDATE_CONTACT_REQUEST = 'UPDATE_CONTACT_REQUEST';
export const UPDATE_CONTACT_SUCCESS = 'UPDATE_CONTACT_SUCCESS';
export const UPDATE_CONTACT_FAILURE = 'UPDATE_CONTACT_FAILURE';

export const CREATE_CONTACT_REQUEST = 'CREATE_CONTACT_REQUEST';
export const CREATE_CONTACT_SUCCESS = 'CREATE_CONTACT_SUCCESS';
export const CREATE_CONTACT_FAILURE = 'CREATE_CONTACT_FAILURE';

export const SET_SELECTED_CONTACT = 'SET_SELECTED_CONTACT';

export const SEND_MAIL_REQUEST = 'SEND_MAIL_REQUEST';
export const SEND_MAIL_SUCCESS = 'SEND_MAIL_SUCCESS';
export const SEND_MAIL_FAILURE = 'SEND_MAIL_FAILURE';


export const UPDATE_STATUS_TASK_REQUEST = 'UPDATE_STATUS_TASK_REQUEST';
export const UPDATE_STATUS_TASK_SUCCESS = 'UPDATE_STATUS_TASK_SUCCESS';
export const UPDATE_STATUS_TASK_FAILURE = 'UPDATE_STATUS_TASK_FAILURE';

export const UPDATE_STATUS_STAGE_REQUEST="UPDATE_STATUS_STAGE_REQUEST";

export const REGISTER_ORG_REQUEST = "REGISTER_ORG_REQUEST";
export const REGISTER_ORG_SUCCESS = "REGISTER_ORG_SUCCESS";
export const REGISTER_ORG_FAILURE = "REGISTER_ORG_FAILURE";

export const FETCH_ORG_BY_ID_REQUEST ="FETCH_ORG_BY_ID_REQUEST";
export const FETCH_ORG_BY_ID_SUCCESS ="FETCH_ORG_BY_ID_SUCCESS";
export const FETCH_ORG_BY_ID_FAILURE ="FETCH_ORG_BY_ID_FAILURE";

export const FETCH_ADDITIONAL_ORG_BY_IDS_REQUEST = "FETCH_ADDITIONAL_ORG_BY_IDS_REQUEST";
export const FETCH_ADDITIONAL_ORG_BY_IDS_SUCCESS = "FETCH_ADDITIONAL_ORG_BY_IDS_SUCCESS";
export const FETCH_ADDITIONAL_ORG_BY_IDS_FAILURE = "FETCH_ADDITIONAL_ORG_BY_IDS_FAILURE";

export const UPDATE_ORG_BY_ID_REQUEST = "UPDATE_ORG_BY_ID_REQUEST";
export const UPDATE_ORG_BY_ID_SUCCESS = "UPDATE_ORG_BY_ID_SUCCESS";
export const UPDATE_ORG_BY_ID_FAILURE = "UPDATE_ORG_BY_ID_FAILURE";

//Tenant
export const REGISTER_TENANT_REQUEST = "REGISTER_TENANT_REQUEST";
export const REGISTER_TENANT_SUCCESS = "REGISTER_TENANT_SUCCESS";
export const REGISTER_TENANT_FAILURE = "REGISTER_TENANT_FAILURE";

export const CREATE_ATTORNEY_REQUEST = 'CREATE_ATTORNEY_REQUEST';
export const CREATE_ATTORNEY_SUCCESS = 'CREATE_ATTORNEY_SUCCESS';
export const CREATE_ATTORNEY_FAILURE = 'CREATE_ATTORNEY_FAILURE';

export const DELETE_ATTORNEY_REQUEST = 'DELETE_ATTORNEY_REQUEST';
export const DELETE_ATTORNEY_SUCCESS = 'DELETE_ATTORNEY_SUCCESS';
export const DELETE_ATTORNEY_FAILURE = 'DELETE_ATTORNEY_FAILURE';

export const SET_ATTORNEY_EMPTY= "SET_ATTORNEY_EMPTY"

export const UPDATE_CASE_CONTACT_REQUEST = "UPDATE_CASE_CONTACT_REQUEST";
export const UPDATE_CASE_CONTACT_SUCCESS = "UPDATE_CASE_CONTACT_SUCCESS";
export const UPDATE_CASE_CONTACT_FAILURE = "UPDATE_CASE_CONTACT_FAILURE";

export const FETCH_ATTORNEY_BY_ID_REQUEST ="FETCH_ATTORNEY_BY_ID_REQUEST";
export const FETCH_ATTORNEY_BY_ID_SUCCESS ="FETCH_ATTORNEY_BY_ID_SUCCESS";
export const FETCH_ATTORNEY_BY_ID_FAILURE ="FETCH_ATTORNEY_BY_ID_FAILURE";


export const FETCH_ORG_BY_TYPE_REQUEST = 'FETCH_ORG_BY_TYPE_REQUEST';
export const FETCH_ORG_BY_TYPE_SUCCESS = 'FETCH_ORG_BY_TYPE_SUCCESS';
export const FETCH_ORG_BY_TYPE_FAILURE = 'FETCH_ORG_BY_TYPE_FAILURE';

export const SET_SELECTED_ORG = "SET_SELECTED_ORG";

export const CREATE_ORG_REQUEST = "CREATE_ORG_REQUEST";
export const CREATE_ORG_SUCCESS = "CREATE_ORG_SUCCESS";
export const CREATE_ORG_FAILURE = "CREATE_ORG_FAILURE";

export const FINISH_ALL_TASK_REQUEST = "FINISH_ALL_TASK_REQUEST";
export const FINISH_ALL_TASK_SUCCESS = "FINISH_ALL_TASK_SUCCESS";
export const FINISH_ALL_TASK_FAILURE = "FINISH_ALL_TASK_FAILURE";

export const FETCH_REALTOR_BY_ID_REQUEST ="FETCH_REALTOR_BY_ID_REQUEST";
export const FETCH_REALTOR_BY_ID_SUCCESS ="FETCH_REALTOR_BY_ID_SUCCESS";
export const FETCH_REALTOR_BY_ID_FAILURE ="FETCH_REALTOR_BY_ID_FAILURE";

export const SET_REALTOR_EMPTY= "SET_REALTOR_EMPTY"

export const SET_CONTACT_CASES_EMPTY= "SET_CONTACT_CASES_EMPTY"

export const CREATE_TAG_REQUEST = 'CREATE_TAG_REQUEST';
export const CREATE_TAG_SUCCESS = 'CREATE_TAG_SUCCESS';
export const CREATE_TAG_FAILURE = 'CREATE_TAG_FAILURE';

export const DELETE_TAG_REQUEST = 'DELETE_TAG_REQUEST';
export const DELETE_TAG_SUCCESS = 'DELETE_TAG_SUCCESS';
export const DELETE_TAG_FAILURE = 'DELETE_TAG_FAILURE';

export const FETCH_ALL_TAG_REQUEST = 'FETCH_ALL_TAG_REQUEST';
export const FETCH_ALL_TAG_SUCCESS = 'FETCH_ALL_TAG_SUCCESS';
export const FETCH_ALL_TAG_FAILURE = 'FETCH_ALL_TAG_FAILURE';


export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

export const DELETE_CONTACT_REQUEST = 'DELETE_CONTACT_REQUEST';
export const DELETE_CONTACT_SUCCESS = 'DELETE_CONTACT_SUCCESS';
export const DELETE_CONTACT_FAILURE = 'DELETE_CONTACT_FAILURE';

export const CREATE_BROKER_REQUEST = 'CREATE_BROKER_REQUEST';
export const CREATE_BROKER_SUCCESS = 'CREATE_BROKER_SUCCESS';
export const CREATE_BROKER_FAILURE = 'CREATE_BROKER_FAILURE';

export const DELETE_BROKER_REQUEST = 'DELETE_BROKER_REQUEST';
export const DELETE_BROKER_SUCCESS = 'DELETE_BROKER_SUCCESS';
export const DELETE_BROKER_FAILURE = 'DELETE_BROKER_FAILURE';

export const FETCH_BROKER_BY_ID_REQUEST = 'FETCH_BROKER_BY_ID_REQUEST';
export const FETCH_BROKER_BY_ID_SUCCESS = 'FETCH_BROKER_BY_ID_SUCCESS';
export const FETCH_BROKER_BY_ID_FAILURE = 'FETCH_BROKER_BY_ID_FAILURE';

export const SET_BROKER_EMPTY="SET_BROKER_EMPTY";

export const CREATE_ADD_CLIENT_ADDRESS_REQUEST = 'CREATE_ADD_CLIENT_ADDRESS_REQUEST';

export const CREATE_ADD_ORGANIZATION_ADDRESS_REQUEST = 'CREATE_ADD_ORGANIZATION_ADDRESS_REQUEST';

export const UPDATE_ADD_CLIENT_BY_ID_REQUEST = 'UPDATE_ADD_CLIENT_BY_ID_REQUEST';
export const UPDATE_ADD_CLIENT_BY_ID_SUCCESS = 'UPDATE_ADD_CLIENT_BY_ID_SUCCESS';
export const UPDATE_ADD_CLIENT_BY_ID_FAILURE = 'UPDATE_ADD_CLIENT_BY_ID_FAILURE';

export const UPDATE_ADD_ORG_BY_ID_REQUEST = 'UPDATE_ADD_ORG_BY_ID_REQUEST';
export const UPDATE_ADD_ORG_BY_ID_SUCCESS = 'UPDATE_ADD_ORG_BY_ID_SUCCESS';
export const UPDATE_ADD_ORG_BY_ID_FAILURE = 'UPDATE_ADD_ORG_BY_ID_FAILURE';

export const DELETE_ORG_REQUEST = "DELETE_ORG_REQUEST";
export const DELETE_ORG_SUCCESS = " DELETE_ORG_SUCCESS";
export const DELETE_ORG_FAILURE = "DELETE_ORG_FAILURE";