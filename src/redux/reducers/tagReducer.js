import { CREATE_TAG_FAILURE, CREATE_TAG_REQUEST, CREATE_TAG_SUCCESS, DELETE_TAG_SUCCESS } from "../type";

const initialState = {
  loading: false,
  tag: [],
  error: null,
};

const tagReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TAG_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_TAG_SUCCESS:
      return { ...state, loading: false, tag: [...state?.tag, action.payload], error: null };
    case CREATE_TAG_FAILURE:
      return { ...state, loading: false, error: action.payload };
    // case DELETE_TAG_SUCCESS:
    //   return { ...state, loading: false, tag: state?.tag.filter(item => item.contactId !== action.payload), error: null };
    case DELETE_TAG_SUCCESS:
      return { ...state, loading: false, tag: state?.tag.filter(item => item.contactId !== action.payload), error: null };
    default:
      return state;
  }
};

export default tagReducer;
