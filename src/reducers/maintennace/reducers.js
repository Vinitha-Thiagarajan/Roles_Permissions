import types from './types'

const initialState = {
    isLoading: false,
    data: [],
    filterData: [],
    filter: {},
    page: 1,
    size: 5,
    totalPage: 1,
    totalElements: 0,
    pageBound: { current: 1, upperbound: 1, lowerbound: 0 },
    updatecount: 0,
    ReasonList:[],
    sourceList:[]
}
const updateData = (data, update) => {
    for (var x in data) {
        if (data[x].id === update.id) {
            data[x].comments = update.comments;
            data[x].failureDelayReason = update.failureDelayReason;
            data[x].logdate = update.logdate;
            data[x].status = update.status;
            data[x].source = update.source;
        }
    }
    return data
}
const maintennaceReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.MAINTENNACE_LIST_REQUEST: {
            return {
                ...state,
                isLoading: true,
                data: [],
                filterData: [],
                pageBound: { current: 1, upperbound: 1, lowerbound: 0 },
                page: 1,
                totalPage: 1,
                totalElements: 0,
                updatecount: 0,
            }
        }
        case types.MAINTENNACE_LIST_SUCCESS: {
            let maintenanceReasons = action.payroll.data.maintenanceReasons;
            return {
                ...state,
                isLoading: false,
                data: maintenanceReasons.results.filter
                    ((e) => e !== null),
                totalElements: maintenanceReasons.results.filter
                ((e) => e !== null).length,
            }
        }
        case types.MAINTENNACE_LIST_FAILURE: {
            return {
                ...state,
                isLoading: false
            }
        }
        case types.FILTER_MAINTENNACE_PAGINATION: {
            let datafilter = action.payroll;
            return {
                ...state,
                filter: datafilter.filter ? datafilter.filter : {},
                filterData: datafilter.filterData ? datafilter.filterData : [],
                page: datafilter.page ? datafilter.page : 1,
                size: datafilter.size ? datafilter.size : 5,
                totalPage: datafilter.totalPage ? datafilter.totalPage : 1,
                totalElements: datafilter.totalElements ? datafilter.totalElements : 0,
                pageBound: datafilter.pageBound ? datafilter.pageBound : { current: 1, upperbound: 1, lowerbound: 0 }
            }
        }
        case types.FILTER_MAINTENNACE_LIST_REQUEST: {
            return {
                ...state,
                AlertList:[],
                sourceList:[],
                isLoading: true,
            }
        }
        case types.SOURCE_MAINTENNACE_LIST_SUCCESS: {
            return {
                ...state,
                sourceList: action.payroll.data.source.results.filter
                    ((e) => e !== null)
            }
        }
        case types.REASON_MAINTENNACE_LIST_SUCCESS: {
            return {
                ...state,
                ReasonList: action.payroll.data.maintenanceStatusLookup.filter
                    ((e) => e !== null)
            }
        }
        case types.ACTION_MAINTENNACE_ADD: {
            return {
                ...state,
                data: state.data.concat(action.payroll),
                filterData: state.filterData.concat(action.payroll),
                totalElements: state.totalElements + 1
            }
        }
        case types.ACTION_MAINTENNACE_UPDATE: {
            let payrolldataupdate = action.payroll.updateMaintenanceReason.maintenanceReason;
            var DataUpdate = updateData(state.data, payrolldataupdate);
            var FilterUpdate = updateData(state.filterData, payrolldataupdate);
            return {
                ...state,
                data: DataUpdate,
                filterData: FilterUpdate,
                updatecount: state.updatecount + 1
            }
        }
        case types.ACTION_MAINTENNACE_DELETE: {
            let payrolldelete = action.payroll;
            let dataafterremoved = state.data.filter(e => e.id !==payrolldelete.id )
            let filterdataafterremoved = state.filterData.filter(e => e.id !==payrolldelete.id )
            return {
                ...state,
                data: dataafterremoved,
                filterData: filterdataafterremoved,
                totalElements: state.totalElements - 1
            }
        }
        default: return state;
    }

}

export default maintennaceReducer;