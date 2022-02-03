import types from './types'

export const UserDetails = (data) => {
    return {
        type: types.USER_DETAILS_REQUEST,
        payroll: data
    }
}

export const DashDetails = (data) => {
    return {
        type: types.DASH_DETAILS_REQUEST,
        payroll: data
    }
}

export const SourceDashRecords = (data) => {
    return {
        type: types.SOURCE_PROFILE_LIST_REQUEST,
        payroll: data
    }
}

export const TimeZone = (data) => {
    return {
        type: types.TZ_PROFILE_REQUEST,
        payroll: data
    }
}

export const SetFullScreen= (data) =>{
    return {
        type: types.SET_FULLSCREEN_REQUEST,
        payroll: data
    }
}