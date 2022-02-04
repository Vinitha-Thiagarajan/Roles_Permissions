import React, { useState, Fragment, useEffect, useRef } from "react";
import "./InputText.scss";
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useOnClickOutside from "../DropDown/OutClickhandler";
import FieldHolder from "./FieldHolder"

const CustomDateRanger = props => {
    const ref = useRef();
    const {resetDate} =props;
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [show, setShow] = useState(false);
    const [start, setStart] = useState(true);
    const [end, setEnd] = useState(false);
    const [rangedd, setRangeDD] = useState(false);
    const onChange = dates => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
      props.onChange({start:start,end:end})
    };
    useOnClickOutside(ref, () => {
      setRangeDD(false);
    });
    const onCalendarClick = () => {
      setShow(true)
    }
    const ChangeDates = (date,type) =>{
      if(type=== "From")
      {
        setStartDate(date);
        if(endDate && endDate != null)
        props.onChange({start:date,end:endDate})
      }
      else{
        setEndDate(date);
        props.onChange({start:startDate,end:date})
      }
    }
    useEffect(()=>{
      if(resetDate)
      {
        setStartDate(new Date());
        setEndDate(null);
      }
    },[resetDate])
    return (
      !props.range? <Fragment>
      {show?<DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        onClickOutside={()=>{setShow(false)}}
        inline
      />:null}
      <div onClick={()=>onCalendarClick()}>{props.children}</div>
      </Fragment> :
      <div className="range-container" ref={ref}>
      <div onClick={()=>{setRangeDD(!rangedd)}}>{props.children}</div> 
      {rangedd?<div className="rangepicker-container">
        <FieldHolder lable="From Date">

       <div className="date-holder"><input type="text" placeholder="MM/DD/YYYY" value={moment(startDate).format("MM/DD/YYYY")} onClick={()=>{setEnd(false);setStart(true)}} /></div>
       </FieldHolder>
       <FieldHolder lable="End Date">
       <div className="date-holder"><input type="text" placeholder="MM/DD/YYYY" value={endDate && endDate != null ?moment(endDate).format("MM/DD/YYYY"):""} onClick={()=>{setStart(false);setEnd(true)}} /></div>

       </FieldHolder>
       {start?<DatePicker
        selected={startDate}
        onChange={date => ChangeDates(date,"From")}
        selectsStart
        inline
        startDate={startDate}
        endDate={endDate}
      />:null}
      {end?<DatePicker
        selected={endDate}
        onChange={date => ChangeDates(date,"End")}
        selectsEnd
        inline
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />:null}
      </div>:null}
      </div>
    );
};

export default CustomDateRanger;
