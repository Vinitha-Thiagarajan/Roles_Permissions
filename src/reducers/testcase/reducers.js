import types from './types'
const initialState = {
    isLoading: false,
    expectdata: false,
    pipelinehistory:false,
    searchfilter:false,
    deleteList:false,
}
const ExpectationReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.EXPECTATION_LIST_REQUEST: {
            return {
                ...state,
                isLoading: true,
                expectdata: [],
                searchfilter:false
            }
        }
        case types.EXPECTATION_LIST_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                expectdata: action.payroll.data.masterExpectations,
            }
        }
        case types.EXPECTATION_LIST_FAILURE: {
            return {
                ...state,
                isLoading: false,
                expectdata:[],
            }
        }
        case types.PIPELINE_HISTORY_LIST_REQUEST: {
            return {
                ...state,
                isLoading: true,
                pipelinehistory: [],
            }
        }
        case types.PIPELINE_HISTORY_LIST_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                pipelinehistory: action.payroll.data.groupByPipelineExpectations.results
            }
        }
        case types.PIPELINE_HISTORY_LIST_FAILURE: {
            return {
                ...state,
                isLoading: false,
                pipelinehistory:false
            }
        }
        case types.PIPELINE_HISTORY_LIST_ADD: {
            return {
                ...state,
                pipelinehistory: action.payroll,
                searchfilter:action.source == "delete" ? state.searchfilter : action.source,
                deleteList : action.source == "delete"? !state.deleteList: state.deleteList
            }
        }
        default: return state;
    }

}

export default ExpectationReducer;