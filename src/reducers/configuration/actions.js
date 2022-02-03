import types from './types'

export const SourceRecords = (data) => {
    return {
        type: types.SOURCE_LIST_REQUEST,
        payroll: data
    }
}

export const ActionSource = (data) => {
    return {
        type: data.actiontype === "delete" ? types.ACTION_SOURCE_DELETE : data.actiontype === "update" ? types.ACTION_SOURCE_UPDATE : types.ACTION_SOURCE_ADD,
        payroll: data
    }
}

export const UpdateFilterPagination = (data) => {
    return {
        type: types.FILTER_SOURCE_PAGINATION,
        payroll: data
    }
}

export const SourceType = () => {
    return {
        type: types.SOURCE_TYPE_REQUEST
    }
}