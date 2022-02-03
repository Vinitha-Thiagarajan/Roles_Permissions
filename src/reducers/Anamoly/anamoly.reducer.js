import {
  ANAMOLY_API_SUCCESS,
  ANAMOLY_API_FAILURE,
  ANAMOLY_API_LOADING,
  ANAMOLY_API_SEARCH,
  ANAMOLY_SORT,
  ANAMOLY_API_SUCCESS_INITIAL,
  ANAMOLY_API_LOADING_INITIAL
} from "./anamoly.types";

const INITIAL_STATE = {
  records: [],
  pipelineSet: [],
  loading: true,
  errors: null,
  search: ""
};
const sortData=(data,type,sort)=>{
  if(type =="date"){
    return data.sort(function(a,b){return sort=="down"? new Date(a.date).getTime() - new Date(b.date).getTime() :new Date(b.date).getTime() - new Date(a.date).getTime()});
  }else{
    return data.sort(function(a,b){return sort=="down"? a.insightDetails - b.insightDetails :b.insightDetails - a.insightDetails});
  }

}
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ANAMOLY_API_SUCCESS:
      return {
        ...state,
        records:
          action.payload.data && action.payload.data.anomalyDetection
            ? action.payload.data.anomalyDetection.results
            : [],
        errors:
          action.payload.errors &&
          action.payload.errors[0] &&
          action.payload.errors[0].message,
        loading: false,
      };
    case ANAMOLY_API_SUCCESS_INITIAL:
      return {
        ...state,
        records:
          action.payload.data && action.payload.data.anomalyDetection
            ? action.payload.data.anomalyDetection.results
            : [],
        pipelineSet: action.payload.data && action.payload.data.anomalyDetection
          ? action.payload.data.anomalyDetection.pipelines
          : [],
        errors:
          action.payload.errors &&
          action.payload.errors[0] &&
          action.payload.errors[0].message,
        loading: false,
      };
    case ANAMOLY_API_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
        records: [],
      };
    case ANAMOLY_API_LOADING_INITIAL:
      return {
        ...state,
        records: [],
        pipelineSet: [],
        loading: true,
        errors: null,
      };
    case ANAMOLY_API_LOADING:
      return {
        ...state,
        records: [],
        loading: true,
        errors: null,
      };
    case ANAMOLY_API_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case ANAMOLY_SORT:
      return {
        ...state,
        records: sortData(state.records,action.datatype,action.payload)
      };
    default:
      return state;
  }
};

export default reducer;
