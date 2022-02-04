import React, { Fragment, useEffect, useState } from "react";
import "../Table.scss";
import "./Row.scss";
import { Images } from "../../../assets/images";
import { showHide, permissioncheck } from '../../../utils'
import moment from 'moment'
import SVG from 'react-inlinesvg';
import { useHistory } from "react-router-dom";
import Tabs from "../../Tabs"
import { useSelector } from "react-redux";
import { json } from "d3-fetch";

const FileRow = props => {
    const [modal, setModal] = useState(false)
    const userdata = useSelector(state => state.user);
    const { permission } = userdata;
    const data = props.dataSource.data;
    const [rowselection, setRowselection] = useState([]);
    const [tablabel, settablabel] =useState("History")

    const [update, setupdate] = useState(false);
    const showModal = (rec) => {
        document.getElementById("exportmodal").style.display = "block";

        document.getElementById("recname").innerText = rec.expectation_config.expectation_type;
        document.getElementById("recsuccess").className = rec.success ? "validationTable__results--success" : "validationTable__results--fail";
        document.getElementById("recsuccess").innerText = rec.success ? "Success" : " Failed";
        document.getElementById("recobserved").innerText = JSON.stringify(rec);
    }
    const hideModal = () => {
        document.getElementById("exportmodal").style.display = "none";
    }
    const showHideRow = (data) => {
        //showHide(data, "file");
        let sources = rowselection;
        if (sources.indexOf(data.id) > -1) {
            sources = sources.filter((e) => e != data.id);
        }
        else {
            sources.push(data.id)
        }
        setRowselection(sources);
        setupdate(!update)
    };
    const showSubHideRow = (data) => {
        //showHide(data, "file", "sub");
        let sources = rowselection;
        if (sources.indexOf(data.id) > -1) {
            sources = sources.filter((e) => e != data.id);
        }
        else {
            sources.push(data.id)
        }
        setRowselection(sources);
        setupdate(!update)
    }
    const showValidHideRow = (data) => {
        //showHide(data, "file", "vaild");
        let sources = rowselection;
        if (sources.indexOf(data) > -1) {
            sources = sources.filter((e) => e != data);
        }
        else {
            sources.push(data)
        }
        setRowselection(sources);
        setupdate(!update)
    }
    useEffect(() => {
        let logdate = data && data.length > 0 ? moment(data[0].logdate).format("MM/DD/YYYY") : "";
        document.getElementById("SOURCEDATE").innerHTML = "Logdate(" + logdate + ")";
    }, [])

    let history = useHistory();
    const onBackHandler = (e, selected) => {
        history.push({ pathname: "/tardis/trend-source-chart/" + e, state: { selected: selected, parent: data[0] } });
    };
    const RowSet = (props) => {
        return (
            <Fragment>
                <Row {...props.item} margin={props.margin} />
                <RowDetails {...props.item} margin={props.margin} />
            </Fragment>
        )
    }
    const Row = props => {
        return (
            <tr>
                <td className={props.margin ? "rowsubarrow" : "rowarrow"} onClick={() => {
                    showHideRow(props);
                }}>
                    <img alt=""
                        src={Images.downarrow}
                        className={rowselection.indexOf(props.id) > -1  ? "uparr" : "downarr"}
                        id={`downimage${props.id}`}
                    />
                </td>
                <td className="width200">{props.source.source}</td>
                <td className="textAlign">{props.status && props.status.status}</td>
                <td className="textAlign">{props.lastUpdatedTs && moment(props.lastUpdatedTs).format("MM-DD-YYYY hh:mm:ss a")}</td>
                <td className="textAlign detailstext"> {props.comments && props.comments}</td>
                <td><div className="cellholder">{props.trend && <div className={`trendbtn ${props.trend ? "" : "disable"}`} onClick={() => props.trend ? onBackHandler(props.source.source, props) : null}>Trend</div>}</div></td>
            </tr>
        );
    };
    const ValidationRow = props => {
        return (
            <tr className="validationRow__row">
                <td className={props.margin ? "rowsubarrow" : "rowarrow"} onClick={() => { showValidHideRow(props.id) }}>
                    <img alt=""
                        src={Images.downarrow}
                        className={rowselection.indexOf(props.id) > -1  ? "uparr" : "downarr"}
                        id={`downimage${props.id}`}
                    />
                </td>
                <td className="width200 validationRow__cell--caps">{`${props.type} Validaton Results`}</td>
                <td className="textAlign">
                    <div className="validationRow__cell">
                        Evaluated expectations:
                        <div className="validationRow__cellLabel--grey commonPercent">{props.statistics.evaluated_expectations}</div>
                    </div>
                </td>
                <td className="textAlign">
                    <div className="validationRow__cell">
                        Successful expectations:
                        <div className="validationRow__cellLabel--green commonPercent">{props.statistics.successful_expectations}</div>
                    </div>
                </td>
                <td className="textAlign">
                    <div className="validationRow__cell">
                        Unsuccessful expectations:
                        <div className="validationRow__cellLabel--red commonPercent">{props.statistics.unsuccessful_expectations}</div>
                    </div>
                </td>
                <td className="textAlign">
                    <div className="validationRow__cell">
                        Success Percentage:
                        <div className="validationRow__cellLabel--green commonPercent validationRow__cellLabel--percent">{props.statistics.success_percent ? parseFloat(props.statistics.success_percent).toFixed(2):"0"}%</div>
                    </div>
                </td>
            </tr>
        )
    }
    const ValidationRowDetails = (props) => {
        return (
            <div className={rowselection.indexOf(props.id) > -1  ? "validationTable" : "hidden_row validationTable"} id={props.id}>
                <div className="validationTable__headers">
                    <div className="validationTable__headerExpectation">Expectation Name</div>
                    <div className="validationTable__headerResults">Column Name</div>
                    <div className="validationTable__headerResults">Status</div>
                    <div className="validationTable__headerArguments">Results</div>
                </div>
                {props.value.map((item, index) => {
                    return (
                        <div key={`valid-${index}`} className="validationTable__row">
                            <div className="validationTable__expectation"><b>{item.expectation_config.expectation_type}</b></div>
                            <div className="validationTable__results" style={{border: "1px solid #E6EAF0"}}>
                                {item.expectation_config.kwargs && item.expectation_config.kwargs.column ? item.expectation_config.kwargs.column : "NA"}
                            </div>
                            <div className="validationTable__results">
                                <div className={item.success ? "validationTable__results--success" : "validationTable__results--fail"}>
                                    {item.success ? "Success" : "Failed"}
                                </div>
                            </div>
                            <div className="validationTable__arguments">
                                <div className="validationTable__arguments--button" onClick={() => showModal(item)}>Explore</div>
                            </div>
                        </div>
                    )
                })}

            </div>
        )
    }
    const ValidationModal = (props) => {
        return (
            <div className="validationModal">
                <div className="validationModal__modal">
                    <div className="validationModal__header">
                        <div className="validationModal__iconBg">
                            <img src={Images.list} alt="title icon" />
                        </div>
                        <h2 className="validationModal__title">Arguments</h2>
                        <img className="validationModal__close" src={Images.close} alt="close modal" onClick={() => hideModal()} />
                    </div>
                    <div className="validationModal__info">
                        <div id="recname" className="validationModal__expectation"></div>
                        <div id="recsuccess">
                        </div>
                    </div>
                    <div className="validationModal__description">
                        <div className="validationModal__expectation" id="recobserved">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    const RowDetails = props => {
        return (
            <tr id={`hidden_row${props.id}`} className={rowselection.indexOf(props.id) > -1  ? "editcontent" : "hidden_row editcontent"} >
                <td colSpan="6" className="paddzero">
                    <form id={`formfile-${props.id}`} autoComplete="off">
                        <table className={props.margin ? "detailsubtable" : "detailtable"}>
                            <tbody>
                                <tr>
                                    <td colSpan="6" style={{ padding: 0 }}>
                                        <table width="100%" height={props.margin ? "60px" : "80px"} >
                                            <tbody>
                                                {props.row ? props.row.map((e, i) => {
                                                    if (e.row && e.row.length > 0) {
                                                        return <RowSet key={`SubDetails-${e.id}-${i}`} item={e} margin={true} />
                                                    }
                                                    else {
                                                        return (
                                                            <Fragment key={i}>
                                                                <tr>
                                                                    <td className="checkboxtd" onClick={() => showSubHideRow(e)}>
                                                                        <SVG
                                                                            src={Images.dropdownarrow}
                                                                            className={rowselection.indexOf(e.id) > -1  ? "uparr" : "downarr"}
                                                                            id={`sub_downimage${e.id}`}
                                                                        />
                                                                    </td>
                                                                    <td className="width200">{e.source.source}</td>
                                                                    <td className="textAlign">{e.status.status}</td>
                                                                    <td className="textAlign">{moment(e.lastUpdatedTs).format("MM-DD-YYYY hh:mm:ss a")}</td>
                                                                    <td className="textAlign detailstext">{e.comments}</td>
                                                                    <td><div className="cellholder"><div className={`trendbtn ${e.trend ? "" : "disable"}`} onClick={() => e.trend ? onBackHandler(e.source.source, e) : null}>Trend</div></div></td>
                                                                </tr>
                                                                <tr id={`sub_hidden_row${e.id}`} className={rowselection.indexOf(e.id) > -1  ? "editcontent" : "hidden_row editcontent"}>
                                                                    <td colSpan="6">
                                                                        <Tabs className="detailtab" TabSelection={(e)=>{settablabel(e)}} label={tablabel}>
                                                                            <div label="History">
                                                                                {e.historylist && e.historylist.length > 0 ? e.historylist.map((item, i) => {
                                                                                    return (
                                                                                        <div className="detailcontainerwithpadd" key={`history-${i}`}>
                                                                                            <span className="textAlign">{item.source.source}</span>
                                                                                            <span className="textAlign">{item.status.status}</span>
                                                                                            <span className="textAlign">{moment(item.lastUpdatedTs).format("MM-DD-YYYY hh:mm:ss a")}</span>
                                                                                            <span className="textAlign detailstext">{item.comments}</span>
                                                                                        </div>
                                                                                    )
                                                                                }) : <div className="detailcontainerwithpadd">
                                                                                    <span>No History found!!</span>
                                                                                </div>}
                                                                            </div>
                                                                            {permissioncheck("auditlog", "view", permission) ? <div label="Audit" >
                                                                                {e.audit && e.audit.length > 0 ? e.audit.map((item, i) => {
                                                                                    return (
                                                                                        <div className="detailcontainerwithpadd" key={`audit-${i}`}>
                                                                                            <span className="textAlign">{item.status}</span>
                                                                                            <span className="textAlign">{item.additionalInfo}</span>
                                                                                            <span className="textAlign">{item.numRecords}</span>
                                                                                            <span className="textAlign">{item.fileSizeMb}</span>
                                                                                            <span className="textAlign">{moment(item.logdate).format("MM-DD-YYYY hh:mm:ss a")}</span>
                                                                                        </div>
                                                                                    )
                                                                                }) : <div className="detailcontainerwithpadd">
                                                                                    <span>No Audit found!!</span>
                                                                                </div>}
                                                                            </div> : null}

                                                                            <div label="Validation">
                                                                                {(e.prevalidation && e.prevalidation != null || e.postvalidation && e.postvalidation != null) ? <>
                                                                                    {e.prevalidation && e.prevalidation != null && <><ValidationRow id={`pre-${e.source.source}`} statistics={e.postvalidation[0].value.statistics} type="PRE" />
                                                                                        <ValidationRowDetails id={`pre-${e.source.source}`} value={
                                                                                            e.prevalidation[0].value.results
                                                                                        } /></> || ""}
                                                                                    {e.postvalidation && e.postvalidation != null && <><ValidationRow id={`post-${e.source.source}`} statistics={e.postvalidation[0].value.statistics} type="POST" />
                                                                                        <ValidationRowDetails id={`post-${e.source.source}`} value={
                                                                                            e.postvalidation[0].value.results
                                                                                        } /></> || ""}
                                                                                </> :
                                                                                    <div className="detailcontainerwithpadd">
                                                                                        <span>No Validation found!!</span>
                                                                                    </div>}
                                                                                <div id="exportmodal"> <ValidationModal /></div>
                                                                            </div>
                                                                        </Tabs>
                                                                    </td>
                                                                </tr>
                                                            </Fragment>)
                                                    }
                                                }) :
                                                    <tr>
                                                        <td colSpan="6">
                                                            <Tabs className="detailtab" TabSelection={(e)=>{settablabel(e)}} label={tablabel}>
                                                                <div label="History">
                                                                    {props.historylist && props.historylist.length > 0 ? props.historylist.map((item, i) => {
                                                                        return (
                                                                            <div className="detailcontainerwithpadd" key={`history-${i}`}>
                                                                                <span className="textAlign">{item.source.source}</span>
                                                                                <span className="textAlign">{item.status.status}</span>
                                                                                <span className="textAlign">{moment(item.logdate).format("MM-DD-YYYY hh:mm:ss a")}</span>
                                                                                <span><input type="text" name={`comments-${props.id}`} id={`comments-${props.id}`} placeholder="No Issue to the module" value={item.comments} /></span>
                                                                            </div>
                                                                        )
                                                                    }) : <div className="detailcontainerwithpadd">
                                                                        <span>No History found!!</span>
                                                                    </div>}
                                                                </div>
                                                                {permissioncheck("auditlog", "view", permission) ? <div label="Audit" >
                                                                    {props.audit && props.audit.length > 0 ? props.audit.map((item, i) => {
                                                                        return (
                                                                            <div className="detailcontainerwithpadd" key={`audit-${i}`}>
                                                                                <span className="textAlign">{item.status}</span>
                                                                                <span className="textAlign">{item.additionalInfo}</span>
                                                                                <span className="textAlign">{item.numRecords}</span>
                                                                                <span className="textAlign">{item.fileSizeMb}</span>
                                                                                <span className="textAlign">{moment(item.logdate).format("MM-DD-YYYY hh:mm:ss a")}</span>
                                                                            </div>
                                                                        )
                                                                    }) : <div className="detailcontainerwithpadd">
                                                                        <span>No Audit found!!</span>
                                                                    </div>}
                                                                </div> : null}
                                                                <div label="Validation">
                                                                    {(props.prevalidation && props.prevalidation != null && props.prevalidation.length > 0  || props.postvalidation && props.postvalidation != null && props.postvalidation.length > 0) ? <>
                                                                        {props.prevalidation && props.prevalidation != null && props.prevalidation.length > 0 &&  <><ValidationRow id={`pre-${props.source.source}`} statistics={props.prevalidation[0].value.statistics} type="PRE" />
                                                                            <ValidationRowDetails id={`pre-${props.source.source}`} value={
                                                                                props.prevalidation[0].value.results
                                                                            } /></> || ""}
                                                                        {props.postvalidation && props.postvalidation != null  && props.postvalidation.length > 0 && <><ValidationRow id={`post-${props.source.source}`} statistics={props.postvalidation[0].value.statistics} type="POST" />
                                                                            <ValidationRowDetails id={`post-${props.source.source}`} value={
                                                                                props.postvalidation[0].value.results
                                                                            } /></> || ""}
                                                                    </> :
                                                                        <div className="detailcontainerwithpadd">
                                                                            <span>No Validation found!!</span>
                                                                        </div>}
                                                                    <div id="exportmodal"> <ValidationModal /></div>
                                                                </div>
                                                            </Tabs>
                                                        </td>
                                                    </tr>}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </td>
            </tr>
        );
    };
    return (
        <tbody>
            {data && data.length > 0 ?
                data.map((item, index) => {
                    return (

                        <RowSet key={`Details-${index}`} item={item} margin={false} />

                    );
                }) :
                <tr><td colSpan="6" className="norecord">No Data found!!</td></tr>
            }
        </tbody>
    );
};



export default FileRow;
