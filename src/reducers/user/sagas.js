import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetch } from '../../Projects/tardis-ui/src/utils'
import query from '../../Projects/tardis-ui/src/assets/constant/query'
import types from './types'

export function* fetchDetails() {

    try {
        let response = yield call(fetch, query.Me());
        const data = yield response.data;
        yield put({ type: types.USER_DETAILS_SUCCESS, payroll: data });
    }
    catch (error) {
        yield put({ type: types.USER_DETAILS_FAILURE });
    }
}

export function* fetchDashDetails() {

    try {
        let response = yield call(fetch, query.getCustomDash());
        const data = yield response.data;
        yield put({ type: types.DASH_DETAILS_SUCCESS, payroll: data });
    }
    catch (error) {

    }
}
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
        yield put({ type: types.SOURCE_PROFILE_LIST_SUCCESS, payroll: data });

    }
    catch (error) {
        yield put({ type: types.SOURCE_PROFILE_LIST_FAILURE});
    }
}

export function* loadList() {
    yield takeLatest(types.USER_DETAILS_REQUEST, fetchDetails);
    yield takeLatest(types.DASH_DETAILS_REQUEST, fetchDashDetails);
    yield takeLatest(types.SOURCE_PROFILE_LIST_REQUEST, fetchSourceList);
}

export default function* mainSaga() {
    yield all([loadList()]);
}