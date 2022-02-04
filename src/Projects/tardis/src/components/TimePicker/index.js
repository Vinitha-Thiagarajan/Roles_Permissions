import React, { useState, useEffect } from "react";
import "./TimePicker.scss";
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'

const CustomTimePicker = props => {
  const [time, setTime] = useState(null);
  useEffect(()=>{
    if(props.time)
    {
      let today = moment().format("YYYY-MM-DD")
      today = today+ " "+props.time;
      today = moment(today);
      setTime(today)
    }
  },[props])
  return (
    <TimePicker
    showSecond={true}
    defaultValue={moment()}
    name={props.name}
    id={props.name}
    disabled={props.disabled}
    value={time}
    className={`CustomTimePicker ${props.className?props.className:"" }`}
    onChange={time => setTime(time)}
    inputIcon={<FontAwesomeIcon icon={faClock} color={"#3976eb"} size="lg" />}
  />
   
  );
};

export default CustomTimePicker;
