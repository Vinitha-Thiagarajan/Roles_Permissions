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
    updatecount:0,
    GroupList:[]
}
const updateData = (data, update) => {
    for (var x in data) {
        if (data[x].id === update.id) {
            data[x] = update
        }
    }
    return data
}
const adminReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.ADMIN_LIST_REQUEST: {
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
        case types.ADMIN_LIST_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                data: action.payroll.data.users.results.filter
                    ((e) => e !== null),
                totalElements: action.payroll.data.users.totalElements,
            }
        }
        case types.ADMIN_LIST_FAILURE: {
            return {
                ...state,
                isLoading: false
            }
        }
        case types.FILTER_ADMIN_PAGINATION: {
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
        case types.ACTION_ADMIN_ADD: {
            let payrolldataupdate = action.payroll.updateUserGroup.user;
            var DataUpdate = updateData(state.data, payrolldataupdate);
            var FilterUpdate = updateData(state.filterData, payrolldataupdate);
            return {
                ...state,
                data: DataUpdate,
                filterData: FilterUpdate,
                updatecount: state.updatecount + 1  
            }
        }
        case types.GROUP_ADMIN_REQUEST: {
            return {
                ...state,
                GroupList:[]
            }
        }
        case types.GROUP_ADMIN_SUCCESS: {
            return {
                ...state,
                GroupList:action.payroll.data.groups
            }
        }
        default: return state;
    }

}

export default adminReducer;