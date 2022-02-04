import React, { useState, Fragment, useEffect, useRef } from "react";
import "./DateRange.scss";
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useOnClickOutside from "../DropDown/OutClickhandler";
import FieldHolder from "../InputText/FieldHolder"
import Button from "../Button/Button";
import { Images } from "../../assets/images";


const CustomDateRanger = props => {
  const ref = useRef();
  const { resetDate, data } = props;
  let id = data.name;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date().setDate(new Date().getDate() + 1));
  const [show, setShow] = useState(false);
  const [start, setStart] = useState(true);
  const [end, setEnd] = useState(false);
  const [rangedd, setRangeDD] = useState(false);
  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    //props.onChange({start:start,end:end})
  };
  useOnClickOutside(ref, () => {
    setRangeDD(false);
  });
  const onCalendarClick = () => {
    setShow(true)
  }
  const ChangeDates = (date, type) => {
    if (type === "From") {
      setStartDate(date);
      //if(endDate && endDate != null)
      //props.onChange({start:date,end:endDate})
    }
    else {
      setEndDate(date);
      //props.onChange({start:startDate,end:date})
    }
  }
  useEffect(() => {
    if (resetDate) {
      setStartDate(new Date());
      setEndDate(null);
    }
  }, [resetDate])
  return (
    <>
      {data.label && <label for={id} className="textInput__label">
        {data.label}
      </label>}
      {!props.range? <Fragment>
       
        <div onClick={() => onCalendarClick()}>
          <input type="hidden" name={id + "_date"} value={startDate} />
          <Button
            class={"options logdate margintemp"}
            label={moment(startDate).format("MM/DD/YYYY")}
            rightimg={Images.calendardetails}
            onClick={() => { }}
          />
        </div>
        {show ? <div className="customdate"><DatePicker
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          onClickOutside={() => { setShow(false) }}
          inline
        /> </div>: null}
      </Fragment> :
      <div className="trange-container" ref={ref}>
        <div onClick={() => { setRangeDD(!rangedd) }}>
          {startDate && <Button
            class={"options logdate"}
            label={moment(startDate).format("MM/DD/YYYY") + "" + (endDate != null ? " - " + moment(endDate).format("MM/DD/YYYY") : "")}
            rightimg={Images.calendardetails}
            onClick={() => { }}
          />}
          <input type="hidden" name={id + "_startdate"} value={startDate} />
          <input type="hidden" name={id + "_enddate"} value={endDate} />
        </div>
        {rangedd ? <div className="rangepicker-container">
          <FieldHolder lable="From Date">

            <div className="date-holder"><input type="text" placeholder="MM/DD/YYYY" value={moment(startDate).format("MM/DD/YYYY")} onClick={() => { setEnd(false); setStart(true) }} /></div>
          </FieldHolder>
          <FieldHolder lable="End Date">
            <div className="date-holder"><input type="text" placeholder="MM/DD/YYYY" value={endDate && endDate != null ? moment(endDate).format("MM/DD/YYYY") : ""} onClick={() => { setStart(false); setEnd(true) }} /></div>

          </FieldHolder>
          {start ? <DatePicker
            selected={startDate}
            onChange={date => ChangeDates(date, "From")}
            selectsStart
            inline
            startDate={startDate}
            endDate={endDate}
          /> : null}
          {end ? <DatePicker
            selected={endDate}
            onChange={date => ChangeDates(date, "End")}
            selectsEnd
            inline
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          /> : null}
        </div> : null}
      </div>}
    </>
  );
};

export default CustomDateRanger;