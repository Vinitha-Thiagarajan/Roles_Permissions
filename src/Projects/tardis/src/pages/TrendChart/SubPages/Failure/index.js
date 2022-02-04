import React, { useState, useEffect, useCallback } from "react";
import "./Failure.scss";
import { TitleContainer, DropDown, DatePicker, Button, Swapper, BarChart, Legend, Loader, PDF } from "../../../../components";
import { Images } from "../../../../assets/images";
import { useHistory } from "react-router-dom";
import Layout from '../../../../Layout';
import { connect, useSelector } from "react-redux";
import { FailureRecords } from "../../../../../../../reducers/trendchart/actions"
import {CombineRecords, TrendDataLoad, Failurecolors} from "../Common"
import html2pdf from "html2pdf.js"
import Modal from "react-modal";
import { getPngData } from "recharts-to-png";
import { customExportStyles } from "../../../../assets/constant";

const FailureTrend = (props) => {
  const trend = useSelector(state => state.trend);
  const [data, setData] = useState([]);
  const [startDate, SetStart] = useState(new Date());
  const [endDate, SetEnd] = useState(null);
  const [range, SetRange] = useState("");
  const [reset, SetReset] = useState(false);
  const [modalIsOpen, SetModal] = useState(false);
  const [chart, setChart] = useState();
  const handleDownload = useCallback(async () => {
    try {
      const pngData = await getPngData(chart);
      setTimeout(() => {
        document.getElementById("graphimg").src = pngData;
        document.getElementById("loader").style.display = "none";
      })
    }
    catch (e) {

    }
  }, [chart]);
  const closeModal = () => {
    SetModal(false);
  };
  const openModal = () => {
    SetModal(true);
  };
  useEffect(() => {
    let request = TrendDataLoad([],"Monthly");
    props.FailureRecords(request)
  }, [])
  useEffect(() => {
    if (trend.failure && trend.failure.length > 0) {
      var res = CombineRecords(trend.failure, "source");
      var status = [];
      for (var x of Object.keys(res)) {
        var resval = CombineRecords(res[x], "failureDelayReason"); 
        if (Object.keys(resval).length === 1 && resval["NA"]) {

        }
        else {
          let result = {
            name: x,
            "Luigi Server Issue": resval["Luigi Server Issue"] ? resval["Luigi Server Issue"] : 0,
            "Presto Issue": resval["Presto Issue"] ? resval["Presto Issue"] : 0,
            "Vendor Issue": resval["Vendor Issue"] ? resval["Vendor Issue"] : 0,
            "Technical Issue (Dev-Ops)": resval["Technical Issue (Dev-Ops)"] ? resval["Technical Issue (Dev-Ops)"] : 0,
            "Bug": resval["Bug"] ? resval["Bug"] : 0,
            "Unfulfilled Dependency": resval["Unfulfilled Dependency"] ? resval["Unfulfilled Dependency"] : 0,
            "Technical Issue (not Dev-Ops)": resval["Technical Issue (not Dev-Ops)"] ? resval["Technical Issue (not Dev-Ops)"] : 0,
            "Other": resval["Other"] ? resval["Other"] : 0,
          }
          status.push(result);
        }
      }
      setData(status);
    }
  }, [trend.failure])


  let history = useHistory();
  const onBackHandler = () => {
    history.push("/tardis/trend-chart");
  };
  const startdate = (e) => {
    SetStart(e);
  }
  const enddate = (e) => {
    SetEnd(e);
  }
  const onFliter = () => {
    if (startDate != null && endDate != null) {
      let request = TrendDataLoad([],false,startDate,endDate);
      props.FailureRecords(request)
    }
    
  }
  const FilterRange = (range) => {
    SetRange(range);
    SetReset(true);
    SetStart(null);
    SetEnd(null);
    setTimeout(() => { SetReset(false); }, 500)
    let request = TrendDataLoad([],range);
    props.FailureRecords(request)
  }
  const exportClick = ()=> {
    if(!trend.isLoading){
      openModal();
      setTimeout(()=>{
        handleDownload();
      }) 
    }
  }
  return (
    <Layout>
      <div className="Failurepage page">
        <TitleContainer
          name="General Failure Reasons"
          img={Images.Chart}
          onBack={() => {
            onBackHandler();
          }}
        >
          <div className="centeralign filter-container">
            <Swapper options={["Trends"]} leftimg={Images.sort} page="failure" class={"TrendDp"} />
            <DropDown id={"timeframedd"}
              class={"options"}
              value={"Monthly"}
              calender={true}
              imguri={Images.dropdownarrow}
              onChange={(data) => { FilterRange(data) }}
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
        <div className="legend-container">
          <div className="legend-holder">
            <Legend legend="Top" data={[{ label: "Luigi Server Issue" }, { label: "Presto Issue" }, { label: "Vendor Issue" }, { label: "Technical Issue (Dev-Ops)" }, { label: "Bug" }, { label: "Unfulfilled Dependency" }, { label: "Technical Issue (not Dev-Ops)" }, { label: "Other" }]} color={["#fc302e", "#fd5d5d", "#87133a", "#d00148", "#44020e", "#c38d97", "#b9597a", "#ffdee4"]} wrap={true} />
          </div>
          <div className="control">
            <div className="centeralign"><div className="exportbtn" onClick={exportClick}>Export Data</div></div>
          </div>
        </div>
        {trend.isLoading ?
          <Loader />
          : <BarChart data={data} colors={Failurecolors} setChart={(e)=>setChart(e)}/>}
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
                  filename:     'Failure.pdf',
                  image:        { type: 'jpeg', quality: 0.98 },
                  html2canvas:  { scale:2 },
                  jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait',putOnlyUsedFonts:true, }
                };
                html2pdf().set(opt).from(element).save();
              }}/>
        </div>
      
          <PDF headers={["name","Luigi Server Issue","Presto Issue","Vendor Issue", "Technical Issue (Dev-Ops)" , "Bug" , "Unfulfilled Dependency","Technical Issue (not Dev-Ops)","Other"]} data={data}>
          </PDF>
      
      </Modal>
    </Layout>
  );
};

export default connect(
  null, { FailureRecords }
)(FailureTrend);
