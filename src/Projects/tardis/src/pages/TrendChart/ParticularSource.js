import React, { useState, useEffect } from "react";
import { Images } from "../../assets/images";
import { TitleContainer, Pie, Button, DatePicker, DropDown, Loader, PDF } from "../../components";
import "./Chart.scss";
import SVG from 'react-inlinesvg';
import { useHistory } from "react-router-dom";
import Layout from '../../Layout';
import moment from 'moment';
import { connect, useSelector } from "react-redux";
import { ParticularTrend } from "../../../../../reducers/trendchart/actions"
import Modal from "react-modal";
import html2pdf from "html2pdf.js"
import { customExportStyles } from "../../assets/constant";


const ParticularChart = (props) => {
    let history = useHistory();
    const trend = useSelector(state => state.trend);
    const { selected, parent } = history.location.state;
    const [startDate, SetStart] = useState(new Date());
    const [endDate, SetEnd] = useState(null);
    const [range, SetRange] = useState("");
    const [reset, SetReset] = useState(false);
    const onBackHandler = () => {
        history.push({ pathname: "/tardis/source-details/" + parent.source.source, state: parent })
    };
    const [color, setColor] = useState([]);
    const [data, setData] = useState([]);
    const [Failurelist, setFailurelist] = useState([]);
    const [modalIsOpen, SetModal] = useState(false);
    const closeModal = () => {
        SetModal(false);
    };
    const openModal = () => {
        SetModal(true);
    };
    useEffect(
        () => {
            var source = [];
            source.push(selected.source.source)
            var request = {
                sourceName: JSON.stringify(source),
                startLogdate: moment().subtract(60, 'days').format("YYYY-MM-DD"),
                endLogdate: moment().format("YYYY-MM-DD"),
            }
            props.ParticularTrend(request)
        },
        [selected]
    );
    useEffect(
        () => {
            var res = trend.particular.reduce(function (pv, cv) {
                if (pv[cv.status]) {
                    pv[cv.status] += 1;
                } else {
                    pv[cv.status] = 1;
                }
                return pv;
            }, {});
            let totalstatus = 0;
            for (var r of Object.keys(res)) {
                totalstatus += res[r];
            }
            var status = []; var color = [];
            for (var x of Object.keys(res)) {
                if (x.toLowerCase() === "completed on time") {
                    let data = { label: "Compelte", value: (res[x] / totalstatus) * 100 }
                    status.push(data)
                    color.push("#36b27e")
                }
                else {
                    if (x === "Delayed") {
                        color.push("#febb68");
                        let data = { label: "Delay", value: (res[x] / totalstatus) * 100 }
                        status.push(data)
                    }
                    else {
                        color.push("#fd3031");
                        let data = { label: x, value: (res[x] / totalstatus) * 100 }
                        status.push(data)
                    }

                }
            }
            setColor(color);
            setData(status);
            var resreason = trend.particular.filter((e)=>e.status === "Failed").reduce(function (pv, cv) {
                if (pv[cv.failureDelayReason.reason]) {
                    pv[cv.failureDelayReason.reason] += 1;
                } else {
                    pv[cv.failureDelayReason.reason] = 1;
                }
                return pv;
            }, {});
            if (resreason.NA) {
                delete resreason.NA
            }
            let totalreason = 0;
            for (var rr of Object.keys(resreason)) {
                totalreason += resreason[rr];
            }
            var reason = [];
            for (var x of Object.keys(resreason)) {
                if (x.toLowerCase() !== "na") {
                    let data = { label: x, value: (resreason[x] / totalreason) * 100 }
                    reason.push(data)
                }
            }
            setFailurelist(reason);
        },
        [trend]
    );
    const startdate = (e) => {
        SetStart(e);
    }
    const enddate = (e) => {
        SetEnd(e);
    }
    const onFliter = () => {
        if (startDate != null && endDate != null) {
            var source = [];
            source.push(selected.source.source)
            var request = {
                sourceName: JSON.stringify(source),
                startLogdate: moment(startDate).format("YYYY-MM-DD"),
                endLogdate: moment(endDate).format("YYYY-MM-DD"),
            }
            props.ParticularTrend(request)
        }
        else {
            let datecount = 0;
            if (range == "Monthly") {
                datecount = 60
            }
            if (range == "Weekly") {
                datecount = 7
            }
            if (range == "Yearly") {
                datecount = 365
            }
            var source = [];
            source.push(selected.source.source)
            var request = {
                sourceName: JSON.stringify(source),
                startLogdate: moment().subtract(datecount, 'days').format("YYYY-MM-DD"),
                endLogdate: moment().format("YYYY-MM-DD"),
            }
            props.ParticularTrend(request)
        }
    }
    const FilterRange = (e) => {
        SetRange(e);
        SetReset(true);
        SetStart(null);
        SetEnd(null);
        setTimeout(()=>{SetReset(false);},500)
    }
    const exportClick = ()=> {
        openModal();
      }
    return (
        <Layout>
            <div className="particular-page page">
                <TitleContainer
                    name="Trends"
                    img={Images.Chart}
                    onBack={() => {
                        onBackHandler();
                    }}
                >


                    <div className="centeralign filter-container">
                        <DropDown id={"timeframedd"}
                            class={"options"}
                            value={"Monthly"}
                            calender={true}
                            imguri={Images.dropdownarrow}
                            onChange={(data) => { FilterRange(data) }}
                            options={["Weekly", "Monthly", "Yearly"]} />
                        <div className="date-holder"><DatePicker name={`fromdate`} placeholder="From Date" className="filter-date" handleDate={(e) => { startdate(e) }} reset={reset} /></div>
                        <div className="date-holder"><DatePicker name={`todate`} placeholder="To Date" className="filter-date" minDate={startDate} handleDate={(e) => { enddate(e) }} reset={reset}/></div>
                        <Button
                            class="submitbtn"
                            label="Submit"
                            onClick={() => {
                                onFliter()
                            }}
                        />
                    </div>
                </TitleContainer>
                <div className="export-container"><div className="exportbtn" onClick={exportClick}>Export Data</div></div>
                {trend.isLoading ?
                    <Loader />
                    : data.length > 0 ||  Failurelist.length > 0?<div className="pieholder">
                        <div className="pie">
                            <div className="title">
                                <div className="centeralign trendsoure">
                                    <SVG src={Images.addlist} />
                                </div>
                                <span>{selected ? selected.source.source : ""}</span></div>
                            {data.length > 0 ? <div className="piechart">
                                <Pie
                                    data={data}
                                    width={200}
                                    height={200}
                                    innerRadius={0}
                                    outerRadius={100}
                                    color={color}
                                    stroke={true}
                                    legend={"Bottom"}
                                />
                            </div> : null}
                        </div>
                         <div className="donut-container">
                            <div className="title">
                                <span>Failure Reasons</span>
                                
                            </div>
                            {Failurelist.length > 0 ?<div className="donut">
                                <Pie
                                    data={Failurelist}
                                    width={350}
                                    height={350}
                                    innerRadius={105}
                                    outerRadius={175}
                                    color={["#46acb0", "#f26523", "#f9aa7b", "#a6a8aa", "#666665", "#add5d7", "#fee8b0", "#fecd34"]}
                                    legend={"Right"}
                                />
                                <div id="donuttooltip" className="tooltiphidden">
                                    <p><span id="value"></span></p>
                                </div>
                            </div>: null}
                        </div> 
                    </div>:<div className="nosource">No Data found!!</div>}
                </div>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customExportStyles}
            contentLabel="Export PDF"
        >
        <div className="download-container"> 
        <span className="title">Preview</span>
            <Button
                class="submitbtn"
                label="Download PDF"
                onClick={() => {
                    window.scrollTo(0, 0);
                    var element = document.getElementById('exportpdf');
                    var opt = {
                    margin:       1,
                    filename:     (selected ? selected.source.source : "Trends" )+".pdf",
                    image:        { type: 'jpeg', quality: 0.98 },
                    html2canvas:  { scale:2 },
                    jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait',putOnlyUsedFonts:true }
                    };
                    html2pdf().set(opt).from(element).save();
                }}/>
            </div>
            <PDF headers={[ "Name",  "Complete", "Delay", "Failure"]} data={[{Name:selected ? selected.source.source :"",Complete: trend.particular && trend.particular.filter((e)=>e.status === "Completed On Time").length,Delay:trend.particular && trend.particular.filter((e)=>e.status === "Delayed").length,Failure:trend.particular && trend.particular.filter((e)=>e.status === "Failed").length }]}>
            <div style={{paddingBottom:30}}>
            {data.length > 0 ||  Failurelist.length > 0?<div className="export-page"> <div className="pieholder">
                        <div className="pie">
                            <div className="title">
                                <div className="centeralign trendsoure">
                                    <SVG src={Images.addlist} />
                                </div>
                                <span>{selected ? selected.source.source : ""}</span></div>
                            {data.length > 0 ? <div className="piechart">
                                <Pie
                                    data={data}
                                    width={200}
                                    height={200}
                                    innerRadius={0}
                                    outerRadius={100}
                                    color={color}
                                    stroke={true}
                                    legend={"Bottom"}
                                />
                            </div> : null}
                        </div>
                         <div className="donut-container">
                            <div className="title">
                                <span>Failure Reasons</span>
                            </div>
                            {Failurelist.length > 0 ?<div className="donut">
                                <Pie
                                    data={Failurelist}
                                    width={350}
                                    height={350}
                                    innerRadius={105}
                                    outerRadius={175}
                                    color={["#46acb0", "#f26523", "#f9aa7b", "#a6a8aa", "#666665", "#add5d7", "#fee8b0", "#fecd34"]}
                                    legend={"Right"}
                                />
                                <div id="donuttooltip" className="tooltiphidden">
                                    <p><span id="value"></span></p>
                                </div>
                            </div>: null}
                        </div> 
                    </div></div>:<div className="nosource">No Data found!!</div>}
            </div>
          </PDF>
        
        </Modal>
        </Layout>
    );
};


export default connect(
    null, { ParticularTrend }
)(ParticularChart);