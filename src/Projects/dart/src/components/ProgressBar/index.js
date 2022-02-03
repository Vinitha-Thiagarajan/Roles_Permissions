import React from "react";
import "./style.css";
import { NumberFormatUS } from "../../utils";
const Progress = ({ data }) => {
  return (
    <ol className="progressbar progressbar--medium">
      {data.map((item, i) => {
        let classVal = "";
        if (i === data.length - 1) {
          classVal = "progressbar__last";
        }
        return (
          <li key={i} data-step={item.step} className={classVal}>
            <span className="progressbar-text">{item.touchPoint}</span>
            <span className="progressbar-val">
              {" "}
              {NumberFormatUS(item.metricCount)}
            </span>
          </li>
        );
      })}
    </ol>
  );
};
export default Progress;
