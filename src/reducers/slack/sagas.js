import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { fetch , paginationFilter} from '../../Projects/tardis-ui/src/utils'
import query from '../../Projects/tardis-ui/src/assets/constant/query'
import types from './types'

const getslack = state => state.slack;

export function* fetchList() {
    let response;
    try {
        let hasrow = false, size = 1000, data={};
        do {
            response = yield call(fetch, query.slack({size}));
            data = yield response.data;
            size += 1000;
            hasrow = data.data.slackSubscription.hasNextPage;
            if (hasrow)
                size = data.data.slackSubscription.totalElements;
            }
        while (hasrow)
        yield put({ type: types.SLACK_LIST_SUCCESS, payroll: data });
        let slackList = data.data.slackSubscription.results;
        const slack = yield select(getslack);
        if(slackList.length > 0){
            let result = paginationFilter(slack)
            result.page = 1;
            result.filter={};
            yield put({ type: types.FILTER_SLACK_PAGINATION, payroll: result });
        }

    }
    catch (error) {
        yield put({ type: types.SLACK_LIST_FAILURE });
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
        yield put({ type: types.SOURCE_SLACK_LIST_SUCCESS, payroll: data });
        let responsealert = yield call(fetch, query.slackalert());
        const dataalert = yield responsealert.data;
        yield put({ type: types.ALERT_SLACK_LIST_SUCCESS, payroll: dataalert });
    }
    catch (error) {

    }
}


export function* loadList() {
    yield takeLatest(types.SLACK_LIST_REQUEST, fetchList);
    yield takeLatest(types.FILTER_SLACK_LIST_REQUEST, fetchFilter);
}

export default function* mainSaga() {
    yield all([loadList()]);
}