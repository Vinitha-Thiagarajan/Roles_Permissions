import React, { useState, useEffect } from "react";
import "./InputText.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = props => {
  const [startDate, SetDate] = useState(null);
  const handleChange = date => {
    SetDate(date)
    props.handleDate && props.handleDate(date);
  };
  useEffect(()=>{
    if(props.reset){
      SetDate(null)
    }
  },[props.reset])
  return (
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        name={props.name} 
        autoComplete="off"
        className={props.className&&props.className}
        placeholderText={props.placeholder?props.placeholder:""}
        customInput={props.customDesign ? props.customDesign : null}
        id={props.name} 
        minDate={props.minDate?props.minDate:false}

      />
  );
};

export default CustomDatePicker;
