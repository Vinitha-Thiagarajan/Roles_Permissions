import {
  TRACECHART_API_SUCCESS,
  TRACECHART_API_FAILURE,
  TRACECHART_API_LOADING,
  TRACECHART_API_PIPELINE,
  TRACECHART_API_RESET,
  TRACECHART_API_SUCCESS_TOUCH
} from "./tracechart.types";

const INITIAL_STATE = {
  allBrands: false,
  allPipelines: false,
  allTouchPoints: false,
  dataAndVariancePerDay: false,
  chartloading: true,
  brand:"",
  errors: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRACECHART_API_SUCCESS:
      return {
        ...state,
        allBrands:
          action.payload.data && action.payload.data.chart
            ? action.payload.data.chart.allBrands
            : [],
        // allPipelines:
        //   action.payload.data && action.payload.data.chart
        //     ? action.payload.data.chart.allPipelines
        //     : [],
        allTouchPoints: action.payload.data && action.payload.data.chart
          ? action.payload.data.chart.allTouchPoints
          : [],
        dataAndVariancePerDay: action.payload.data && action.payload.data.chart
          ? action.payload.data.chart.dataAndVariancePerDay
          : [],
        brand :action.payload.data && action.payload.data.chart
        ? action.payload.data.chart.brand
        : "",
        errors:
          action.payload.errors &&
          action.payload.errors[0] &&
          action.payload.errors[0].message,
        chartloading: false,
      };
    case TRACECHART_API_SUCCESS_TOUCH:
      return {
        ...state,
        allBrands:
          action.payload.data && action.payload.data.chart
            ? action.payload.data.chart.allBrands
            : [],
        brand :action.payload.data && action.payload.data.chart
            ? action.payload.data.chart.brand
            : "",
        allTouchPoints: action.payload.data && action.payload.data.chart
          ? action.payload.data.chart.allTouchPoints
          : [],
        dataAndVariancePerDay: action.payload.data && action.payload.data.chart
          ? action.payload.data.chart.dataAndVariancePerDay
          : [],
        errors:
          action.payload.errors &&
          action.payload.errors[0] &&
          action.payload.errors[0].message,
      };
    case TRACECHART_API_FAILURE:
      return {
        ...state,
        chartloading: false,
        errors: action.payload,
        allBrands: false,
        dataAndVariancePerDay: false,
        allPipelines: false,
        brand:""
      };
    case TRACECHART_API_LOADING:
      return {
        ...state,
        allBrands: false,
        allPipelines: false,
        dataAndVariancePerDay: false,
        chartloading: true,
        brand:"",
        errors: null,
      };
    case TRACECHART_API_PIPELINE:
      return {
        ...state,
        chartloading: false,
        errors: null,
        allPipelines: action.payload.data && action.payload.data.chart
          ? action.payload.data.chart.allPipelines
          : []
      };
    case TRACECHART_API_RESET:
      return {
        ...state,
        allBrands: [],
        allPipelines: [],
        allTouchPoints: [],
        dataAndVariancePerDay: [],
        brand:"",
        chartloading: false,
        errors: null,
      }
    default:
      return state;
  }
};

export default reducer;
