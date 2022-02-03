import types from './types'

export const AdminRecords = (data) => {
    return {
        type: types.ADMIN_LIST_REQUEST,
        payroll: data
    }
}

export const GetGroup = (data) => {
    return {
        type: types.GROUP_ADMIN_REQUEST,
        payroll: data
    }
}

export const ActionSource = (data) => {
    return {
        type:  types.ACTION_ADMIN_ADD,
        payroll: data
    }
}

export const UpdateFilterPagination = (data) => {
    return {
        type: types.FILTER_ADMIN_PAGINATION,
        payroll: data
    }
}
