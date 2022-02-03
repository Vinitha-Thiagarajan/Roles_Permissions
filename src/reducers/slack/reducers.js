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
    AlertList:[],
    sourceList:[]
}
const updateData = (data, update) => {
    for (var x in data) {
        if (data[x].id === update.id) {
            data[x].slackChannels = update.slackChannels;
            data[x].isActive = update.isActive;
        }
    }
    return data
}
const slackReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.SLACK_LIST_REQUEST: {
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
        case types.SLACK_LIST_SUCCESS: {
            let slackdata = action.payroll.data.slackSubscription;
            return {
                ...state,
                isLoading: false,
                data: slackdata.results.filter
                    ((e) => e !== null),
                totalElements: slackdata.results.filter
                ((e) => e !== null).length,
            }
        }
        case types.SLACK_LIST_FAILURE: {
            return {
                ...state,
                isLoading: false
            }
        }
        case types.FILTER_SLACK_PAGINATION: {
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
        case types.FILTER_SLACK_LIST_REQUEST: {
            return {
                ...state,
                AlertList:[],
                sourceList:[],
                isLoading: true,
            }
        }
        case types.SOURCE_SLACK_LIST_SUCCESS: {
            return {
                ...state,
                sourceList: action.payroll.data.source.results.filter
                    ((e) => e !== null)
            }
        }
        case types.ALERT_SLACK_LIST_SUCCESS: {
            return {
                ...state,
                AlertList: action.payroll.data.slackAlertLevel.results.filter
                    ((e) => e !== null)
            }
        }
        case types.ACTION_SLACK_ADD: {
            return {
                ...state,
                data: state.data.concat(action.payroll),
                filterData: state.filterData.concat(action.payroll),
                totalElements: state.totalElements + 1
            }
        }
        case types.ACTION_SLACK_UPDATE: {
            let payrolldataupdate = action.payroll.slackSubscription.slackSubscription;
            var DataUpdate = updateData(state.data, payrolldataupdate);
            var FilterUpdate = updateData(state.filterData, payrolldataupdate);
            return {
                ...state,
                data: DataUpdate,
                filterData: FilterUpdate,
                updatecount: state.updatecount + 1
            }
        }
        case types.ACTION_SLACK_DELETE: {
            let payrolldelete = action.payroll;
            let dataafterremoved = state.data.filter(e => e.id !== payrolldelete.id )
            let filterdataafterremoved = state.filterData.filter(e => e.id !== payrolldelete.id )
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

export default slackReducer;