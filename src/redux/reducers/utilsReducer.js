import {
  CLEAR_DATA,
  REGISTER_ADDRESS_FAILURE,
  REGISTER_ADDRESS_REQUEST,
  REGISTER_ADDRESS_SUCCESS,
} from "../type";

const initialState = {
  loading: false,
  address: null,
  error: null,
};

const utilsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        address: action.payload,
      };
    case REGISTER_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_DATA:
      return initialState;
    default:
      return state;
  }
};

export default utilsReducer;
