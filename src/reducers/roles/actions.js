import types from './types'

export const AddProject = (data) => {
    return {
        type: types.ADD_PROJECT_REQUEST,
        payroll: data
    }
}