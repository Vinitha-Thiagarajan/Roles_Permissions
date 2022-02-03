import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import types from './types'
import { fetch } from '../../Projects/tardis-ui/src/utils'
import query from '../../Projects/tardis-ui/src/assets/constant/query'
import { PageController } from '../../Projects/tardis-ui/src/pages/Dashboard/Components/Controller'

const getdashboard = state => state.dashboard;

export function* fetchSourceList() {
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
        yield put({ type: types.SOURCE_DASH_LIST_SUCCESS, payroll: data });

    }
    catch (error) {
        
    }
}

export function* fetchList(action) {
    let response;
    try {
        let hasrow = false, size = 100, data = {};
        do {
            let request = action.payroll;
            request.size = size;
            response = yield call(fetch, query.dashboardList(request));
            data = yield response.data;
            hasrow = data.data.dataAvailability.hasNextPage;
            if (hasrow)
                size = data.data.dataAvailability.totalElements;

        }
        while (hasrow)
        yield put({ type: types.PIPELINE_LIST_SUCCESS, payroll: data });
        const dashboard = yield select(getdashboard);
        let filterdata = PageController(dashboard,false)
        yield put({ type: types.FILTER_PIPELINE_PAGINATION, payroll: filterdata });
    }
    catch (error) {

    }
}

export function* loadList() {
    yield takeLatest(types.SOURCE_DASH_LIST_REQUEST, fetchSourceList);
    yield takeLatest(types.PIPELINE_LIST_REQUEST, fetchList);
}

export default function* mainSaga() {
    yield all([loadList()]);
}