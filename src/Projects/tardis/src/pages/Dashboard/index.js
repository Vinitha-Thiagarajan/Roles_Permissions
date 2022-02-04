import React, { useEffect, useState } from "react";
import TitleContainer from "./Components/TitleContainer";
import StatusTable from './Components/StatusTable'
import "./Dashboard.scss"
import moment from "moment";
import { connect, useSelector } from "react-redux";
import { PipelineRecords, UpdateFilterPagination, SourceDashRecords } from "../../../../../reducers/dashboard/actions"
import { Loader } from "../../components"
import { Filter, DateRangeControl, PageController } from "./Components/Controller"
import Layout from '../../Layout';
import { fetch } from "../../utils";
import query from '../../assets/constant/query'
import { useHistory } from "react-router-dom";

const Dashboard = ({ SourceDashRecords, PipelineRecords, UpdateFilterPagination, location }) => {
  const dashboard = useSelector(state => state.dashboard);
  const { isLoading } = dashboard;
  
  let history = useHistory();
  const detailback = history.location.state;
  useEffect(() => {
    if(!detailback)
    intialLoad();
  }, [])
  const fetchData = async(size)=>{
    let response = await fetch(query.getCustomDash());
    if (response.status === 200) {
      let data = response.data.data.customDashboard.filter((e)=>{return e.isActive})[0];
      
      let startdate = moment().subtract(14,"days");
      let enddate = moment();
      if(data){
        if(data.logdateWindow === "Daily")
        {
          startdate = moment();
          enddate = moment();
        }
        else if(data.logdateWindow === "Daily + previous day")
        {
          startdate = moment().subtract(1,"days");
          enddate = moment();
        }
        else if(data.logdateWindow === "Weekly")
        {
          startdate = moment().subtract(7,"days");
        }
        else if(data.logdateWindow === "Monthly")
        {
          startdate = moment().subtract(30,"days");
        }
      }
      
      let source = data? data.sources.map((e)=>e.source) : dashboard.fullSourceList ? dashboard.fullSourceList.slice(0, size ? size :dashboard.size).map((e)=>e.source) :[];
      source = source ?source:[];
      let request={
        startLogdate:moment(startdate).format("YYYY-MM-DD"),
        endLogdate:moment(enddate).format("YYYY-MM-DD"),
        sourceName:JSON.stringify(source)
      }
      PipelineRecords(request)
      let filterstartdate = new Date(request.startLogdate)
      let endcount = moment(request.endLogdate).diff(filterstartdate, 'days') === NaN ? 0 : moment(request.endLogdate).diff(filterstartdate, 'days');
      let filterdata = {
        startdate: filterstartdate,
        endcount: endcount,
        page: 1,
        dateFilter: false,
        filterSource: false,
        size: size? size :dashboard.size
      }
      UpdateFilterPagination(filterdata)
    }
    
  }
  const intialLoad =()=>{
    SourceDashRecords();
   
  }
  useEffect(()=>{
    if(dashboard.fullSourceList && dashboard.fullSourceList.length > 0){
      console.log(dashboard.fullSourceList)
    fetchData();
    }
  },[dashboard.fullSourceList])
  const onLoadRecords = (filter) => {
    let { filterdata, request } = Filter(dashboard, filter)
    if (filter.dateFilter != undefined && !filter.dateFilter)
      fetchData();
    else {
      if ((filterdata.filterSource && filterdata.filterSource.length > 0 )&& !dashboard.dateFilter) {
        UpdateFilterPagination(filterdata)
        PipelineRecords(request)
      }
      else {
        if(!filterdata.filterSource)
        {
          fetchData(filterdata.size)
        }
        else{
        // let record = { ...dashboard, ...filterdata }
        // let response = PageController(record,true)
        // UpdateFilterPagination(response)
          UpdateFilterPagination(filterdata)
          PipelineRecords(request)
        }
      }
    }
  }
  const DateRange = (e) => {
    let { filterdata, request } = DateRangeControl(e,dashboard)
    UpdateFilterPagination(filterdata)
    PipelineRecords(request)
  }
  return (
    <Layout>
      <div className="Dashboradpage page" >
        <TitleContainer
          name={"Tardis Dashboard"}
          LoadRecords={(e) => { onLoadRecords(e) }}
          DateRange={(e) => { DateRange(e) }}
        />
        {isLoading ? <Loader /> :
          <StatusTable dataSource={dashboard} LoadRecords={(e) => { onLoadRecords(e) }} />
        }
      </div>
    </Layout>
  );
};

export default connect(
  null, { SourceDashRecords, PipelineRecords, UpdateFilterPagination }
)(Dashboard);
