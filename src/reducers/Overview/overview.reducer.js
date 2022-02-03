import {
  API_OVERVIEW_SUCCESS,
  API_OVERVIEW_FAILURE,
  API_OVERVIEW_LOADING,
  API_OVERVIEW_PIPELINE,
  API_OVERVIEW_SEARCH,
} from "./overview.types";

const INITIAL_STATE = {
  dashboard: {},
  pipeline: [],
  pipelineSet: [],
  search: "",
  loading: true,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case API_OVERVIEW_SUCCESS:
      return {
        ...state,
        dashboard: action.payload.data ? action.payload.data.dashboard : {},
        pipeline:
          action.payload.data && action.payload.data.dashboard
            ? action.payload.data.dashboard.results[0].pipeline
            : [],
        pipelineSet:
          action.payload.data && action.payload.data.dashboard
            ? action.payload.data.dashboard.results[0].pipelineSet
            : [],
        loading: false,
      };
    case API_OVERVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        dashboard: {},
        pipeline: [],
        pipelineSet: [],
        search: "",
      };
    case API_OVERVIEW_LOADING:
      return {
        loading: true,
      };
    case API_OVERVIEW_PIPELINE:
      return {
        ...state,
        pipeline: action.payload,
      };
    case API_OVERVIEW_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
