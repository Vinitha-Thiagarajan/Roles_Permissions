import React, { useState, useEffect } from "react";
import "./style.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = (props) => {
    const [show, setShow] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

  const onCalendarClick = () => {
    setShow(true)
  }
  const onChange = date => {
    setStartDate(date);
    props.onChange(date)
  };
  useEffect(()=>{
    if(props.selected){
      setStartDate(new Date(props.selected))
    }
  },[props.selected])
  return (
    <div className={props.containerstyle}>
    {show?<DatePicker 
      onChange={(e)=>{onChange(e);setTimeout(()=>{setShow(false)})}}
      selected={startDate}
      onClickOutside={()=>{setShow(false)}}
      inline
    />:null}
    <div onClick={()=>onCalendarClick()}>{props.children}</div>
    </div>
  );
};

export default CustomDatePicker;