import types from './types'

export const SourceFetch = (data) => {
    return {
        type: types.DETAIL_PAGE_REQUEST,
        payroll: data
    }
}
