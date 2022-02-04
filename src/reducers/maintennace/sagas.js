import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { fetch, paginationFilter } from '../../Projects/tardis/src/utils'
import query from '../../Projects/tardis/src/assets/constant/query'
import types from './types'

const getmaintenance = state => state.maintennace;

export function* fetchList() {
    let response;
    try {
        let hasrow = false, size = 1000, data={};
        do {
            response = yield call(fetch, query.Maintenance({size}));
            data = yield response.data;
            size += 1000;
            hasrow = data.data.maintenanceReasons.hasNextPage;
            if (hasrow)
                size = data.data.maintenanceReasons.totalElements;
            }
        while (hasrow)
        yield put({ type: types.MAINTENNACE_LIST_SUCCESS, payroll: data });
        let maintenanceList = data.data.maintenanceReasons.results;
        const maintenance = yield select(getmaintenance);
        if(maintenanceList.length > 0){
            let result = paginationFilter(maintenance)
            result.page = 1;
            result.filter={};
            yield put({ type: types.FILTER_MAINTENNACE_PAGINATION, payroll: result });
        }

    }
    catch (error) {
        yield put({ type: types.MAINTENNACE_LIST_FAILURE });
    }
}

export function* fetchFilter() {

    let response;
    try {
        let hasrow = false, size = 1000, data = {};
        do {
            response = yield call(fetch, query.sourceDash(size));
            data = yield response.data;
            size += 1000;
            hasrow = data.data.source.hasNextPage;
            if (hasrow)
                size = data.data.source.totalElements;

        }
        while (hasrow)
        yield put({ type: types.SOURCE_MAINTENNACE_LIST_SUCCESS, payroll: data });
        let responsealert = yield call(fetch, query.reasonLookup());
        const dataalert = yield responsealert.data;
        yield put({ type: types.REASON_MAINTENNACE_LIST_SUCCESS, payroll: dataalert });
    }
    catch (error) {

    }
}


export function* loadList() {
    yield takeLatest(types.MAINTENNACE_LIST_REQUEST, fetchList);
    yield takeLatest(types.FILTER_MAINTENNACE_LIST_REQUEST, fetchFilter);
}

export default function* mainSaga() {
    yield all([loadList()]);
}