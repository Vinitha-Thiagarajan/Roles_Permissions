import types from './types'
const initialState = {
    particular:[],
    overall:[],
    general:[],
    failure:[],
    sourceList:[],
    isLoading:false
}

const particularReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.TREND_SOURCE_LIST_REQUEST: {
            return {
                ...state,
                isLoading: true,
                particular:[]
            }
        }
        case types.TREND_SOURCE_LIST_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                particular:action.payroll.data.maintenanceReasons.results
            }
        }
        case types.TREND_SOURCE_LIST_ERROR: {
            return {
                ...state,
                isLoading: false
            }
        }
        case types.OVERALL_LIST_REQUEST: {
            return {
                ...state,
                isLoading: true,
                overall:[]
            }
        }
        case types.OVERALL_LIST_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                overall:action.payroll.data.maintenanceReasons.results
            }
        }
        case types.OVERALL_LIST_ERROR: {
            return {
                ...state,
                isLoading: false
            }
        }
        case types.GENERAL_LIST_REQUEST: {
            return {
                ...state,
                isLoading: true,
                general:[]
            }
        }
        case types.GENERAL_LIST_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                general:action.payroll.data.maintenanceReasons.results
            }
        }
        case types.GENERAL_LIST_ERROR: {
            return {
                ...state,
                isLoading: false
            }
        }
        case types.FAILURE_LIST_REQUEST: {
            return {
                ...state,
                isLoading: true,
                failure:[]
            }
        }
        case types.FAILURE_LIST_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                failure:action.payroll.data.maintenanceReasons.results
            }
        }
        case types.FAILURE_LIST_ERROR: {
            return {
                ...state,
                isLoading: false
            }
        }
        case types.SOURCE_TREND_LIST_REQUEST: {
            return {
                ...state,
                isLoading: true,
                sourceList:[]
            }
        }
        case types.SOURCE_TREND_LIST_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                sourceList:action.payroll.data.maintenanceReasons.results.map((e)=>{return e.source })
            }
        }
        case types.SOURCE_TREND_LIST_ERROR: {
            return {
                ...state,
                isLoading: false
            }
        }
        default: return state;
    }

}

export default particularReducer;