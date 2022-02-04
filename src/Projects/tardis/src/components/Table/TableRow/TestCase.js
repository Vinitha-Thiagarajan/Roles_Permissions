import React, { Fragment, useEffect, useState, useRef } from "react";
import "../Table.scss";
import "./Row.scss";
import { Images } from "../../../assets/images";
import { showHide, permissioncheck } from '../../../utils'
import ReactTooltip from 'react-tooltip';
import Switch from "react-switch";
import useOnClickOutside from "../../DropDown/OutClickhandler";
import { useDispatch, useSelector } from 'react-redux';
import { ExpectationRecords, SourceHistory, AddSourceHistory } from '../../../../../../reducers/testcase/actions'
import {
    TextBox,
    NumberInput,
    Checkbox,
    Radio,
    Dropdown,
    DateRange,
    MinMax
} from "../../Templates";
import { fetchDV, fetchDVCreate } from '../../../utils'
import query from '../../../assets/constant/query'
import { dispatch } from "d3-dispatch";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const FileRow = props => {
    const userdata = useSelector(state => state.user);
    const testcase = useSelector(state => state.testcase);
    const { permission } = userdata;
    const data = props.dataSource.data;
    const dispatch = useDispatch();
    const [eoption, seteoption] = useState(false)
    const [fetchData, setfetchData] = useState(false);
    const [rowselection, setRowselection] = useState([]);

    const [update, setupdate] = useState(false);

    const showHideRow = (data) => {
        let sources = rowselection;
        if (sources.indexOf(data.sourceName) > -1) {
            sources = sources.filter((e) => e != data.sourceName);
        }
        else {
            sources.push(data.sourceName)
        }
        setRowselection(sources);
        setupdate(!update)
    };
    useEffect(() => {
        let filterrecords = testcase?.pipelinehistory ? testcase?.pipelinehistory : [];
        if (testcase && testcase.searchfilter)
            filterrecords = filterrecords.filter((e) => e.sourceName == testcase.searchfilter);

        if (filterrecords.length == 1) {
            let sources = [];
            sources.push(filterrecords[0].sourceName)
            setRowselection(sources);
        }
        else {
            setRowselection([]);
        }
        if (testcase && testcase.searchfilter == "") {
            setfetchData(false);
        }
        else {
            setfetchData(filterrecords);
        }
        setupdate(!update)
    }, [testcase.searchfilter, testcase.deleteList])


    useEffect(() => {
        let records = testcase?.pipelinehistory;
        if (testcase && testcase.searchfilter && records) {
            records = records.filter((e) => e.sourceName == testcase.searchfilter);
        }
        else {
            records = [];
        }
        setfetchData(records);
        setupdate(!update)
    }, [testcase?.pipelinehistory])

    useEffect(() => {
        dispatch(SourceHistory())
        dispatch(ExpectationRecords());

    }, [])
    useEffect(() => {
        if (testcase?.expectdata) {
            let res = testcase?.expectdata.map((e) => { return { label: e.expectationName, value: e.expectationId } });
            seteoption(res);
        }
    }, [testcase?.expectdata])
    const RowSet = (props) => {
        return (
            <Fragment>
                <Row item={props.item} addstatus={props.addstatus} margin={props.margin} />
                <RowDetails item={props.item} addstatus={props.addstatus} margin={props.margin} />
            </Fragment>
        )
    }

    const Row = props => {
        return (
            <>
                <tr style={{ boxShadow: "0px 1px 7px #f5f3f3 !important" }}><td className={props.margin ? "rowsubarrow" : "rowarrow"} onClick={() => {
                    showHideRow(props.item[0]);
                }}>
                    <img alt=""
                        src={Images.downarrow}
                        className={rowselection.indexOf(props.item[0].sourceName) > -1 ? "uparrd" : "downarrd"}
                        id={`downimage${props.item[0].id}`}
                    />
                </td><td colSpan={6}>{props.item[0].sourceName}{props.item[0].id != "add" && <span style={{ paddingLeft: 5 }}>({props.item.length} Configurations )</span> || ""}</td></tr>
                {/* <tr>
                <td className={props.margin ? "rowsubarrow" : "rowarrow"} onClick={() => {
                    showHideRow(props.item[0]);
                }}>
                    <img alt=""
                        src={Images.downarrow}
                        className={rowselection.indexOf(props.item[0].sourceName) > -1  ? "uparrd" : "downarrd"}
                        id={`downimage${props.item[0].id}`}
                    />
                </td>
                <td className="sourcenametd" data-tip data-for={`sourcenametd-${props.item[0].id}`} style={{ width: "17%" }}>Source Name</td>
                <td style={{ width: "18%" }}>Validation Type</td>
                <td style={{ width: "18%" }}>Expectation</td>
                <td style={{ width: "25%" }} className="sourcevaluetd textAlign">Value</td>
                <td style={{ width: "8%" }} className="textAlign">Active</td>
                <td style={{ width: "12%" }} className="textAlign">Actions</td>
                <ReactTooltip id={`sourcenametd-${props.item[0].id}`} aria-haspopup='true' >
                    <span>{props.item[0].sourceName}</span>
                </ReactTooltip>
            </tr> */}
            </>
        );
    };

    const RowDetails = props => {
        const [addsource, setAddSource] = useState(false)
        const AddConfiguration = () => {
            if (addsource) {
                toast.warn("Unsaved configuration already exist, please submit before add the new config")
                return false;
            }
            const element = document.getElementById(`formtest-add`)
            if (element) {
                toast.warn("Unsaved configuration already exist, please submit before add the new config")
                return false;
            }
            let datacheck = testcase.pipelinehistory.findIndex((e) => e.sourceName == props.item[0].sourceName);
            if (datacheck > -1) {
                let dataindex = testcase.pipelinehistory[datacheck].add;
                if (dataindex) {
                    if (window.confirm("Existing unsaved change will be discard, do you want to continue?")) {

                    }
                }
                else {
                    setAddSource(true)
                }
            }
            else {
                setAddSource(true)
            }
        }
        return (
            <tr id={`hidden_row${props.item[0].id}`} className={rowselection.indexOf(props.item[0].sourceName) > -1 ? "editcontent" : "hidden_row editcontent"}>
                <td colSpan="7" className="paddzero">
                    <form id={`formfile-${props.item[0].id}`} autoComplete="off">
                        <table className={props.margin ? "detailsubtable" : "detailtable"}>
                            <thead>
                                <tr>
                                    <td></td>
                                    <td className="sourcenametd" data-tip data-for={`sourcenametd-${props.item[0].id}`} style={{ width: "17%" }}>Source Name</td>
                                    <td style={{ width: "18%" }}>Validation Type</td>
                                    <td style={{ width: "18%" }}>Expectation</td>
                                    <td style={{ width: "25%" }} className="sourcevaluetd textAlign">Value</td>
                                    <td style={{ width: "8%" }} className="textAlign">Active</td>
                                    <td style={{ width: "12%" }} className="textAlign">Actions</td>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="7" style={{ padding: 0 }}>
                                        <div className="testcasecontainer">
                                            {props.item.map((rec, ind) => {
                                                return (
                                                    <SourceRow expectList={testcase?.expectdata} eoption={eoption} key={"source" + ind} {...rec} />
                                                )
                                            })}
                                            {addsource && <AddSourceRow expectList={testcase?.expectdata} eoption={eoption}  {...{ id: "add", status: false, validationType: "", expectation: { expectationId: "", expectationName: "" }, expectationValue: "", sourceName: props.item[0].sourceName }} />}
                                        </div>
                                        <div className="testbtnholder" >
                                            <div className="testaddbtn" onClick={() => { AddConfiguration() }}>
                                                <img src={Images.testAdd} />
                                                <span>Add Config</span>
                                            </div>
                                        </div>
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
            {fetchData && fetchData.length > 0 ?
                fetchData.map((item, index) => {
                    return (
                        <RowSet key={`Testcase-${index}`} addstatus={item.add} item={item.pipelineExpectations} margin={false} />
                    );
                }) : testcase.isLoading ? <tr><td colSpan="6" className="norecord">Loading...</td></tr> :
                    (testcase && testcase.pipelinehistory && testcase.pipelinehistory.length == 0) ? <tr><td colSpan="6" className="norecord">No Data found!!</td></tr> : testcase && testcase.searchfilter ? <tr><td colSpan="6" className="norecord">No Data found!!</td></tr> : <tr><td colSpan="6" className="norecord">No source is selected!!!</td></tr>
            }
            <ToastContainer
                position="top-right" role="warning"></ToastContainer>
        </tbody>
    );
};



export default FileRow;
const options = [
    { label: 'Post Validation', value: "postvalidation" }, { label: 'Pre Validation', value: "prevalidation" }
];
const SourceRow = (props) => {
    const [exception, setException] = useState(true)
    const [validation, setValidation] = useState(false)
    const [evalue, setevalue] = useState("");
    const [etext, setetext] = useState("");

    const [isedit, setIsedit] = useState(props.id == "add" ? true : false);

    const dispatch = useDispatch();
    useEffect(() => {
        setevalue(props.expectation.expectationId)
        setetext(props.expectation.expectationName)
    }, [])
    const generateInputs = (data, existdata, isedit) => {
        if (data) {
            const inputType = (d) => {
                let dvalue = "";
                if (data.expectationId == props.expectation.expectationId) {
                    dvalue = existdata[d.name];
                }
                d.isedit = isedit;
                d.id = props.id;
                const mapping = {
                    string: <TextBox data={d} dvalue={dvalue} />,
                    int: <NumberInput data={d} dvalue={dvalue} />,
                    checkbox: <Checkbox data={d} />,
                    boolean: <Radio data={d} dvalue={dvalue} />,
                    list: <Dropdown data={d} />,
                    dateRange: <DateRange range={true} data={d} />,
                    date: <DateRange range={false} data={d} />,
                    minmax: <MinMax data={d} />,
                }
                return mapping[d.type]
            }
            return data.attributes.map((input) => inputType(input.column_name))
        }
    }
    const onSubmit = () => {
        const element = document.getElementById(`formtest-${props.id}`)
        const formData = new FormData(element);
        let formProps = Object.fromEntries(formData);
        let status = false;
        let validationType = "";
        let expectationId = "";
        let expectationValue = "";

        if (formProps[`active-${props.id}`]) {
            status = formProps[`active-${props.id}`] == "on" ? true : false;
            delete formProps[`active-${props.id}`];
        }

        if (formProps[`vaildation-${props.id}`]) {
            validationType = formProps[`vaildation-${props.id}`];
            delete formProps[`vaildation-${props.id}`];

        }
        else {
            toast.warn("Please fill all the fields to save")
            return false;
        }
        if (formProps[`expection-${props.id}`]) {
            expectationId = formProps[`expection-${props.id}`];
            delete formProps[`expection-${props.id}`];
        }
        else {
            toast.warn("Please fill all the fields to save");
            return false;
        }
        let currAttr = props.expectList.filter((e) => e.expectationId == expectationId)[0].attributes;
        for (var x of currAttr) {
            if (x.column_name.required && formProps[x.column_name.name].trim() == "") {
                toast.warn("Please fill all the fields to save");
                return false;
            }
        }
        for (var x of Object.keys(formProps)) {
            if (formProps[x].trim() == "") {
                delete formProps[x]
            }
        }
        expectationValue = JSON.stringify(formProps);
        expectationValue = expectationValue.replace(/"/g, '\\"');
        let data = {
            sourceName: props.sourceName,
            validationType: validationType,
            expectationId: expectationId,
            status: status,
            expectationValue: expectationValue
        }
        if (props.id == "add") {
            let resdata = query.PipelineSourceClassification(data.sourceName);
            fetchDV(resdata).then((res) => {
                if (res.status == 200) {
                    if (res.data.errors) {
                        let newdata = {
                            sourceName: data.sourceName,
                            sourceType: "internal",
                            cron: ""
                        }
                        let resdata = query.CreateSourceClassification(newdata);
                        fetchDV(resdata).then((res) => {
                            if (res.status == 200) {
                                if (res.data.errors) {

                                }
                                else {
                                    data.sourceId = res.data.data.pipelineSourceClassification.sourceId
                                    let requestdata = query.CreatePipelineHistory(data);
                                    fetchDV(requestdata).then((res) => {
                                        if (res.status == 200) {
                                            if (res.data.errors) {
                                                toast.warn(res.data.errors[0].message);
                                                return false;
                                            }
                                            dispatch(SourceHistory());
                                        }
                                        else {
                                            toast.warn("Failed!!!");
                                        }
                                    }).catch((err) => {
                                        console.log(err)
                                    })
                                }
                            }
                            else {

                            }
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                    else {
                        data.sourceId = res.data.data.pipelineSourceClassification.sourceId
                        let requestdata = query.CreatePipelineHistory(data);
                        fetchDV(requestdata).then((res) => {
                            if (res.status == 200) {
                                if (res.data.errors) {
                                    toast.warn(res.data.errors[0].message);
                                    return false;
                                }
                                dispatch(SourceHistory());
                            }
                            else {
                                toast.warn("Failed!!!");
                            }
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                }
                else {
                    let newdata = {
                        sourceName: data.sourceName,
                        sourceType: "internal",
                        cron: ""
                    }
                    let resdata = query.CreateSourceClassification(newdata);
                    fetchDV(resdata).then((res) => {
                        if (res.status == 200) {
                            if (res.data.errors) {

                            }
                            else {
                                data.sourceId = res.data.data.pipelineSourceClassification.sourceId
                                let requestdata = query.CreatePipelineHistory(data);
                                fetchDV(requestdata).then((res) => {
                                    if (res.status == 200) {
                                        if (res.data.errors) {
                                            toast.warn(res.data.errors[0].message);
                                            return false;
                                        }
                                        dispatch(SourceHistory());
                                    }
                                    else {
                                        toast.warn("Failed!!!");
                                    }
                                }).catch((err) => {
                                    console.log(err)
                                })
                            }
                        }
                        else {

                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        }
        else {
            let resdata = query.PipelineSourceClassification(data.sourceName);
            fetchDV(resdata).then((res) => {
                if (res.status == 200) {
                    if (res.data.errors) {
                        let newdata = {
                            sourceName: data.sourceName,
                            sourceType: "internal",
                            cron: ""
                        }
                        let resdata = query.CreateSourceClassification(newdata);
                        fetchDV(resdata).then((res) => {
                            if (res.status == 200) {
                                if (res.data.errors) {

                                }
                                else {
                                    data.sourceId = res.data.data.pipelineSourceClassification.sourceId
                                    data["id"] = props.id;
                                    fetchDV(query.UpdatePipelineHistory(data)).then((res) => {
                                        if (res.status == 200) {
                                            if (res.data.errors) {
                                                toast.warn(res.data.errors[0].message);
                                                return false;
                                            }
                                            dispatch(SourceHistory());
                                        }
                                        else {
                                            toast.warn("Failed!!!");
                                        }
                                    }).catch((err) => {
                                        console.log(err)
                                    })
                                }
                            }
                            else {

                            }
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                    else {
                        data.sourceId = res.data.data.pipelineSourceClassification.sourceId
                        data["id"] = props.id;
                        fetchDV(query.UpdatePipelineHistory(data)).then((res) => {
                            if (res.status == 200) {
                                if (res.data.errors) {
                                    toast.warn(res.data.errors[0].message);
                                    return false;
                                }
                                dispatch(SourceHistory());
                            }
                            else {
                                toast.warn("Failed!!!");
                            }
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                }
                else {
                    let newdata = {
                        sourceName: data.sourceName,
                        sourceType: "internal",
                        cron: ""
                    }
                    let resdata = query.CreateSourceClassification(newdata);
                    fetchDV(resdata).then((res) => {
                        if (res.status == 200) {
                            if (res.data.errors) {

                            }
                            else {
                                data.sourceId = res.data.data.pipelineSourceClassification.sourceId
                                data["id"] = props.id;
                                fetchDV(query.UpdatePipelineHistory(data)).then((res) => {
                                    if (res.status == 200) {
                                        if (res.data.errors) {
                                            toast.warn(res.data.errors[0].message);
                                            return false;
                                        }
                                        dispatch(SourceHistory());
                                    }
                                    else {
                                        toast.warn("Failed!!!");
                                    }
                                }).catch((err) => {
                                    console.log(err)
                                })
                            }
                        }
                        else {

                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
            
        }
    }
    return (
        <form id={`formtest-${props.id}`} autoComplete="off">
            <div className="testcasesource" data-tip data-for={`sourcenamerow-${props.id}`}><input
                type="text"
                name={`source-${props.id}`}
                value={props.sourceName}
                disabled={true}
            /></div>
            <div style={{ width: "18%" }}>
                <DropdownRow isedit={isedit} options={options} value={props.validationType ? options.filter((e) => e.value == props.validationType)[0] : ""} id={`vaildation-${props.id}`} onChange={() => { setValidation(true) }} placeholder="Select an option" />
            </div>
            <div style={{ width: "18%" }} >
                <DropdownRow isedit={isedit} datatip datafor={`expectationrow-${props.id}`} islarger options={props.eoption ? props.eoption : []} value={props.eoption && props.expectation ? props.eoption.filter((e) => e.value == props.expectation.expectationId)[0] : ""} id={`expection-${props.id}`} onChange={(e) => { setException(true); setevalue(e.value); setetext(e.label); }} placeholder="Select an option" />
            </div>
            <div className="valuecontainer" style={{ width: "25%" }}>
                {exception && generateInputs(props.expectList.filter((e) => e.expectationId == evalue)[0], props.expectationValue, isedit) || <div style={{ textAlign: "center", marginTop: 15 }}>Value will appear based on selected expectation</div>}
            </div>
            <div className="t-activetd" style={{ width: "8%" }}>
                <SwithNew isedit={isedit} id={`active-${props.id}`} value={props.status} />
            </div>
            <div className="t-action" style={{ width: "12%" }}>
                <Actions onClick={() => { onSubmit() }} id={props.id} mode={(val) => { setIsedit(val) }} add={props.id == "add"} sourceName={props.sourceName} />
            </div>
            <ReactTooltip id={`sourcenamerow-${props.id}`} aria-haspopup='true' >
                <span>{props.sourceName}</span>
            </ReactTooltip>
            <ReactTooltip id={`expectationrow-${props.id}`} aria-haspopup='true' >
                <span>{etext}</span>
            </ReactTooltip>
        </form>
    )
}
const AddSourceRow = (props) => {
    const [exception, setException] = useState(false);
    const [validation, setValidation] = useState(false)
    const [evalue, setevalue] = useState("")
    const [etext, setetext] = useState("");
    const testcase = useSelector(state => state.testcase);
    const dispatch = useDispatch();

    const generateInputs = (data) => {
        const inputType = (d) => {
            d.isedit = true;
            d.id = "add";
            const mapping = {
                string: <TextBox data={d} />,
                int: <NumberInput data={d} />,
                checkbox: <Checkbox data={d} />,
                radio: <Radio data={d} />,
                set: <Dropdown data={d} />,
                dateRange: <DateRange range={true} data={d} />,
                date: <DateRange range={false} data={d} />,
                minmax: <MinMax data={d} />,
            }
            return mapping[d.type]
        }
        return data.attributes.map((input) => inputType(input.column_name))
    }
    const onSubmit = () => {
        const element = document.getElementById(`formtest-add`)
        const formData = new FormData(element);
        const formProps = Object.fromEntries(formData);
        let status = false;
        let validationType = "";
        let expectationId = "";
        let expectationValue = "";
        if (formProps[`active-add`]) {
            status = formProps[`active-add`] == "on" ? true : false;
            delete formProps[`active-add`];
        }

        if (formProps[`vaildation-add`]) {
            validationType = formProps[`vaildation-add`];
            delete formProps[`vaildation-add`];

        }
        else {
            toast.warn("Please fill all the fields to save")
            return false;
        }
        if (formProps[`expection-add`]) {
            expectationId = formProps[`expection-add`];
            delete formProps[`expection-add`];
        }
        else {
            toast.warn("Please fill all the fields to save");
            return false;
        }
        let currAttr = props.expectList.filter((e) => e.expectationId == expectationId)[0].attributes;
        for (var x of currAttr) {
            if (x.column_name.required && formProps[x.column_name.name].trim() == "") {
                toast.warn("Please fill all the fields to save");
                return false;
            }
        }
        for (var x of Object.keys(formProps)) {
            if (formProps[x].trim() == "") {
                delete formProps[x]
            }
        }
        expectationValue = JSON.stringify(formProps);
        expectationValue = expectationValue.replace(/"/g, '\\"');
        let data = {
            sourceName: props.sourceName,
            validationType: validationType,
            expectationId: expectationId,
            status: status,
            expectationValue: expectationValue
        }
        let resdata = query.PipelineSourceClassification(data.sourceName);
        fetchDV(resdata).then((res) => {
            if (res.status == 200) {
                if (res.data.errors) {
                    let newdata = {
                        sourceName: data.sourceName,
                        sourceType: "internal",
                        cron: ""
                    }
                    let resdata = query.CreateSourceClassification(newdata);
                    fetchDV(resdata).then((res) => {
                        if (res.status == 200) {
                            if (res.data.errors) {

                            }
                            else {
                                data.sourceId = res.data.data.pipelineSourceClassification.sourceId
                                let requestdata = query.CreatePipelineHistory(data);
                                fetchDV(requestdata).then((res) => {
                                    if (res.status == 200) {
                                        if (res.data.errors) {
                                            toast.warn(res.data.errors[0].message);
                                            return false;
                                        }
                                        dispatch(SourceHistory());
                                    }
                                    else {
                                        toast.warn("Failed!!!");
                                    }
                                }).catch((err) => {
                                    console.log(err)
                                })
                            }
                        }
                        else {

                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                }
                else {
                    data.sourceId = res.data.data.pipelineSourceClassification.sourceId
                    let requestdata = query.CreatePipelineHistory(data);
                    fetchDV(requestdata).then((res) => {
                        if (res.status == 200) {
                            if (res.data.errors) {
                                toast.warn(res.data.errors[0].message);
                                return false;
                            }
                            dispatch(SourceHistory());
                        }
                        else {
                            toast.warn("Failed!!!");
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            }
            else {
                let newdata = {
                    sourceName: data.sourceName,
                    sourceType: "internal",
                    cron: ""
                }
                let resdata = query.CreateSourceClassification(newdata);
                fetchDV(resdata).then((res) => {
                    if (res.status == 200) {
                        if (res.data.errors) {

                        }
                        else {
                            data.sourceId = res.data.data.pipelineSourceClassification.sourceId
                            let requestdata = query.CreatePipelineHistory(data);
                            fetchDV(requestdata).then((res) => {
                                if (res.status == 200) {
                                    if (res.data.errors) {
                                        toast.warn(res.data.errors[0].message);
                                        return false;
                                    }
                                    dispatch(SourceHistory());
                                }
                                else {
                                    toast.warn("Failed!!!");
                                }
                            }).catch((err) => {
                                console.log(err)
                            })
                        }
                    }
                    else {

                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
        }).catch((err) => {
            console.log(err)
        })



    }
    const deleteSource = (id) => {
        if (window.confirm("Are you sure want to delete?")) {
            let datacheck = testcase.pipelinehistory.findIndex((e) => e.sourceName == props.sourceName);
            if (datacheck > -1) {
                let arrcollection = testcase.pipelinehistory;
                let arrdata = testcase.pipelinehistory[datacheck].pipelineExpectations;
                arrdata = arrdata.filter((e) => e.id != "add");
                if (arrdata.length > 0) {
                    arrcollection[datacheck].pipelineExpectations = arrdata;
                }
                else {
                    arrcollection.splice(datacheck, 1);
                }
                dispatch(AddSourceHistory(arrcollection, testcase.searchfilter))
            }
        }
    }
    return (
        <form id={`formtest-add`} autoComplete="off">
            <div className="testcasesource" data-tip data-for={`sourcenamerow-${props.id}`}><input
                type="text"
                name={"source"}
                value={props.sourceName}
                disabled={true}
            /></div>
            <div style={{ width: "18%" }}>
                <DropdownRow isedit={true} options={options} value={""} id={"vaildation-add"} onChange={() => { setValidation(true) }} placeholder="Select an option" />
            </div>
            <div style={{ width: "18%" }}>
                <DropdownRow datatip datafor={`expectationrow-${props.id}`} isedit={true} islarger options={props.eoption ? props.eoption : []} value={""} id={"expection-add"} onChange={(e) => { setException(true); setevalue(e.value); setetext(e.label) }} placeholder="Select an option" />
            </div>
            <div className="valuecontainer" style={{ width: "25%" }}>
                {exception && generateInputs(props.expectList.filter((e) => e.expectationId == evalue)[0]) || <div style={{ textAlign: "center", marginTop: 15 }}>Value will load based on expection</div>}
            </div>
            <div className="t-activetd" style={{ width: "8%" }}>
                <SwithNew isedit={true} id={"active-add"} value={false} />
            </div>
            <div className="t-action" style={{ width: "12%" }}>
                <div className="t-add" onClick={() => { onSubmit() }}><img src={Images.testtick} /></div>
                <div className="t-delete" onClick={() => { deleteSource(props.id) }}><img src={Images.whitedelete} /></div>
            </div>
            <ReactTooltip id={`sourcenamerow-${props.id}`} aria-haspopup='true' >
                <span>{props.sourceName}</span>
            </ReactTooltip>
            {etext != "" && <ReactTooltip id={`expectationrow-${props.id}`} aria-haspopup='true' >
                <span>{etext}</span>
            </ReactTooltip> || ""}
        </form>
    )
}

const Actions = (props) => {
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();
    const testcase = useSelector(state => state.testcase);

    const deleteSource = (id) => {
        if (window.confirm("Are you sure want to delete?")) {
            if (id != "add") {
                let data = {
                    id: id
                }
                fetchDV(query.DeletePipelineHistory(data)).then((res) => {
                    if (res.status == 200) {
                        if (res.data.errors) {
                            toast.warn(res.data.errors[0].message);
                            return false;
                        }
                        dispatch(SourceHistory());
                    }
                    else {
                        toast.warn("Failed!!!");
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
            else {
                let datacheck = testcase.pipelinehistory.findIndex((e) => e.sourceName == props.sourceName);
                if (datacheck > -1) {
                    let arrcollection = testcase.pipelinehistory;
                    let arrdata = testcase.pipelinehistory[datacheck].pipelineExpectations;
                    arrdata = arrdata.filter((e) => e.id != "add");
                    if (arrdata.length > 0) {
                        arrcollection[datacheck].pipelineExpectations = arrdata;
                    }
                    else {
                        arrcollection.splice(datacheck, 1);
                    }
                    dispatch(AddSourceHistory(arrcollection, "delete"))
                }
            }
        }
    }
    return (
        <>
            {!edit && !props.add ? <>
                <div className="t-edit" onClick={() => { setEdit(true); props.mode(true); }}><img src={Images.Edit} /></div>
                <div className="t-delete" onClick={() => { deleteSource(props.id) }}><img src={Images.whitedelete} /></div>
            </> :
                <> <div className="t-update" onClick={() => { props.onClick() }}><img src={Images.testtick} /></div>
                    <div className="t-delete" onClick={() => { deleteSource(props.id) }} ><img src={Images.whitedelete} /></div>
                </>}
        </>
    )
}

const SwithNew = (props) => {
    const [checked, setChecked] = useState(false);
    const handleChange = (e) => {
        setChecked(e)
    }
    useEffect(() => {
        setChecked(props.value)
    }, [props.value])
    return (<Switch
        checked={checked}
        onChange={props.isedit && handleChange}
        onColor="#fff"
        offColor={"#ff0000"}
        onHandleColor="#35B27D"
        offHandleColor={"#ff0000"}
        handleDiameter={13}
        uncheckedIcon={false}
        checkedIcon={false}
        height={18}
        width={35}
        className={"react-switch"}
        id={props.id}
        name={props.id}
        disabled={!props.isedit}
    />)
}
const DropdownRow = (props) => {
    const [value, setValue] = useState("");
    const [distext, setDistext] = useState("");
    const [show, setShow] = useState(false);
    const ref = useRef();
    useOnClickOutside(ref, () => {
        setShow(false);
    });
    const OnChange = (e) => {
        setValue(e.value);
        setDistext(e.label)
        props.onChange(e)
    }
    useEffect(() => {
        if (props.value && props.value.label) {
            setValue(props.value.value);
            setDistext(props.value.label)
        }
    }, [props.value])
    return (
        <div className="ddholder" ref={ref}>
            <div className="testdd" data-tip={props.datatip} data-for={props.datafor} style={!props.isedit ? { backgroundColor: "#f8f8fb" } : {}} onClick={() => { props.isedit && setShow(!show) }}>
                {distext ? <span className="selectTxt">{distext}</span> : <span className="placeholder">{props.placeholder}</span>}
                <img src={Images.testArrow} />
                <input type="hidden" name={props.id} id={props.id} value={value} />
            </div>
            {show && <div className={props.islarger ? "popholderlarger" : "popholder"} ><div className="testddmenu">
                {props.options && props.options.map((e, i) => {
                    return (
                        <div className={distext == e.label && "isSelected"} onClick={
                            () => { OnChange(e); setShow(false); }
                        } key={i}>{e.label}</div>
                    )
                })}
                {props.options.length == 0 &&
                    <div onClick={
                        () => { setShow(false); }
                    } >No data found</div>
                }
            </div></div>}
        </div>
    )
}