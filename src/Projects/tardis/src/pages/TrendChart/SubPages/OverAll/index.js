import React, { useState, useEffect } from "react";
import "./OverAll.scss";
import { TitleContainer, DropDown, DatePicker, Button, Swapper, Pie, Loader, PDF } from "../../../../components";
import { Images } from "../../../../assets/images";
import { useHistory } from "react-router-dom";
import Layout from '../../../../Layout';
import { connect, useSelector } from "react-redux";
import { OverallRecords } from "../../../../../../../reducers/trendchart/actions"
import {CombineRecords, TrendDataLoad, Overallcolors} from "../Common"
import html2pdf from "html2pdf.js"
import Modal from "react-modal";
import { customExportStyles } from "../../../../assets/constant";

const OverAllTrend = (props) => {
    const trend = useSelector(state => state.trend);
    const [startDate, SetStart] = useState(new Date());
    const [endDate, SetEnd] = useState(null);
    const [range, SetRange] = useState("");
    const [reset, SetReset] = useState(false);
    const [data, setDatalist] = useState([]);
    const [Failurelist, setFailurelist] = useState([]);
    const [Pdfrecord, setPdfRecord] = useState({});
    const [modalIsOpen, SetModal] = useState(false);
    const closeModal = () => {
      SetModal(false);
    };
    const openModal = () => {
      SetModal(true);
    };
    let history = useHistory();
    const onBackHandler = () => {
        history.push("/tardis/trend-chart");
    };
    useEffect(
        () => {
            let request = TrendDataLoad([],"Monthly");
            props.OverallRecords(request)
        },
        []
    );
    useEffect(() => {
        var resreason = CombineRecords(trend.overall, "failureDelayReason"); 
        if (resreason.NA) {
            delete resreason.NA
        }
        let totalreason = 0;
        for (var rr of Object.keys(resreason)) {
            totalreason += resreason[rr];
        }
        var reason = [];var datalist=[];var pdfrec =[];
        for (var x of Object.keys(resreason)) {
            if (x.toLowerCase() !== "na") {
                let data = { label: x, value: (resreason[x] / totalreason) * 100 }
                reason.push(data)
                let newdata = {}
                newdata[x] = (resreason[x] / totalreason) * 100 ;
                datalist.push(newdata)
                let pdf ={Name:x,Count:resreason[x]}
                pdfrec.push(pdf)
            }
        }
        setPdfRecord(pdfrec);
        setFailurelist(reason);
        setDatalist(datalist);
    }, [trend.overall])
    const startdate = (e) => {
        SetStart(e);
    }
    const enddate = (e) => {
        SetEnd(e);
    }
    const onFliter = () => {
        if (startDate != null && endDate != null) {
            let request = TrendDataLoad([],false,startDate,endDate);
            props.OverallRecords(request)
        }
        
    }
    const FilterRange = (range) => {
        SetRange(range);
        SetReset(true);
        SetStart(null);
        SetEnd(null);
        setTimeout(() => { SetReset(false); }, 500)
        let request = TrendDataLoad([],range);
        props.OverallRecords(request)
    }
    const exportClick = ()=> {
        openModal();
      }
    return (
        <Layout>
            <div className="Overallpage page">
                <TitleContainer
                    name="Overall Failure Reasons"
                    img={Images.Chart}
                    onBack={() => {
                        onBackHandler();
                    }}
                >
                    <div className="centeralign filter-container">
                        <Swapper options={["Trends"]} leftimg={Images.sort} page="overall" class={"TrendDp"} />
                        <DropDown id={"timeframedd"}
                            class={"options"}
                            value={"Monthly"}
                            calender={true}
                            imguri={Images.dropdownarrow}
                            onChange={(e) => { FilterRange(e) }}
                            options={["Weekly", "Monthly", "Yearly"]} />
                        <div className="date-holder"><DatePicker name={`fromdate`} placeholder="From Date" className="filter-date" handleDate={(e) => { startdate(e) }} reset={reset} /></div>
                        <div className="date-holder"><DatePicker name={`todate`} placeholder="To Date" className="filter-date" minDate={startDate} handleDate={(e) => { enddate(e) }} reset={reset} /></div>
                        <Button
                            class="submitbtn"
                            label="Submit"
                            onClick={() => {
                                onFliter()
                            }}
                        />
                    </div>

                </TitleContainer>
                <div className="export-container"> <div className="centeralign"><div className="exportbtn"  onClick={exportClick}>Export Data</div></div></div>
                {trend.isLoading ?
                    <Loader />
                    : <div className="piechart">
                        <Pie
                            data={Failurelist}
                            width={400}
                            height={400}
                            innerRadius={0}
                            outerRadius={200}
                            color={Overallcolors}
                            stroke={true}
                            stokeWidth={"5"}
                            legend={"Right"}
                        />
                        <div id="donuttooltip" className="tooltiphidden">
                            <p><span id="value"></span></p>
                        </div>
                    </div>}
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
                  filename:     'Overall.pdf',
                  image:        { type: 'jpeg', quality: 0.98 },
                  html2canvas:  { scale:2 },
                  jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait',putOnlyUsedFonts:true, }
                };
                html2pdf().set(opt).from(element).save();
              }}/>
        </div>
      
          <PDF headers={["Name", "Count"]} data={Pdfrecord} >
            <div style={{paddingBottom:30}}>
          {Failurelist.length > 0 ?
            <div className="piechart" style={{display:"flex",justifyContent:"space-around"}}>
            <Pie
                data={Failurelist}
                width={300}
                height={300}
                innerRadius={0}
                outerRadius={150}
                color={Overallcolors}
                stroke={true}
                stokeWidth={"5"}
                legend={"Right"}
                export={true}
            />
            <div id="donuttooltip" className="tooltiphidden">
                <p><span id="value"></span></p>
            </div>
        </div> :
            null}
            </div>
          </PDF>
      
      </Modal>
        </Layout>
    );
};

export default connect(
    null, { OverallRecords }
)(OverAllTrend);
