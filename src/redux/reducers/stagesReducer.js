import { CREATE_STAGE_FAILURE, CREATE_STAGE_REQUEST, CREATE_STAGE_SUCCESS } from "../type";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const stageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_STAGE_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_STAGE_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case CREATE_STAGE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default stageReducer;
