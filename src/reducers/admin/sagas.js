import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { fetch } from '../../Projects/tardis-ui/src/utils'
import query from '../../Projects/tardis-ui/src/assets/constant/query'
import types from './types'

const getsource = state => state.source;

export function* fetchList() {
    let response;
    try {
        let hasrow = false, size = 1000, data = {};
        do {
            response = yield call(fetch, query.Admin(size));
            data = yield response.data;
            size += 1000;
            hasrow = data.data.users.hasNextPage;
            if (hasrow)
                size = data.data.users.totalElements;
        }
        while (hasrow)
        yield put({ type: types.ADMIN_LIST_SUCCESS, payroll: data });

    }
    catch (error) {
        yield put({ type: types.ADMIN_LIST_FAILURE });
    }
}

export function* fetchGroupList() {

    try {
        let response = yield call(fetch, query.AdminGroup());
        const data = yield response.data;
        yield put({ type: types.GROUP_ADMIN_SUCCESS, payroll: data });
    }
    catch (error) {

    }
}

export function* loadList() {
    yield takeLatest(types.ADMIN_LIST_REQUEST, fetchList);
    yield takeLatest(types.GROUP_ADMIN_REQUEST, fetchGroupList);
}

export default function* mainSaga() {
    yield all([loadList()]);
}