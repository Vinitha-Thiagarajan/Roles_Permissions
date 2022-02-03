import types from './types'
const initialState = {
    data:[],
    isLoading:false
}

const detailsReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.DETAIL_PAGE_REQUEST: {
            return {
                ...state,
                data:[],
                isLoading: true,
            }
        }
        case types.DETAIL_PAGE_SUCCESS: {
            return {
                ...state,
                data: action.payroll,
                isLoading: false,
            }
        }
        case types.DETAIL_PAGE_FAILURE: {
            return {
                isLoading: false,
            }
        }
       
        default: return state;
    }

}

export default detailsReducer;