import types from './types'
const initialState = {
    isLoading: false,
    projectList:[]
}
const updateData = (data, update) => {
    for (var x in data) {
        if (data[x].id === update.id) {
            data[x] = update
        }
    }
    return data
}
const rolesReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.ADD_PROJECT_REQUEST: {
            return {
                ...state,
                isLoading: true,
                projectList: [],
            }
        }
        case types.ADD_PROJECT_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                projectList: action.payroll
            }
        }
        case types.ADD_PROJECT_FAILURE: {
            return {
                ...state,
                isLoading: false
            }
        }
        default: return state;
    }

}

export default rolesReducer;