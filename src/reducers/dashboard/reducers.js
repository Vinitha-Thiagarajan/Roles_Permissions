import types from './types'
const initialState = {
    isLoading: false,
    data: [],
    filterData: [],
    page: 1,
    size: 15,
    totalPage: 1,
    totalElements: 0,
    pageBound: { current: 1, upperbound: 1, lowerbound: 0 },
    sourceNames: [],
    startdate:new Date(),
    endcount:1,
    filter:false,
    successCount:0,
    failureCount:0,
    delayCount:0,
    sourceList:[],
    fullSourceList:[],
    filterSource:[],
    currentSourceList:[],
    Nav:"",
    dateFilter:false
}

const dashboardReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.PIPELINE_LIST_REQUEST: {
            return {
                ...state,
                data: [],
                filterData: [],
                isLoading: true,
            }
        }
        case types.PIPELINE_LIST_SUCCESS: {
            return {
                ...state,
                data: action.payroll.data.dataAvailability.results.filter
                    ((e) => e !== null),
                isLoading: false,
            }
        }
       case types.FILTER_PIPELINE_PAGINATION: {
            let datafilter = action.payroll;
            return {
                ...state,
                filterData: datafilter.filterData ? datafilter.filterData.filter
                ((e) => e !== null) : [],
                page: datafilter.page ? datafilter.page : state.page,
                filter:datafilter.filter !=undefined ? datafilter.filter:false,
                size: datafilter.size ? datafilter.size : state.size,
                totalElements:datafilter.totalElements ? datafilter.totalElements : state.totalElements,
                totalPage: datafilter.totalPage ? datafilter.totalPage : 1,
                sourceNames: datafilter.sourceNames ? datafilter.sourceNames : [],
                pageBound: datafilter.pageBound ? datafilter.pageBound : { current: 1, upperbound: 1, lowerbound: 0 },
                startdate:datafilter.startdate ? datafilter.startdate:new Date(),
                endcount:datafilter.endcount ? datafilter.endcount:1,
                successCount: datafilter.successCount ? datafilter.successCount : 0,
                failureCount: datafilter.failureCount ? datafilter.failureCount : 0,
                delayCount: datafilter.delayCount ? datafilter.delayCount : 0,
                sourceList:datafilter.sourceList ? datafilter.sourceList : [],
                Nav: datafilter.Nav? datafilter.Nav:"",
                filterSource:datafilter.filterSource ? datafilter.filterSource : [],
                currentSourceList:datafilter.currentSourceList ? datafilter.currentSourceList : [],
                dateFilter:datafilter.dateFilter !=undefined  ? datafilter.dateFilter : false
            }
        }
        case types.SOURCE_DASH_LIST_REQUEST: {
            return {
                ...state,
                isLoading: true,
                sourceList:[],
                fullSourceList:[],
                totalElements:0,
                page: 1,
                totalPage: 1,
                pageBound: { current: 1, upperbound: 1, lowerbound: 0 },
                sourceNames: [],
                startdate:new Date(),
                endcount:1,
                filter:false,
                successCount:0,
                failureCount:0,
                delayCount:0,
                Nav:"",
                filterSource:[],
                currentSourceList:[],
                dateFilter:false
            }
        }
        case types.SOURCE_DASH_LIST_SUCCESS: {
            return {
                ...state,
                sourceList: action.payroll.data.source.results.filter
                    ((e) => e !== null),
                fullSourceList: action.payroll.data.source.results.filter
                    ((e) => e !== null),
                totalElements: action.payroll.data.source.totalElements,
            }
        }
        default: return state;
    }

}

export default dashboardReducer;