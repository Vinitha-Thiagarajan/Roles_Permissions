import React from "react";
import { Chart } from "react-google-charts";
import { NumberFormatUS } from "../../../utils";

const TraceChart = ({ data, colors }) => {
  let dataFormatted = data;
  let chartRender,
    negativeValues = false;
  data.map((item, i) => {
    if (item[1] > 0) {
      chartRender = true;
    }
    if (item[1] < 0) {
      negativeValues = true;
    }
  });
  // let dataFormatted = dataChecker.map((item, i) => {
  //   item[1] = item[1] < 1 ? 0 : item[1];
  //   return item;
  // });
  // console.log(data);

  return (
    <div className="chartBox">
      {chartRender ? (
        <>
          <div className="charts">
            <Chart
              height={"500px"}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={dataFormatted}
              options={{
                chartArea: { width: "100%" },
                is3D: true,
                legend: "none",
                colors: colors,
                animation: {
                  startup: true,
                  easing: "linear",
                  duration: 1500,
                },
              }}
            />
          </div>
          <div className="legends">
            <ul>
              {dataFormatted.map((item, i) => {
                return i ? (
                  <li key={i}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="9" cy="9" r="9" fill={colors[i - 1]} />
                      <circle
                        r="6"
                        transform="matrix(-1 0 0 1 9 9)"
                        fill="white"
                      />
                    </svg>
                    {item[0]} {" [" + NumberFormatUS(item[1]) + "]"}
                  </li>
                ) : (
                  ""
                );
              })}
            </ul>
          </div>
        </>
      ) : negativeValues ? (
        <p className="text-center">Breakdown has negative values</p>
      ) : (
        <p className="text-center">No breakdown available</p>
      )}
    </div>
  );
};

export default TraceChart;
