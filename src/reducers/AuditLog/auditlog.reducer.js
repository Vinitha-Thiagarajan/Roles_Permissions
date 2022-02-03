import {
  AUDIT_API_SUCCESS,
  AUDIT_API_LOADING,
  AUDIT_API_FAILURE,
  AUDIT_FILTER_API_SUCCESS,
  AUDIT_FILTER_API_LOADING,
  AUDIT_FILTER_API_FAILURE,
  AUDIT_RESET_API_RECORD
} from "./auditlog.types";

const INITIAL_STATE = {
  filter: [],
  tables: [],
  records: false,
  loading: true,
  errors: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUDIT_FILTER_API_SUCCESS:
      return {
        ...state,
        filter:
          action.payload.data && action.payload.data.auditTableInfo
            ? action.payload.data.auditTableInfo.allFilters
            : [],
        tables:
          action.payload.data && action.payload.data.auditTableInfo
            ? action.payload.data.auditTableInfo.allTables
            : [],
        loading: false,
      };
    case AUDIT_FILTER_API_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
        filter: [],
        tables: [],
        records: false,
      };
    case AUDIT_FILTER_API_LOADING:
      return {
        filter: [],
        records: false,
        tables: [],
        loading: true,
        errors: null,
      };
    case AUDIT_API_SUCCESS:
      return {
        ...state,
        records:
          action.payload.data && action.payload.data.auditLog
            ? action.payload.data.auditLog.auditLogs
            : [],
        loading: false,
      };
    case AUDIT_API_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
        records: [],
      };
    case AUDIT_API_LOADING:
      return {
        ...state,
        records: [],
        loading: true,
        errors: null,
      };
    case AUDIT_RESET_API_RECORD:
      return {
        ...state,
        records: false,
      }
    default:
      return state;
  }
};

export default reducer;
