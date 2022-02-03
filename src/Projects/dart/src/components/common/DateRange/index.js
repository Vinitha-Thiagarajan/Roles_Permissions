import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "../../../resources/images/datecalendar.svg";
import DRArrow from "../../../resources/images/drarrow.svg";
import moment from "moment";
import useOnClickOutside from "../DropDown/OutClickhandler";

const CustomDateRange = (props) => {
  const ref = useRef();
  const [rangedd, setRangeDD] = useState(false);

  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  useOnClickOutside(ref, () => {
    setRangeDD(false);
  });
  const onCalendarClick = (type) => {
    if (type === "From") {
      setStart(true);
      setEnd(false);
    } else if (type === "Both") {
      setStart(true);
      setEnd(true);
    } else {
      setEnd(true);
      setStart(false);
    }
    setRangeDD(true);
  };
  useEffect(() => {
    if (props.startDate) {
      setStartDate(new Date(props.startDate));
    }
    if (props.endDate) {
      setEndDate(new Date(props.endDate));
    }
  }, [props.startDate, props.endDate]);
  const ChangeDates = (date, type) => {
    if (type === "From") {
      setStartDate(date);
      setEndDate("");
      setEnd(true);
      // if (endDate && endDate != null)
      //props.onChange({ start: date, end: "" })
    } else {
      setEndDate(date);
      props.onChange({ start: startDate, end: date });
      setEnd(false);
      setStart(false);
    }
  };
  return (
    <div className="range-container" ref={ref}>
      {rangedd && start ? (
        <div className="start-date">
          {" "}
          <DatePicker
            selected={startDate}
            onChange={(date) => ChangeDates(date, "From")}
            selectsStart
            inline
            startDate={startDate}
            endDate={endDate}
            maxDate={new Date()}
          />{" "}
        </div>
      ) : null}
      {rangedd && end ? (
        <div className="end-date">
          {" "}
          <DatePicker
            selected={endDate}
            onChange={(date) => ChangeDates(date, "End")}
            selectsEnd
            inline
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            maxDate={new Date()}
          />
        </div>
      ) : null}
      <div className="date-range">
        <div className="daterange">
          <div className="start" onClick={() => onCalendarClick("From")}>
            <span className="date">
              {startDate ? moment(startDate).format("MMM DD, YYYY") : ""}
            </span>
          </div>

          <img alt="" src={DRArrow} />

          <div className="end" onClick={() => onCalendarClick("To")}>
            <span className="date">
              {endDate ? moment(endDate).format("MMM DD, YYYY") : ""}
            </span>
          </div>
        </div>
        <div className="cal-icon" onClick={() => onCalendarClick("Both")}>
          <img alt="" src={Calendar} />
        </div>
      </div>
    </div>
  );
};

export default CustomDateRange;
