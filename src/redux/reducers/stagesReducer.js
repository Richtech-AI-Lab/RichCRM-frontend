import { STAGESNAMES } from "../../constants/constants";
import { CREATE_STAGE_FAILURE, CREATE_STAGE_REQUEST, CREATE_STAGE_SUCCESS, START_LOADING, STOP_LOADING } from "../type";

const initialState = {
  loading: false,
  data: {},
  error: null,
};

const stageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_STAGE_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_STAGE_SUCCESS:
      const { stageType } = action.payload;
      return {
        ...state, loading: false, data: {
          ...state.data,
          [STAGESNAMES[stageType]]: action.payload,
        },
      };
    case CREATE_STAGE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case START_LOADING:
      return { ...state, loading: true};
    case STOP_LOADING:
      return { ...state, loading: false};
    default:
      return state;
  }
};

export default stageReducer;
