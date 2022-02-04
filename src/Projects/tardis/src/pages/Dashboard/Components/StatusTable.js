import React, { Fragment } from "react";
import "../Dashboard.scss";
import moment from 'moment'
import { getDates, checkDates,permissioncheck } from '../../../utils'
import { Images } from '../../../assets/images'
import { Pagination } from "../../../components"
import ReactTooltip from 'react-tooltip';
import { useHistory } from "react-router-dom";
import {useSelector } from 'react-redux';

const StatusTable = props => {
    const userdata = useSelector(state => state.user);
    const {permission} = userdata;
    const { filterData, startdate, endcount, sourceNames, currentSourceList } = props.dataSource;
    let dates = startdate ? getDates(moment(startdate), moment(startdate).add(endcount, 'days')) : [];
    const CheckGroup = (e) => {
        let result = currentSourceList && currentSourceList.filter((item) => { return item.source === e });
        if ( result && result.length > 0 && typeof result[0].type === "object") {
            return result[0].type.isgroup;
        }
        return false
    }
    let history = useHistory();
    const OnNavigate = (e, data) => {
        if(permissioncheck("sourcemap","view",permission))
        history.push({ pathname: "/tardis/source-details/" + e, state: data })
    }
    return (
        filterData.length > 0 ? <Fragment>
            <div className="table-container">
                <div className="leftheader">
                    <div className="space" ></div>
                    {sourceNames && sourceNames.map((e, i) => {
                        return <div className="headerleft" key={`leftheader-${i}`}>{e}</div>
                    })}
                </div>
                <section className="tablescroll">
                    <div className="table">
                        <div className="header">
                            {filterData.length > 0 && dates && dates.map((e, i) => {
                                return <div key={`header-${i}`} className="dataholder">
                                    <div className="date">{e}{(dates.length - 1) === i ? null : <div className="line" />}</div>
                                </div>
                            })}
                        </div>
                        <div className="container">
                            <div className="content">
                                {filterData && filterData.map((e, i) => {
                                    return <div key={`statusrow-${i}`} className={`statusrow ${e.length === 0 ? "emptyrow" : ""}`}>
                                        {dates && dates.map((f, j) => {
                                            let matchedrec = e.filter((r) => { return checkDates(f, r.logdate) })
                                            matchedrec = matchedrec.length > 0 ? matchedrec[0] : false;
                                            if (!matchedrec)
                                                return <div key={j} className={`emptycol`}><img src={Images.circledelay} /></div>
                                            let status = matchedrec.status.status;
                                            let sourcename = matchedrec.source.source;
                                            let lastUpdate = moment(matchedrec.lastUpdatedTs).format("YYYY-MM-DD HH:mm:ss");
                                            let comments = matchedrec.comments === "NA" ? "" : matchedrec.comments;
                                            return <div key={j} className={`status ${(e.length - 1) === j ? "" : "rightspace"}`}>
                                                <a data-tip data-for={`statusrec-${i}-${j}`} onClick={() => { OnNavigate(sourcename, matchedrec) }}>
                                                    <img src={status === "Complete" ? Images.circletick : status === "QA Failed" ? Images.circleclose : Images.circledelay} className={CheckGroup(sourcename) ? (status === "Complete" ? "complete" : status === "QA Failed" ? "failed" : "delay") : ""} />
                                                </a>
                                                <ReactTooltip id={`statusrec-${i}-${j}`} aria-haspopup='true' >
                                                    <p>Last Updated TS: <span>{lastUpdate}</span></p>
                                                    {comments && comments != null && comments !== "" ? <p>Comments: <span>{comments.substring(0, 255)}</span></p> : null}
                                                </ReactTooltip>
                                            </div>

                                        })}
                                    </div>
                                })}

                            </div>

                        </div>
                    </div>
                </section>
            </div>
            <Pagination dataSource={props.dataSource} total={true} LoadRecord={(data) => { props.LoadRecords(data) }} />
        </Fragment>
            : <div className="emptytable">No Data found!!</div>
    );
};


export default StatusTable;