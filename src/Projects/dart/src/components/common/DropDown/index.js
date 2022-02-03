import React, { Fragment, useState, useRef, useEffect } from "react";
import "./style.scss";
import Tick from "../../../resources/images/tick.svg";
import DropArrow from "../../../resources/images/droparrow.svg";
import useOnClickOutside from "./OutClickhandler";

const DropDown = ({
  title,
  placeholder,
  data,
  onChangeData,
  value,
  sort,
  sortVal,
}) => {
  const ref = useRef();

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const onDropdown = (e) => {
    setOpen(!isOpen);
  };
  useEffect(() => {
    //if (value) {
      setSelected(value);
    //}
  }, [value]);
  const Click = (item) => {
    setSelected(item.label);
    onChangeData(item.value);
    setOpen(false);
  };
  useOnClickOutside(ref, () => {
    setOpen(false);
  });
  return (
    <div className="drop-down-holder" ref={ref}>
      <Fragment>
        <div className="drop-title">{title}</div>
        <div className="drop-down-textbox" onClick={(e) => onDropdown(e)}>
          <span className={selected ? "drop-select-value" : "drop-placeholder"}>
            {sort
              ? selected
                ? sortVal + selected
                : placeholder
              : selected
              ? selected
              : placeholder}
          </span>
          <div className="drop-icons">
            {selected ? (
              <div className="drop-selection">
                <img alt="" className="tickgreen" src={Tick} />
              </div>
            ) : null}
            <img alt="" className="dropimg" src={DropArrow} />
          </div>
        </div>
        {data && data.length > 0 && isOpen && (
          <div className="dropdownlist">
            {" "}
            <div className="triangle"></div>
            {data.map((item, index) => {
              return (
                <div
                  className={
                    selected === item.label ? "dropdownli active" : "dropdownli"
                  }
                  key={`dropdown-${index}`}
                  onClick={() => {
                    Click(item);
                  }}
                >
                  <span className="dropdowntxt">{item.label}</span>
                  <img alt="" className="dropselected" src={Tick} />
                </div>
              );
            })}
          </div>
        )}
      </Fragment>
    </div>
  );
};

export default DropDown;
