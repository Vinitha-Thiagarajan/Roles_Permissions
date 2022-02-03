import { combineReducers } from 'redux';
import { all, fork} from 'redux-saga/effects'
import sourceReducers, {saga as sourceSaga} from './configuration'
import sourceMapReducers, {saga as sourceMapSaga} from './mapsource'
import dashboardMapReducers, {saga as dashboardSaga} from './dashboard'
import slackMapReducers, {saga as slackSaga} from './slack'
import maintennaceReducers, {saga as maintennaceSaga} from './maintennace'
import detailsReducers, {saga as detailsSaga} from './dashdetails'
import trendReducers, {saga as trendsSaga} from './trendchart'
import userReducers, {saga as userSaga} from './user'
import adminReducers, {saga as adminSaga} from './admin'
import testcaseReducers, {saga as testcaseSaga} from './testcase'
import rolesReducers from '../reducers/roles'
import traceabilityReducer from "./Traceability/traceability.reducer";
import overviewReducer from "./Overview/overview.reducer";
import anamolyReducer from "./Anamoly/anamoly.reducer";
import chartReducer from "./TraceabilityChart/tracechart.reducer";
import auditReducer from "./AuditLog/auditlog.reducer";
import { routerReducer } from "react-router-redux";

export function* rootSaga() {
    yield all([
        fork(sourceSaga),
        fork(sourceMapSaga),
        fork(dashboardSaga),
        fork(slackSaga),
        fork(maintennaceSaga),
        fork(detailsSaga),
        fork(trendsSaga),
        fork(userSaga),
        fork(adminSaga),
        fork(testcaseSaga)
     ])
}

export default combineReducers({
    source: sourceReducers,
    map: sourceMapReducers,
    dashboard: dashboardMapReducers,
    slack: slackMapReducers,
    maintennace: maintennaceReducers,
    detail: detailsReducers,
    trend: trendReducers,
    user: userReducers,
    admin: adminReducers,
    testcase: testcaseReducers,
    roles: rolesReducers,
    traceability: traceabilityReducer,
    overview: overviewReducer,
    anamoly:anamolyReducer,
    chart:chartReducer,
    routing: routerReducer,
    audit: auditReducer
});