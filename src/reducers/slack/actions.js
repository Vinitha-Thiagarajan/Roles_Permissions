import types from './types'

export const SlackRecords = (data) => {
    return {
        type: types.SLACK_LIST_REQUEST,
        payroll: data
    }
}

export const UpdateFilterPagination = (data) => {
    return {
        type: types.FILTER_SLACK_PAGINATION,
        payroll: data
    }
}

export const ActionSource = (data) => {
    return {
        type: data.actiontype === "delete" ? types.ACTION_SLACK_DELETE : data.actiontype === "update" ? types.ACTION_SLACK_UPDATE : types.ACTION_SLACK_ADD,
        payroll: data
    }
}

export const FilterSlackRecords = (data) => {
    return {
        type: types.FILTER_SLACK_LIST_REQUEST,
        payroll: data
    }
}