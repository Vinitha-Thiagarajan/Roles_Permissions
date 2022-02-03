import { all, call, put, takeLatest } from 'redux-saga/effects';
import types from './types'
import moment from 'moment'
import { fetch, fetchDV } from '../../Projects/tardis-ui/src/utils'
import query from '../../Projects/tardis-ui/src/assets/constant/query'

export function* GetSourceList(source,logdate){
    let sourceArr = [];
    sourceArr.push(source.source.source)
    let response = yield call(fetch, query.DetailSource(JSON.stringify(sourceArr)));
    const data = yield response.data;
    let sourceList = data.data.sourceMap.results;
    if (sourceList.length > 0) {
        let sourceNames = sourceList.map((e, i) => { return e.childSource.source });
        let request = {
            sourceName: JSON.stringify(sourceNames),
            startLogdate: moment(logdate).format("YYYY-MM-DD"),
            endLogdate: moment(logdate).format("YYYY-MM-DD"),
            size:100
        }
        let responseDash = yield call(fetch, query.dashboardList(request));
        const dataDash = yield responseDash.data;
        return dataDash.data.dataAvailability.results;
    }
    return [];
}

export function* GetChild(data,logdate){

    let child = data;
    let sourceName = data.source.source;
    let request2 = {
        sourceName: JSON.stringify(sourceName),
        startLogdate: moment(logdate).format("YYYY-MM-DD"),
        endLogdate: moment(logdate).format("YYYY-MM-DD"),
        size:100
    }
    let responseMaintenance = yield call(fetch, query.Maintenance(request2));
    const dataMaintenance = yield responseMaintenance.data;
    let maintenanceList = dataMaintenance.data.maintenanceReasons.results;
    let trend =false;
    if(maintenanceList.length > 0) {
        trend =true;
    }
    child.trend= trend;
    let responseHistory = yield call(fetch, query.SourceHistory(JSON.stringify(sourceName)));
    const dataHistory = yield responseHistory.data;
    let historylist = dataHistory.data.dataHistory.results;
    child.historylist = historylist;
    let responseAudit = yield call(fetch, query.AuditLog(JSON.stringify(sourceName)));
    const dataAudit = yield responseAudit.data;
    let audit = dataAudit.data.auditLog.results;
    child.audit = audit;
    // let responseValidation = yield call(fetchDV, query.PipelineValidation(requestvalid));
    // const dataValidation = yield responseValidation.data;
    // let prevalidation = dataValidation.data.pipelineValidationsStore.preValidation;
    // let postvalidation = dataValidation.data.pipelineValidationsStore.postValidation;
    // child.prevalidation = prevalidation;
    // child.postvalidation = postvalidation;
    return child;
}

export function* GetSubChild(data,logdate){
    let childSourceList = yield* GetSourceList(data,logdate);
    if (childSourceList.length > 0) {
        let childlist= [];
        for(var x in childSourceList)
        {
            let child = yield* GetChild(childSourceList[x],logdate);
            if(childSourceList[x].source.type.isgroup)
            {
                let subchild = yield* GetSubChild(childSourceList[x],logdate);
                child.row=subchild;
            }
            childlist.push(child);
        }
        return childlist;
    }
    return [];
}

export function* fetchSourceList(action) {
    try {
        action = action.payroll;
        let result =[]; let logdate=action.logdate;
        let sourceArr = [];
        sourceArr.push(action.source.source)
        let childSourceList = yield* GetSourceList(action,logdate);
        if (childSourceList.length > 0) {
            let childlist= [];
            for(var x in childSourceList)
            {
                let child = childSourceList[x];
                if(child.source.type.isgroup)
                {
                    let subchild = yield* GetSubChild(child,logdate);
                    child.row=subchild;
                }
                child = yield* GetChild(child,logdate);
                childlist.push(child);
            }
            let GroupName = action.source.source;
            let requestMaintenance = {
                sourceName: JSON.stringify(GroupName),
                startLogdate: moment(logdate).format("YYYY-MM-DD"),
                endLogdate: moment(logdate).format("YYYY-MM-DD"),
                size:100
            }
            let responseMaintenance = yield call(fetch, query.Maintenance(requestMaintenance));
            const dataMaintenance = yield responseMaintenance.data;
            let GroupmaintenanceList = dataMaintenance.data.maintenanceReasons.results;
            let Grouptrend =false;
            if(GroupmaintenanceList.length > 0) {
                Grouptrend =true;
            }
            action.trend =Grouptrend;
            action.row=childlist
        }
        else{
            let GroupName = action.source.source;
            let requestMaintenance = {
                sourceName: JSON.stringify(GroupName),
                startLogdate: moment(logdate).format("YYYY-MM-DD"),
                endLogdate: moment(logdate).format("YYYY-MM-DD"),
                size:100
            }
            let responseMaintenance = yield call(fetch, query.Maintenance(requestMaintenance));
            const dataMaintenance = yield responseMaintenance.data;
            let GroupmaintenanceList = dataMaintenance.data.maintenanceReasons.results;
            let Grouptrend =false;
            if(GroupmaintenanceList.length > 0) {
                Grouptrend =true;
            }
            action.trend =Grouptrend;
            let responseHistory = yield call(fetch, query.SourceHistory(JSON.stringify(sourceArr)));
            const dataHistory = yield responseHistory.data;
            let historylist = dataHistory.data.dataHistory.results;
            action.historylist = historylist;
            let responseAudit = yield call(fetch, query.AuditLog(JSON.stringify(sourceArr)));
            const dataAudit = yield responseAudit.data;
            let audit = dataAudit.data.auditLog.results;
            action.audit = audit;
            let requestvalid = {
                source: action.source.source,
                runtime: moment(logdate).format("YYYY-MM-DD"),
            }
            let responseValidation = yield call(fetchDV, query.PipelineValidation(requestvalid));
            const dataValidation = yield responseValidation.data;
            let prevalidation = dataValidation.data.pipelineValidationsStore.preValidation;
            let postvalidation = dataValidation.data.pipelineValidationsStore.postValidation;
            action.prevalidation = prevalidation;
            action.postvalidation = postvalidation;
        }
        result.push(action);
        yield put({ type: types.DETAIL_PAGE_SUCCESS, payroll: result });
    }
    catch (error) {
        yield put({ type: types.DETAIL_PAGE_FAILURE });
    }
}



export function* loadList() {
    yield takeLatest(types.DETAIL_PAGE_REQUEST, fetchSourceList);
}

export default function* mainSaga() {
    yield all([loadList()]);
}