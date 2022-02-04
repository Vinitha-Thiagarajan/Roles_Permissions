import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { fetch, paginationFilter } from '../../Projects/tardis/src/utils'
import query from '../../Projects/tardis/src/assets/constant/query'
import types from './types'

const getsource = state => state.source;

export function* fetchList() {
    let response;
    try {
        let hasrow = false, size = 1000, data = {};
        do {
            response = yield call(fetch, query.source(size));
            data = yield response.data;
            size += 1000;
            hasrow = data.data.source.hasNextPage;
            if (hasrow)
                size = data.data.source.totalElements;
        }
        while (hasrow)
        yield put({ type: types.SOURCE_LIST_SUCCESS, payroll: data });
        let sourceList = data.data.source.results;
        const source = yield select(getsource);
        if(sourceList.length > 0){
            let result = paginationFilter(source)
            result.page = 1;
            result.filter={};
            yield put({ type: types.FILTER_SOURCE_PAGINATION, payroll: result });
        }

    }
    catch (error) {
        yield put({ type: types.SOURCE_LIST_FAILURE });
    }
}

export function* fetchType() {

    try {
        let response = yield call(fetch, query.sourceType());
        const data = yield response.data;
        yield put({ type: types.SOURCE_TYPE_SUCCESS, payroll: data });
    }
    catch (error) {

    }
}


export function* loadList() {
    yield takeLatest(types.SOURCE_LIST_REQUEST, fetchList);
    yield takeLatest(types.SOURCE_TYPE_REQUEST, fetchType);
}

export default function* mainSaga() {
    yield all([loadList()]);
}