import types from './types'

export const SourceMapRecords = () => {
    return {
        type: types.MAP_LIST_REQUEST
    }
}

export const ActionSource = (data) => {
    return {
        type: data.actiontype === "delete" ? types.ACTION_SOURCEMAP_DELETE : data.actiontype === "update" ? types.ACTION_SOURCEMAP_UPDATE : types.ACTION_SOURCEMAP_ADD,
        payroll: data
    }
}

export const UpdateFilterPagination = (data) => {
    return {
        type: types.FILTER_MAP_PAGINATION,
        payroll: data
    }
}

export const FilterMapRecords = (data) => {
    return {
        type: types.FILTER_MAP_LIST_REQUEST,
        payroll: data
    }
}