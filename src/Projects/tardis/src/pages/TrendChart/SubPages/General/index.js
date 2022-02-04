import React, { useState, useEffect, useCallback } from "react";
import "./GeneralTrend.scss";
import { TitleContainer, BarChart, DropDown, DatePicker, Button, Swapper, Legend, Loader, PDF } from "../../../../components";
import { Images } from "../../../../assets/images";
import { useHistory } from "react-router-dom";
import Layout from '../../../../Layout';
import { connect, useSelector } from "react-redux";
import { GeneralRecords, SourceList } from "../../../../../../../reducers/trendchart/actions"
import { CombineRecords, TrendDataLoad, Generalcolors } from "../Common"
import html2pdf from "html2pdf.js"
import Modal from "react-modal";
import { getPngData } from "recharts-to-png";
import { customExportStyles } from "../../../../assets/constant";

const GeneralTrend = (props) => {
  const trend = useSelector(state => state.trend);
  const [data, setData] = useState([]);
  const [startDate, SetStart] = useState(new Date());
  const [endDate, SetEnd] = useState(null);
  const [sort, SetSort] = useState("By Source");
  const [range, SetRange] = useState("");
  const [reset, SetReset] = useState(false);
  const [selectionlist, SetSelection] = useState([]);
  const [sourcelist, SetSource] = useState([]);
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
  let history = useHistory();
  const onBackHandler = () => {
    history.push("/tardis/trend-chart");
  };
  useEffect(() => {
    props.SourceList();
    let request = TrendDataLoad([], "Weekly");
    props.GeneralRecords(request)
  }, [])
  useEffect(() => {
    if (trend.general) {
      Filter(sort);
    }
  }, [trend.general])
  const Filter = (sort) => {
    let res = {};
    if (sort === "By Source") {
      res = CombineRecords(trend.general, "source");
    }
    else {
      res = CombineRecords(trend.general, "logdate");
    }
    var status = [];
    for (var x of Object.keys(res)) {

      var resval = CombineRecords(res[x], "status");
      let result = {
        "name": x,
        "Delay": resval["Delayed"] ? resval["Delayed"] : 0,
        "Failure": resval["Failed"] ? resval["Failed"] : 0,
        "Success": resval["Complete"] ? resval["Complete"] : 0
      }
      status.push(result);
    }
    status = status.reverse()
    setData(status);
  }
  useEffect(() => {
    if (trend.sourceList) {
      let sourceList = [], unique = [];
      trend.sourceList.forEach((e) => {
        if (unique.indexOf(e.source) === -1) {
          sourceList.push(e)
          unique.push(e.source);
        }
      })
      SetSource(sourceList)
    }
  }, [trend.sourceList])

  const startdate = (e) => {
    SetStart(e);
  }
  const enddate = (e) => {
    SetEnd(e);
  }
  const Sort = (e) => {
    SetSort(e)
    Filter(e);
  }
  const onFliter = () => {
    if (startDate != null && endDate != null) {
      let request = TrendDataLoad(selectionlist, false, startDate, endDate);
      props.GeneralRecords(request)
    }

  }
  const onFilterChange = (list) => {

    let result = [];
    for (let x in list) {
      result.push(list[x]["source"])
    }
    SetSelection(result);
    if (startDate != null && endDate != null) {
      let request = TrendDataLoad(result, false, startDate, endDate);
      props.GeneralRecords(request)
    }
    else {
      let request = TrendDataLoad(result, range);
      props.GeneralRecords(request)
    }
  }
  const FilterRange = (range) => {
    SetRange(range);
    SetReset(true);
    SetStart(null);
    SetEnd(null);
    setTimeout(() => { SetReset(false); }, 500)
    let request = TrendDataLoad(selectionlist, range);
    props.GeneralRecords(request)
  }
  const exportClick = () => {
    if (!trend.isLoading) {
      openModal();
      setTimeout(()=>{
        handleDownload();
      }) 
      
    }
  }
  return (
    <Layout>
      <div className="Generalpage page">
        <TitleContainer
          name="General Status Trend Chart"
          img={Images.Chart}
          onBack={() => {
            onBackHandler();
          }}
        >
          <div className="centeralign filter-container">
            <Swapper options={["Trends"]} leftimg={Images.sort} page="general" class={"TrendDp"} />
            <DropDown
              id={"sourcedd"}
              class={"options searchop"}
              label={"Source"}
              search={true}
              multi={true}
              displaynode={"source"}
              reset={false}
              onClick={() => { }}
              imguri={Images.dropdownarrow}
              onFilterselect={(list) => { onFilterChange(list) }}
              options={sourcelist}
            />
            <DropDown id={"timeframedd"}
              class={"options"}
              value={"Weekly"}
              calender={true}
              imguri={Images.dropdownarrow}
              onChange={(data) => { FilterRange(data) }}
              options={["Weekly", "Monthly", "Yearly"]} />

            <Swapper options={["By Source", "By Date"]} leftimg={Images.sort} onClick={(e) => { Sort(e) }} />
          </div>
        </TitleContainer>
        <div className="legend-container">
          <div className="legend-holder">
            <Legend legend="Top" data={[{ label: "Success" }, { label: "Failure" }, { label: "Delay" }]} color={["#35b27d", "#f53c56", "#ff9f00"]} />
          </div>
          <div className="control">
            <div className="date-holder"><DatePicker name={`fromdate`} placeholder="From Date" className="filter-date" handleDate={(e) => { startdate(e) }} reset={reset} /></div>
            <div className="date-holder"><DatePicker name={`todate`} placeholder="To Date" className="filter-date" minDate={startDate} handleDate={(e) => { enddate(e) }} reset={reset} /></div>
            <Button
              class="submitbtn"
              label="Submit"
              onClick={() => {
                onFliter()
              }}
            />
            <div className="centeralign"><div className="exportbtn" onClick={() => { exportClick() }}>Export Data</div></div>

          </div>
        </div>

        {trend.isLoading ?
          <Loader /> :
          data.length > 0 ?
            <BarChart data={data} colors={Generalcolors} general={true} lable={sort} setChart={(e) => setChart(e)} /> :
            <div className="nosource">No Data Found!!</div>}
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
                margin: 1,
                filename: 'GeneralTrend.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait', putOnlyUsedFonts: true, }
              };
              html2pdf().set(opt).from(element).save();
            }} />
        </div>

        <PDF headers={["name", "Delay", "Failure", "Success"]} data={data} >
        </PDF>

      </Modal>
    </Layout>
  );
};

export default connect(
  null, { GeneralRecords, SourceList }
)(GeneralTrend);