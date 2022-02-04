import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchDV } from '../../Projects/tardis/src/utils'
import query from '../../Projects/tardis/src/assets/constant/query'
import types from './types'

export function* fetchList() {
    let response;
    try {
        let data = {};
        response = yield call(fetchDV, query.Expectation());
        data = yield response.data;
        yield put({ type: types.EXPECTATION_LIST_SUCCESS, payroll: data });
    }
    catch (error) {
        yield put({ type: types.EXPECTATION_LIST_FAILURE });
    }
}

export function* fetchHistoryList() {
    let response;
    try {
        let data = {};
        response = yield call(fetchDV, query.PipelineHistory());
        data = yield response.data;
        yield put({ type: types.PIPELINE_HISTORY_LIST_SUCCESS, payroll: data });
    }
    catch (error) {
        yield put({ type: types.PIPELINE_HISTORY_LIST_FAILURE });
    }
}

export function* loadList() {
    yield takeLatest(types.EXPECTATION_LIST_REQUEST, fetchList);
    yield takeLatest(types.PIPELINE_HISTORY_LIST_REQUEST, fetchHistoryList);
}

export default function* mainSaga() {
    yield all([loadList()]);
}