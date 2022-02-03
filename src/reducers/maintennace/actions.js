import types from './types'

export const MaintennaceRecords = (data) => {
    return {
        type: types.MAINTENNACE_LIST_REQUEST,
        payroll: data
    }
}

export const UpdateFilterPagination = (data) => {
    return {
        type: types.FILTER_MAINTENNACE_PAGINATION,
        payroll: data
    }
}

export const ActionSource = (data) => {
    return {
        type: data.actiontype === "delete" ? types.ACTION_MAINTENNACE_DELETE : data.actiontype === "update" ? types.ACTION_MAINTENNACE_UPDATE : types.ACTION_MAINTENNACE_ADD,
        payroll: data
    }
}

export const FilterMaintennaceRecords = (data) => {
    return {
        type: types.FILTER_MAINTENNACE_LIST_REQUEST,
        payroll: data
    }
}