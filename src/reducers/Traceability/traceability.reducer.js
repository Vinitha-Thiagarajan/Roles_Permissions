import {
  TRACEABILITY_API_SUCCESS,
  TRACEABILITY_API_FAILURE,
  TRACEABILITY_API_LOADING,
  TRACEABILITY_API_RESET
} from "./traceability.types";

const INITIAL_STATE = {
  highlights: "",
  allBrands: [],
  allMetrics: [],
  stages: [],
  traceabilityFlow: {},
  loading: true,
  errors: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRACEABILITY_API_SUCCESS:
      return {
        ...state,
        highlights:
          action.payload.data && action.payload.data.traceabilityFlow
            ? action.payload.data.traceabilityFlow.highlights
            : "",
        allBrands:
          action.payload.data && action.payload.data.traceabilityFlow
            ? action.payload.data.traceabilityFlow.allBrands
            : [],
        allMetrics:
          action.payload.data && action.payload.data.traceabilityFlow
            ? action.payload.data.traceabilityFlow.allMetrics
            : [],
        stages:
          action.payload.data && action.payload.data.traceabilityFlow
            ? action.payload.data.traceabilityFlow.stages
            : [],
        traceabilityFlow:
          action.payload.data && action.payload.data.traceabilityFlow
            ? action.payload.data.traceabilityFlow
            : {},
        errors:
          action.payload.errors &&
          action.payload.errors[0] &&
          action.payload.errors[0].message,
        loading: false,
      };
    case TRACEABILITY_API_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
        allBrands: [],
        allMetrics: [],
        stages: [],
        traceabilityFlow: {},
      };
    case TRACEABILITY_API_LOADING:
      return {
        ...state,
        highlights: "",
        allBrands: [],
        allMetrics: [],
        stages: [],
        traceabilityFlow: {},
        loading: true,
        errors: null,
      };
      case TRACEABILITY_API_RESET:
        return {
          ...state,
          highlights: "",
          allBrands: [],
          allMetrics: [],
          stages: [],
          traceabilityFlow: {},
          loading: false,
          errors: null,
        };
    default:
      return state;
  }
};

export default reducer;
