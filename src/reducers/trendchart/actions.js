import types from './types'

export const ParticularTrend = (data) => {
    return {
        type: types.TREND_SOURCE_LIST_REQUEST,
        payroll: data
    }
}

export const SourceList = (data) => {
    return {
        type: types.SOURCE_TREND_LIST_REQUEST,
        payroll: data
    }
}

export const OverallRecords = (data) => {
    return {
        type: types.OVERALL_LIST_REQUEST,
        payroll: data
    }
}

export const GeneralRecords = (data) => {
    return {
        type: types.GENERAL_LIST_REQUEST,
        payroll: data
    }
}
export const FailureRecords= (data) => {
    return {
        type: types.FAILURE_LIST_REQUEST,
        payroll: data
    }
}