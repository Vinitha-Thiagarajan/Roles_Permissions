import React, { useState, useEffect, Fragment } from "react";
import "./style.scss";
import TraceDoc from "../../../resources/images/TraceDoc.svg";
import GraphTrace from "../../../resources/images/GraphTrace.svg";
import Touch from "../../../resources/images/touch.svg";
import { CardHeader, DropDown, Chart, DateRange } from "../../../components/common";
import moment from "moment";
import { useOktaAuth } from "@okta/okta-react";
import Main from "../../layouts/Main";
import { TouchBar } from "../../../components"
import { getTraceability, resetTrace } from "../../../../../../reducers/Traceability/traceability.actions";
import { getPipeline, getPipelineAll } from "../../../../../../reducers/TraceabilityChart/tracechart.actions";
import { useDispatch, useSelector } from "react-redux";
import { objToArray, useWindowSize } from "../../../utils";
import { useParams, useLocation, useHistory } from "react-router-dom";


const Home = () => {
    const { authState, oktaAuth } = useOktaAuth();
    const dispatch = useDispatch();
    const history = useHistory();
    const [width, height] = useWindowSize();
    const [chartwidth, setchartWidth] = useState(1000)
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedPipeline, setSelectedPipeline] = useState(null);
    const [resetTouch, setresetTouch] = useState(false)
    const [selection, setSelection] = useState(false);
    const [selectionTouch, setSelectionTouch] = useState(false);
    const [listoftouch, setListoftouch] = useState([]);
    const [metric, setMetric] = useState(false);
    const [sdate, setSDate] = useState(
        moment().add(-7, "days")
    );
    const [edate, setEDate] = useState(
        moment()
    );

    const comparearr = (array1, array2) => {

        let flag = true;
        if (!selectionTouch)
            return false;
        if (array1.length == array2.length) {
            array1.every(array_obj => {
                if (flag) {
                    if (!array2.map((e) => e.stepDetail).includes(array_obj.stepDetail)) {
                        flag = false;
                    }
                }
            });
            array2.every(array_obj => {
                if (flag) {
                    if (!array1.map((e) => e.stepDetail).includes(array_obj.stepDetail)) {
                        flag = false;
                    }
                }
            });
            return flag;
        } else {
            return false;
        }

    }
    const [update, setUpdate] = useState(false);
    const [chartvalue, setchartvalue] = useState(false);
    const [datelist, setdatelist] = useState(false);
    const traceability = useSelector((state) => state.traceability);
    const {
        allBrands,
        allPipelines,
        allTouchPoints,
        dataAndVariancePerDay,
        chartloading,
        brand,
        errors } = useSelector((state) => state.chart);

    const { traceabilityFlow, loading } = traceability;
    const [date, setDate] = useState(
        moment().format("YYYY-MM-DD")
    );
    const [brandselect, setBrand] = useState([]);
    const [pipeline, setPipeline] = useState([]);

    const { traceId } = useParams();
    const resetState = () => {
        setSelectedBrand("");
        setSelectedPipeline(null);
        setSelection(false);
        setresetTouch(false);
        setSelectionTouch(false);
        setMetric(false);
        setSDate(moment().add(-7, "days"))
        setEDate(moment())
        setchartvalue(false)
        setdatelist(false)
        setBrand([])
        setPipeline([])
    }
    useEffect(() => { }, [authState, oktaAuth]);
    useEffect(() => {
        if (allBrands) {
            if (allBrands.length > 0) {
                let valarray = allBrands.map((e) => { return { "label": e, "value": e } });
                setBrand(valarray);
            }
            else if (brand != "") {
                let valarray = [{ "label": brand, "value": brand }]
                setBrand(valarray);
            }
            if (!traceId)
                setSelectedBrand(brand)
            setUpdate(!update)
        }
    }, [allBrands]);
    useEffect(() => {
        if (allPipelines) {
            let valarray = allPipelines.map((e) => { return { "label": e, "value": e } });
            setPipeline(valarray);
            setUpdate(!update)
        }
    }, [allPipelines]);
    useEffect(() => {
        if (allTouchPoints && allTouchPoints.length > 0 && comparearr(allTouchPoints, listoftouch) === false) {
            let arrdefalut = [allTouchPoints[allTouchPoints.length - 1].stepDetail]
            if (allTouchPoints.length > 1)
                arrdefalut.push(allTouchPoints[allTouchPoints.length - 2].stepDetail)
            touchSelection(arrdefalut);
            setListoftouch(allTouchPoints)

        }
    }, [allTouchPoints]);
    useEffect(() => {
        if (width > 0 && dataAndVariancePerDay && dataAndVariancePerDay.length > 0) {
            try {
                let widthchart = document.getElementById("chartcontainer").offsetWidth;
                setchartWidth(widthchart);
            }
            catch (e) {

            }
        }
    }, [width]);
    useEffect(() => {
        if (traceabilityFlow && traceabilityFlow.pipeline && traceId) {
            dispatch(getPipeline(
                traceabilityFlow.pipeline,
                false,
                traceabilityFlow.brand,
                false,
                authState?.accessToken,
                sdate,
                edate
            ))
            setSelectedPipeline(traceabilityFlow.pipeline);
            setSelectedBrand(traceabilityFlow.brand)
        }
    }, [traceabilityFlow])
    useEffect(() => {
        if (traceId) {
            dispatch(
                getTraceability(
                    traceId,
                    date,
                    null,
                    null,
                    authState?.accessToken
                )
            );
        }
        dispatch(
            getPipelineAll(
                authState?.accessToken
            )
        );
        resetState();
    }, []);
    const touchSelection = (e) => {
        setSelectionTouch(e)
        setUpdate(!update)
        if (allTouchPoints && selectedPipeline != null) {
            let variencestep = allTouchPoints.filter((item) => item.stepDetail.toLowerCase() == "variance");
            variencestep = variencestep.length > 0 ? variencestep[0].stepDetail : false;
            let check = -1;
            if (variencestep) {
                check = e.indexOf(variencestep);
            }
            let touchval = allTouchPoints.filter((item) => e.indexOf(item.stepDetail) > -1);
            touchval = touchval.map((arr) => arr.stepDetail);
            dispatch(getPipeline(
                selectedPipeline,
                touchval,
                selectedBrand,
                check > -1,
                authState?.accessToken,
                sdate,
                edate
            ))
        }
    }
    const onBrandSelection = (e) => {
        setSelectedBrand(e);
        setSelectionTouch(false);
        if (allTouchPoints) {
            let touchval = []; let check = -1;
            if (selection) {
                touchval = allTouchPoints.filter((item) => selection.indexOf(item.stepDetail) > -1);
                check = touchval.findIndex((arr) => arr.stepDetail.toLowerCase() == "variance");
                touchval = touchval.map((arr) => arr.stepDetail);
            }
            dispatch(getPipeline(
                selectedPipeline,
                touchval,
                e,
                check > -1,
                authState?.accessToken,
                sdate,
                edate
            ))
        }
    }
    const onPipelineSelection = (e) => {
        setSelectedPipeline(e);
        setSelectionTouch(false);
        history.push("/dart/traceability_charts");
        dispatch(resetTrace());
        dispatch(getPipeline(
            e,
            false,
            false,
            false,
            authState?.accessToken,
            moment().add(-7, "days"),
            moment()
        ))
        resetRecords();
    }
    const resetRecords = () => {
        setSelection([]);
        setchartvalue([]);
        setSelectedBrand("");
        setdatelist([]);
        setresetTouch(!resetTouch);
        setSDate(moment().add(-7, "days"));
        setEDate(moment());
    }
    useEffect(() => {
        if (dataAndVariancePerDay) {
            if (dataAndVariancePerDay.length > 0) {
                let limitedval = dataAndVariancePerDay;
                let metricnname = limitedval.map((e) => e.metricName);
                setMetric(metricnname);
                limitedval = limitedval.map((e) => e.metricData);
                limitedval = limitedval.filter((e) => e.length > 0 && e[0].data && e[0].data.length > 0);
                let arrchart = []; let datechart = []; let legend = [];
                for (let arr in limitedval) {
                    let metricarr = limitedval[arr].reverse();
                    let datelist = metricarr.map((e) => moment(e.date).format("MM/DD"));
                    let datalist = metricarr.map((e) => e.data);
                    let stepsorder = metricarr[0].steps;
                    let arrlist = []; legend = [];
                    let touchselection = selectionTouch ? selectionTouch : [];
                    for (let x in stepsorder) {
                        let stepordervalue = stepsorder[x];
                        if (stepsorder[x] == "variance") {
                            let variancestep = allTouchPoints.filter((e) => e.stepDetail == "Variance");
                            stepordervalue = variancestep.length > 0 ? variancestep[0].stepDetail : 0;
                        }
                        touchselection = touchselection.filter((t) => t != stepordervalue)
                        let holdx = parseInt(x);
                        let vallist = [];
                        for (let y in datalist) {
                            vallist.push(parseInt(datalist[y][x]) == 0 ? 0 : parseInt(datalist[y][x]));
                        }

                        if (vallist.length > 0) {
                            let selectionlegent = allTouchPoints.filter((item) => item.stepDetail == stepordervalue).map((d) => d.stepDetail)[0];
                            if (selectionlegent) {
                                legend.push(selectionlegent);
                                let valdata = {
                                    name: selectionlegent,
                                    data: vallist
                                }
                                arrlist.push(valdata);
                            }
                        }
                    }
                    for (let t in touchselection) {
                        let selectionlegent = allTouchPoints.filter((item) => item.stepDetail == touchselection[t]).map((d) => d.stepDetail)[0];
                        legend.push(selectionlegent);
                        let arrindex = arrlist.length;
                        let vallist = [];
                        for (let y in datalist) {
                            vallist.push(0);
                        }
                        let valdata = {
                            name: selectionlegent,
                            data: vallist
                        }
                        arrlist.push(valdata);
                    }
                    arrchart.push(arrlist);
                    datechart.push(datelist);
                }

                setSelection(legend);
                setchartvalue(arrchart);
                setdatelist(datechart);
                setUpdate(!update)
            }
            else {
                setSelection([]);
                setchartvalue([]);
                setdatelist([]);
                setUpdate(!update)
            }
        }
    }, [dataAndVariancePerDay])
    const onDateChange = (data) => {
        setSDate(moment(data.start));
        setEDate(moment(data.end));
        if (allTouchPoints) {
            let touchval = []; let check = -1;
            if (selection) {
                touchval = allTouchPoints.filter((item) => selection.indexOf(item.stepDetail) > -1);
                check = touchval.findIndex((arr) => arr.stepDetail.toLowerCase() == "variance");
                touchval = touchval.map((arr) => arr.stepDetail);
            }
            dispatch(getPipeline(
                selectedPipeline,
                touchval,
                selectedBrand,
                check > -1,
                authState?.accessToken,
                data.start,
                data.end
            ))
        }
    }
    return (
        <Main>
            <div className="tracechart">
                <div className="section filter">
                    <div className="row filterrow" >
                        <div className="col flitercontainer">
                            <div className="filtericon">
                                <img src={TraceDoc} alt="" />
                            </div>
                        </div>
                        {/* <div className="col filtertext">
                            <div className="filtertitle">Pipeline Name</div>
                            <div className="filtername">{traceabilityFlow.pipeline}</div>
                        </div> */}
                        <div className="col filter-drop">
                            <DropDown
                                title="Pipeline Name"
                                value={selectedPipeline}
                                data={pipeline}
                                selected={false}
                                onChangeData={(e) => {
                                    onPipelineSelection(e)
                                }}
                                placeholder="Select Pipeline"
                            />
                        </div>
                        <div className="col filter-drop">
                            <DropDown
                                title="Brands"
                                value={selectedBrand}
                                data={brandselect}
                                selected={false}
                                onChangeData={(e) => {
                                    onBrandSelection(e)
                                }}
                                placeholder="Select Brand"
                            />
                        </div>

                        <div className="col filter-datepicker">
                            <DateRange
                                startDate={
                                    sdate
                                }
                                endDate={
                                    edate
                                }
                                onChange={(data) => {
                                    onDateChange(data)
                                }}
                            />
                        </div>
                    </div>
                </div>

                {!errors && !loading && !chartloading && allTouchPoints.length ? (
                    <>
                        <div className="section">
                            <div className="row">
                                <div className="col">
                                    <CardHeader
                                        name={"Touchpoints"}
                                        iconColor={"#E0E3FA"}
                                        icon={Touch}
                                    />
                                    <div className="section-content">
                                        <TouchBar data={allTouchPoints} selectionval={selectionTouch} reset={resetTouch} onSelection={(e) => { touchSelection(e) }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {chartvalue && chartvalue.length > 0 &&
                            chartvalue.map((chart, index) => {
                                return (
                                    <div className="section" key={"chart" + index}>
                                        <div className="row">
                                            <div className="col">
                                                <CardHeader
                                                    name={`${metric[index]}`}
                                                    iconColor={"#FAE7CE"}
                                                    icon={GraphTrace}
                                                />
                                                <div className="section-content chartcontainer" id="chartcontainer">
                                                    <Chart
                                                        width={chartwidth}
                                                        data={chart}
                                                        datelist={datelist[index]}
                                                    />
                                                    {/* <div className="card-header-right">
                                                        {selection && selection.map((e, i) => {
                                                            return <Fragment key={i}>
                                                                <div className="legend legendmargin">
                                                                    <div className="boxone" style={{ backgroundColor: colorcode[i] }}></div>{e}
                                                                </div>
                                                            </Fragment>
                                                        })}
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>
                ) : <div />}
                {!errors && !loading && !chartloading && !chartvalue.length && selectionTouch.length > 0 ? (
                    <p className={"error"}>No Data Found!</p>
                ) : <p></p>}
                {loading || chartloading && <div className="loader">Loading...</div>}
                {!loading && !chartloading && errors && <p className={"error"}>{errors}</p>}
            </div>
        </Main >
    );
};

export default Home;
