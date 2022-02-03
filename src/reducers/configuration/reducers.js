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
    sourceType: [],
    updatecount: 0
}
const updateData = (data, update) => {
    delete update.type;
    for (var x in data) {
        if (data[x].source === update.source) {
            data[x] = update
        }
    }
    return data
}
const sourceReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.SOURCE_LIST_REQUEST: {
            return {
                ...state,
                isLoading: true,
                data: [],
                filterData: [],
                pageBound: { current: 1, upperbound: 1, lowerbound: 0 },
                page: 1,
                totalPage: 1,
                totalElements: 0,
            }
        }
        case types.SOURCE_LIST_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                data: action.payroll.data.source.results.filter
                    ((e) => e !== null),
                totalElements: action.payroll.data.source.totalElements,
            }
        }
        case types.SOURCE_LIST_FAILURE: {
            return {
                ...state,
                isLoading: false
            }
        }
        case types.ACTION_SOURCE_ADD: {
            return {
                ...state,
                data: state.data.concat(action.payroll),
                filterData: state.filterData.concat(action.payroll),
                totalElements: state.totalElements + 1
            }
        }
        case types.ACTION_SOURCE_UPDATE: {
            let payrolldataupdate = action.payroll.updateSource.source;
            var DataUpdate = updateData(state.data, payrolldataupdate);
            var FilterUpdate = updateData(state.filterData, payrolldataupdate);
            return {
                ...state,
                data: DataUpdate,
                filterData: FilterUpdate,
                updatecount: state.updatecount + 1
            }
        }
        case types.ACTION_SOURCE_DELETE: {
            let payrolldelete = action.payroll;
            let dataafterremoved = state.data.filter(e => e.source !== payrolldelete.source)
            let filterdataafterremoved = state.filterData.filter(e => e.source !== payrolldelete.source)
            return {
                ...state,
                data: dataafterremoved,
                filterData: filterdataafterremoved,
                totalElements: state.totalElements - 1
            }
        }
        case types.FILTER_SOURCE_PAGINATION: {
            let datafilter = action.payroll;
            return {
                ...state,
                filter: datafilter.filter ? datafilter.filter : datafilter.filter,
                filterData: datafilter.filterData ? datafilter.filterData.filter
                ((e) => e !== null) : [],
                page: datafilter.page ? datafilter.page : 1,
                size: datafilter.size ? datafilter.size : 5,
                totalPage: datafilter.totalPage ? datafilter.totalPage : 1,
                totalElements: datafilter.totalElements ? datafilter.totalElements : 0,
                pageBound: datafilter.pageBound ? datafilter.pageBound : { current: 1, upperbound: 1, lowerbound: 0 }
            }
        }
        case types.SOURCE_TYPE_SUCCESS: {
            return {
                ...state,
                sourceType: action.payroll.data.sourceType
            }
        }
        default: return state;
    }

}

export default sourceReducer;