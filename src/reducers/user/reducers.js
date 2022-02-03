import types from './types'
const initialState = {
    user:{},
    dash:[],
    sourceList:[],
    permission:{},
    isLoading: false,
    timeZone:"",
    fullscreen:false
}
const Mapping = (data)=>{
    let e =[];
    for(var x of data){
        for(var a of x.permissions)
            e.push(a)
    }
    let view=[],add =[],deletelist=[],change=[];
    for(var y of e)
    {
        let string = y.split(" | ");
        let valcheck =string[2];
        let status = valcheck.indexOf(" view ")>-1?"view":valcheck.indexOf(" add ")>-1?"add":valcheck.indexOf(" change ")>-1?"change":valcheck.indexOf(" delete ")>-1?"delete":"";
        let val= string[1].replace(" ","");
        if(status === "view")
        {
            view.push(val)
        }
        else if(status === "add")
        {
            add.push(val)
        }
        else if(status === "change")
        {
            change.push(val)
        }
        else if(status === "delete")
        {
            deletelist.push(val)
        }
    }
    let result ={
        view:view,
        add:add,
        delete:deletelist,
        change:change
    }
    return result;
}
const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.USER_DETAILS_REQUEST: {
            return {
                ...state,
                permission:{},
                user:{},
                isLoading: true,
            }
        }
        case types.USER_DETAILS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                user:action.payroll.data.me,
                permission:Mapping(action.payroll.data.me.groups)
            }
        }
        case types.USER_DETAILS_FAILURE: {
            return {
                ...state,
                isLoading: false
            }
        }
        case types.DASH_DETAILS_REQUEST: {
            return {
                ...state,
            }
        }
        case types.DASH_DETAILS_SUCCESS: {
            return {
                ...state,
                dash:action.payroll.data.customDashboard
            }
        }
        case types.SOURCE_PROFILE_LIST_REQUEST: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case types.SOURCE_PROFILE_LIST_SUCCESS: {
            return {
                ...state,
                sourceList:action.payroll.data.source.results.filter
                ((e) => e !== null),
                isLoading: false
            }
        }
        case types.SOURCE_PROFILE_LIST_FAILURE: {
            return {
                ...state,
                isLoading: false
            }
        }
        case types.TZ_PROFILE_REQUEST:{
            return {
                ...state,
                timeZone: action.payroll
            }
        }
        case types.SET_FULLSCREEN_REQUEST:{
            return {
                ...state,
                fullscreen: action.payroll
            }
        }
        default: return state;
    }

}

export default userReducer;