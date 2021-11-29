import { combineReducers } from 'redux';
import rolesReducers from './roles'

export default combineReducers({
    roles: rolesReducers
});