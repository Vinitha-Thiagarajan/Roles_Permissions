import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetch } from '../../Projects/tardis-ui/src/utils'
import query from '../../Projects/tardis-ui/src/assets/constant/query'
import types from './types'

export function* fetchList(action) {
    try {
        var request=action.payroll
        request.size =5000;
        let response = yield call(fetch, query.Maintenance(request));
        let data = yield response.data;
        yield put({ type: types.TREND_SOURCE_LIST_SUCCESS, payroll: data });
    }
    catch (error) {
        yield put({ type: types.TREND_SOURCE_LIST_ERROR });
    }
}

export function* fetchOverall(action) {
    try {

        let hasrow = false, data = {};
        var request=action.payroll
        request.size =1000;
        do {
            let response = yield call(fetch, query.Maintenance(request));
            data = yield response.data;
            hasrow = data.data.maintenanceReasons.hasNextPage;
            if (hasrow)
                request.size = data.data.maintenanceReasons.totalElements;
        }
        while (hasrow)
        yield put({ type: types.OVERALL_LIST_SUCCESS, payroll: data });
    }
    catch (error) {
        yield put({ type: types.OVERALL_LIST_ERROR });
    }
}

export function* fetchGeneral(action) {
    try {

        let hasrow = false, data = {};
        var request=action.payroll
        request.size =1000;
        do {
            let response = yield call(fetch, query.Maintenance(request));
            data = yield response.data;
            hasrow = data.data.maintenanceReasons.hasNextPage;
            if (hasrow)
                request.size = data.data.maintenanceReasons.totalElements;
        }
        while (hasrow)
        yield put({ type: types.GENERAL_LIST_SUCCESS, payroll: data });
    }
    catch (error) {
        yield put({ type: types.GENERAL_LIST_ERROR });
    }
}

export function* fetchFailure(action) {
    try {

        let hasrow = false, data = {};
        var request=action.payroll
        request.size =1000;
        do {
            let response = yield call(fetch, query.Maintenance(request));
            data = yield response.data;
            hasrow = data.data.maintenanceReasons.hasNextPage;
            if (hasrow)
                request.size = data.data.maintenanceReasons.totalElements;
        }
        while (hasrow)
        yield put({ type: types.FAILURE_LIST_SUCCESS, payroll: data });
    }
    catch (error) {
        yield put({ type: types.FAILURE_LIST_ERROR });
    }
}

export function* fetchSourceList() {
    try {

        let hasrow = false, data = {};
        var request={}
        request.size =1000;
        do {
            let response = yield call(fetch, query.Maintenance(request));
            data = yield response.data;
            hasrow = data.data.maintenanceReasons.hasNextPage;
            if (hasrow)
                request.size = data.data.maintenanceReasons.totalElements;
        }
        while (hasrow)
        yield put({ type: types.SOURCE_TREND_LIST_SUCCESS, payroll: data });
    }
    catch (error) {
        yield put({ type: types.SOURCE_TREND_LIST_ERROR });
    }
}


export function* loadList() {
    yield takeLatest(types.TREND_SOURCE_LIST_REQUEST, fetchList);
    yield takeLatest(types.OVERALL_LIST_REQUEST, fetchOverall);
    yield takeLatest(types.GENERAL_LIST_REQUEST, fetchGeneral);
    yield takeLatest(types.FAILURE_LIST_REQUEST, fetchFailure);
    yield takeLatest(types.SOURCE_TREND_LIST_REQUEST,fetchSourceList);
}

export default function* mainSaga() {
    yield all([loadList()]);
}