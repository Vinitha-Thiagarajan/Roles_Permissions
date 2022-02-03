import React, { useState, useEffect } from "react";
import "./style.scss";
import moment from "moment";
import { useOktaAuth } from "@okta/okta-react";
import Main from "../../layouts/Main";
import { useDispatch, useSelector } from "react-redux";
import Audit from "../../../resources/images/auditlogIcon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAmountUp, faSortAmountDown } from '@fortawesome/free-solid-svg-icons'
import { CardHeader, DropDown, Button, DropDownTitle, InputValue, FieldInput } from "../../../components/common";
import FilterIcon from "../../../resources/images/filter.svg";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { getAuditlog, getAuditlogRec, resetRecord } from "../../../../../../reducers/AuditLog/auditlog.actions";
import Snackbar from '@material-ui/core/Snackbar';
import { Alert, AlertTitle } from '@material-ui/lab';
import Copy from "../../../resources/images/copyjson.png";
function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}    
function GetReverseOrder(prop) {    
    return function(a, b) {    
        if (a[prop] < b[prop]) {    
            return 1;    
        } else if (a[prop] > b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}   
const Anamaly = () => {
    const { authState, oktaAuth } = useOktaAuth();
    const [filterlist, setfilterlist] = useState([]);
    const [update, setUpdate] = useState(false)
    const [recordlist, setrecordlist] = useState(false)
    const [selectedMetric, setSelectedMetric] = useState(null);
    const [formval, setFormval] = useState({});
    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch();
    const {
        filter, tables, loading, errors, records } = useSelector((state) => state.audit);
    useEffect(() => { }, [authState, oktaAuth]);

    useEffect(() => {
        dispatch(getAuditlog(authState?.accessToken))
    }, []);
    useEffect(() => {
        setrecordlist(records)
    }, [records]);
    const onTableChange = (item) => {
        setSelectedMetric(item);
        if (filter) {
            let val = filter.filter((e) => e.tableName == item);
            val = val.length > 0 ? val[0].columns : [];
            setfilterlist(val);
            setFormval({});
            document.getElementById("myForm").reset();
            setUpdate(!update);
            dispatch(resetRecord());
        }
    }
    const SortOrder = (sort, type) => {
        if(sort =="up"){
            if(type =="status"){
                let sortorder = recordlist.sort(GetSortOrder("mode"));
                setrecordlist(sortorder);
            }
            else if(type =="date"){
                let sortorder = recordlist.sort(GetSortOrder("timestamp"));
                setrecordlist(sortorder);
            }
            else if(type =="desc"){
                let sortorder = recordlist.sort(GetSortOrder("jsonRecord"));
                setrecordlist(sortorder);
            }
        }
        else{
            if(type =="status"){
                let sortorder = recordlist.sort(GetReverseOrder("mode"));
                setrecordlist(sortorder);
            }
            else if(type =="date"){
                let sortorder = recordlist.sort(GetReverseOrder("timestamp"));
                setrecordlist(sortorder);
            }
            else if(type =="desc"){
                let sortorder = recordlist.sort(GetReverseOrder("jsonRecord"));
                setrecordlist(sortorder);
            }
        }
        setUpdate(!update)
    }
    const onValueChange = (val, type) => {
        let formvalues = formval;
        formvalues[type] = val;
        setFormval(formvalues);
        setUpdate(!update)
    }
    const ShowLog = () => {
        dispatch(getAuditlogRec(
            selectedMetric,
            formval,
            authState?.accessToken
        ))
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        <Main>
            <div className="">
                <DropDownTitle
                    title="Delta Page"
                    value={selectedMetric}
                    data={tables}
                    selected={false}
                    onChangeData={(e) => {
                        onTableChange(e)
                    }}
                    placeholder="Please select"
                />
                <div className="section filter">
                    <div className="row">
                        <div className="col flitercontainer">
                            <div className="filtericon">
                                <img src={FilterIcon} alt="" />
                            </div>
                        </div>
                        <div className="filteralign">
                            <form id="myForm">
                                {filterlist.map((item, i) => {
                                    return (
                                        <div key={"filter" + i} className="col filter-text">
                                            <FieldInput title={item}
                                                value={formval[item]}
                                                onChangeValue={(e) => {
                                                    onValueChange(e, item)
                                                }}
                                                placeholder=""
                                            />
                                        </div>
                                    )
                                })}
                            </form>
                            {filterlist.length == 0 && <div className="col filter-text"></div>}

                            <div className="col filter-reset">
                                <Button
                                    title={"Show logs"}
                                    style={{ backgroundColor: "#F17F21" }}
                                    onClick={() => {
                                        ShowLog()
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {!errors && !loading && recordlist && recordlist.length ? (
                    <>
                        <div className="section">
                            <div className="row">
                                <div className="col">
                                    <CardHeader
                                        name={"Audit log"}
                                        iconColor={"#FBF5F5"}
                                        icon={Audit}
                                    />
                                    <div className="section-content">
                                        <table class="table table-audit">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="datecol"><div className="sortcontainer">STATUS <Sort onClick={(e) => { SortOrder(e, "status") }} /></div></th>
                                                    <th scope="col" style={{ width: 120 }}><div className="sortcontainer">DATE <Sort onClick={(e) => { SortOrder(e, "date") }} /></div></th>
                                                    <th scope="col"><div className="sortcontainer">DETAILED DESCRIPTION <Sort onClick={(e) => { SortOrder(e, "desc") }} /></div></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {recordlist.map((rec, index) => {
                                                    let oldcollection = JSON.parse(rec.oldValue);
                                                    let newcollection = JSON.parse(rec.newValue);
                                                    return (
                                                        rec.mode == "Create" ? <tr>
                                                            <td scope="row" className="daterow"><div className="statuscell"><div className="dot green"></div> Created</div></td>
                                                            <td>{moment(rec.timestamp).format("DD/MM/YYYY")}</td>
                                                            <td><div className="desccell">
                                                                <CopyToClipboard text={rec.jsonRecord}
                                                                    onCopy={() => { setOpen(true) }}>
                                                                    <div className="copydiv">
                                                                        <img src={Copy} />
                                                                        <div className="jsoncell" data-tooltip="Click To Copy">{rec.jsonRecord}</div>
                                                                    </div>
                                                                </CopyToClipboard>
                                                                <div></div>
                                                            </div></td>
                                                        </tr> : rec.mode == "Update" ?
                                                            <tr className="modified">
                                                                <td scope="row" className="daterow"><div className="statuscell"><div className="dot yellow"></div> Modified</div></td>
                                                                <td>{moment(rec.timestamp).format("DD/MM/YYYY")}</td>
                                                                <td><div className="desccell">
                                                                    <CopyToClipboard text={rec.jsonRecord}
                                                                        onCopy={() => { setOpen(true) }}>
                                                                        <div className="copydiv">
                                                                            <img src={Copy} />
                                                                            <div className="jsoncell" data-tooltip="Click To Copy">{rec.jsonRecord}</div>
                                                                        </div>
                                                                    </CopyToClipboard>
                                                                    <div className="holdercell">

                                                                        <div className="containercell" key={"row" + index}>
                                                                            {oldcollection && <InputValue title="OLD VALUE" values={oldcollection} color="#F17F21" /> || ""}
                                                                            {newcollection && <InputValue title="NEW VALUE" values={newcollection} color="#6B7BC7" /> || ""}
                                                                        </div>
                                                                    </div>
                                                                </div></td>
                                                            </tr>
                                                            :
                                                            <tr>
                                                                <td scope="row" className="daterow"><div className="statuscell"><div className="dot red"></div> Deleted</div></td>
                                                                <td>{moment(rec.timestamp).format("DD/MM/YYYY")}</td>
                                                                <td><div className="desccell">
                                                                    <CopyToClipboard text={rec.jsonRecord}
                                                                        onCopy={() => { setOpen(true) }}>
                                                                        <div className="copydiv">
                                                                            <img src={Copy} />
                                                                            <div className="jsoncell" data-tooltip="Click To Copy">{rec.jsonRecord}</div>
                                                                        </div>
                                                                    </CopyToClipboard>

                                                                    <div></div>
                                                                </div></td>
                                                            </tr>

                                                    )
                                                })}

                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : <div></div>}
                {!errors && !loading &&  recordlist && !recordlist.length && selectedMetric != null ? (
                    <p className={"error"}>No Data Found!</p>
                ) : ""}
                {loading && <div className="loader">Loading...</div>}
                {!loading && errors && <p className={"error"}>{errors}</p>}
            </div>
            <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity="info">
                    Json Copied!!
                </Alert>
            </Snackbar>
        </Main>
    );
};
const Sort = (props) => {
    const [sort, setSort] = useState("up")
    return (
        <div className="sort">
            {sort == "up"?<div onClick={() => { setSort("down");props.onClick("up"); }}> <FontAwesomeIcon icon={faSortAmountUp} /></div>:
            <div onClick={() => { props.onClick("down");setSort("up") }}> <FontAwesomeIcon icon={faSortAmountDown} /></div>}
        </div>
    )
}

export default Anamaly;
