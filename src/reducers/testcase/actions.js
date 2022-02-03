import types from './types'

export const ExpectationRecords = (data) => {
    return {
        type: types.EXPECTATION_LIST_REQUEST,
        payroll: data
    }
}

export const SourceHistory = (data) => {
    return {
        type: types.PIPELINE_HISTORY_LIST_REQUEST,
        payroll: data
    }
}

export const AddSourceHistory = (data,source) => {
    return {
        type: types.PIPELINE_HISTORY_LIST_ADD,
        payroll: data,
        source : source
    }
}