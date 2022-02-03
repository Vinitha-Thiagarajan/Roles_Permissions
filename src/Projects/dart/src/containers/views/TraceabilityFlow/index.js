import React, { useState, useEffect } from "react";
import "./style.css";
import Touch from "../../../resources/images/touch.svg";

import FilterIcon from "../../../resources/images/filter.svg";
import Calendar from "../../../resources/images/Calendar.svg";

import Folder from "../../../resources/images/folder.svg";
import Accordian from "../../../resources/images/accordion.svg";
import DownArrow from "../../../resources/images/downArrow.svg";
import Summary from "../../../resources/images/summary.svg";
import Tracking from "../../../resources/images/tracking.svg";

import { CardHeader, DropDown, Button } from "../../../components/common";
import { ProgressBar } from "../../../components";
import moment from "moment";
import { useOktaAuth } from "@okta/okta-react";
import Main from "../../layouts/Main";
import TraceChart from "./TraceChart";

import { getTraceability } from "../../../../../../reducers/Traceability/traceability.actions";
import { useDispatch, useSelector } from "react-redux";
import { NumberFormatUS, objToArray, PercentageFormatUS } from "../../../utils";
import { useParams, useLocation, useHistory } from "react-router-dom";

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const history = useHistory();
  const dispatch = useDispatch();
  const traceability = useSelector((state) => state.traceability);
  const {
    allBrands,
    allMetrics,
    stages,
    traceabilityFlow,
    errors,
    loading,
    highlights,
    recentRunDate
  } = traceability;
  const { traceId } = useParams();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const [date, setDate] = useState(
    traceabilityFlow
      ?  traceabilityFlow?.recentRunDate
      : moment().format("YYYY-MM-DD")
  );
  const [metrics, setMetrics] = useState([]);
  const [brands, setBrands] = useState([]);

  const [touchPoints, setTouchPoints] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(
    urlParams.get("brand") ? urlParams.get("brand") : null
  );
  const [selectedMetric, setSelectedMetric] = useState(
    urlParams.get("metric") ? urlParams.get("metric") : null
  );
  const [touchPointsFCol, setTouchPointsFCol] = useState([]);
  const [touchPointsSCol, setTouchPointsSCol] = useState([]);
  const [breakdown, setBreakDown] = useState([]);
  const [colors, setColors] = useState([
    "#A7226E",
    "#EC2049",
    "#F26B38",
    "#F7DB4F",
    "#2F9599",
    "#FE4365",
    "#FC9D9A",
    "#F9CDAD",
    "#C8C8A9",
    "#83AF9B",
  ]);
  const [summaryAccShow, setSummaryAccShow] = useState(false);

  useEffect(() => {}, [authState, oktaAuth]);

  useEffect(() => {
    if (traceabilityFlow) {
      if (allMetrics) {
        let metrics = allMetrics.map((metric, i) => {
          let temp = {};
          temp.label = metric;
          temp.value = metric;
          return temp;
        });
        setMetrics(metrics);
      }

      if (allBrands) {
        let brands = allBrands.map((brand, i) => {
          let temp = {};
          temp.label = brand;
          temp.value = brand;
          return temp;
        });
        setBrands(brands);
      }
      if (stages) {
        let stageData = stages.map((stage, i) => {
          return stage.touchPoints;
        });
        setTouchPoints(Array.prototype.concat.apply([], stageData));
        let stageDataCol = Array.prototype.concat.apply([], stageData);
        let firstColData = stageDataCol.splice(
          0,
          Math.round(stageDataCol.length / 2)
        );
        let secondColData = stageDataCol;
        setTouchPointsFCol(firstColData);
        setTouchPointsSCol(secondColData);
      }

      if (traceabilityFlow.brand && traceabilityFlow.metric) {
        setSelectedBrand(traceabilityFlow.brand);
        setSelectedMetric(traceabilityFlow.metric);
      }
      if (
        traceabilityFlow.breakdown &&
        JSON.parse(traceabilityFlow.breakdown)
      ) {
        let dataHead = [["a", "b"]];
        let data = objToArray(JSON.parse(traceabilityFlow.breakdown));
        let concatData = dataHead.concat(data);
        setBreakDown(concatData);
      } else {
        setBreakDown([]);
      }
    }
  }, [traceability]);

  useEffect(() => {
    dispatch(
      getTraceability(
        traceId,
        date,
        selectedMetric,
        selectedBrand,
        authState?.accessToken
      )
    );
  }, []);
 useEffect(()=>{
  if(traceabilityFlow?.recentRunDate != ""){
    setDate(traceabilityFlow?.recentRunDate)
  }
 },[traceabilityFlow?.recentRunDate])

  let highlightsArray = highlights.split("\n").filter((e) => e !="");

  return (
    <Main>
      <div className="">
        <div className="section filter">
          <div className="row">
            <div className="col flitercontainer">
              <div className="filtericon">
                <img src={FilterIcon} alt="" />
              </div>
            </div>
            <div className="col filter-drop">
              <DropDown
                title="Metrics"
                value={selectedMetric}
                data={metrics}
                selected={false}
                onChangeData={(e) => {
                  urlParams.set("metric", e);
                  history.push({
                    search: "?" + urlParams.toString(),
                  });
                  dispatch(
                    getTraceability(
                      traceId,
                      date,
                      e,
                      selectedBrand,
                      authState?.accessToken
                    )
                  );
                }}
                placeholder="Select Metric"
              />
            </div>
            <div className="col filter-drop">
              <DropDown
                title="Brands"
                value={selectedBrand}
                data={brands}
                selected={false}
                onChangeData={(e) => {
                  urlParams.set("brand", e);
                  history.push({
                    search: "?" + urlParams.toString(),
                  });
                  dispatch(
                    getTraceability(
                      traceId,
                      date,
                      selectedMetric,
                      e,
                      authState?.accessToken
                    )
                  );
                }}
                placeholder="Select Brand"
              />
            </div>
            <div className="col filter-reset">
              <Button
                image
                title={"Reload"}
                style={{ backgroundColor: "#F17F21" }}
                onClick={() => {
                  dispatch(
                    getTraceability(
                      traceId,
                      date,
                      selectedMetric,
                      selectedBrand,
                      authState?.accessToken
                    )
                  );
                }}
              />
            </div>
            <div className="col filter-datepicker">
              {/* <DatePicker
                selected={date}
                onChange={(dateVal) => {
                  setDate(moment(dateVal).format("YYYY-MM-DD"));
                  urlParams.set("date", moment(dateVal).format("YYYY-MM-DD"));
                  history.push({
                    search: "?" + urlParams.toString(),
                  });

                  dispatch(
                    getTraceability(
                      traceId,
                      moment(dateVal).format("YYYY-MM-DD"),
                      selectedMetric,
                      selectedBrand,
                      authState?.accessToken
                    )
                  );
                }}
              >
                <div className="date-container">
                  <span className="datetext">{date}</span>
                  <img className="dateimage" src={Calendar} />
                </div>
              </DatePicker> */}
              <div className="date-container">
                <span className="datetext">{date}</span>
                <img className="dateimage" src={Calendar} alt="" />
              </div>
            </div>
          </div>
        </div>
        {!errors && !loading && stages.length ? (
          <>
            <div className="section stage-section">
              <div className="row">
                {stages.map((stage, i) => {
                  return (
                    <div className="col" key={i}>
                      <div className="card-box">
                        <div className="card-box-left">
                          <div className="card-data">
                            <h5>{stage.stage}</h5>
                            <p>Stages</p>
                          </div>
                        </div>
                        <div className="card-box-right">
                          <div className="card-icon">
                            <img src={Touch} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="section">
              <div className="row">
                <div className="col">
                  <CardHeader
                    name={"Touchpoints"}
                    iconColor={"#E0E3FA"}
                    icon={Touch}
                  />
                  <div className="section-content">
                    <ProgressBar data={touchPoints} />
                  </div>
                </div>
              </div>
            </div>

            {highlightsArray && highlightsArray.length && <div className="section">
              <div className="row">
                <div className="col">
                  <CardHeader
                    name={"Highlights"}
                    iconColor={"#E0E3FA"}
                    icon={Touch}
                  />
                  <div className="section-content">
                    <ul className="highlights">
                      {highlightsArray.map((highlight, i) => {
                        if (highlight) {
                          return (
                            <li key={i}>
                              <p>{highlight}</p>
                            </li>
                          );
                        } else return "";
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div> || ""}

            <div className="section">
              <div className="row">
                <div className="col">
                  <CardHeader
                    name={"Tracking"}
                    iconColor={"#FAE7CE"}
                    icon={Tracking}
                  />
                  <div className="section-content">
                    <div className="tracking-content">
                      <div className="row">
                        <div className="col">
                          {touchPointsFCol.map((item, i) => {
                            return (
                              <div className="tracking-box" key={i}>
                                <div className="tracking-box-sno">
                                  <p>{item.step}</p>
                                </div>
                                <div className="tracking-box-data">
                                  <p>
                                    {item.touchPoint}:{" "}
                                    <span>
                                      {NumberFormatUS(item.metricCount)}
                                    </span>
                                  </p>
                                </div>
                                <div className="tracking-box-icon">
                                  <p>
                                    <img src={DownArrow} alt="" />
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className="col">
                          {touchPointsSCol.map((item, i) => {
                            return (
                              <div className="tracking-box" key={i}>
                                <div className="tracking-box-sno">
                                  <p>{item.step}</p>
                                </div>
                                <div className="tracking-box-data">
                                  <p>
                                    {item.touchPoint}:{" "}
                                    <span>
                                      {NumberFormatUS(item.metricCount)}
                                    </span>
                                  </p>
                                </div>
                                <div className="tracking-box-icon">
                                  <p>
                                    <img src={DownArrow} alt="" />
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="section">
              <div className="row">
                <div className="col">
                  <CardHeader
                    name={"Summary"}
                    iconColor={"#FBF5F5"}
                    icon={Summary}
                  />
                  <div className="section-content">
                    <div className="summary-action">
                      <div className="summary-action-left">
                        <p>
                          <img alt="" src={Folder} /> Trace Id{" : "}
                          <span>{traceId}</span>
                        </p>
                        <p className="seperator">|</p>
                        <p>
                          Variance Count
                          {" : "}
                          <span>
                            {NumberFormatUS(
                              traceabilityFlow.varianceCount
                                ? traceabilityFlow.varianceCount
                                : 0
                            )}
                          </span>
                        </p>
                        <p className="seperator">|</p>
                        <p>
                          Variance Percentage{" : "}
                          <span>
                            {PercentageFormatUS(
                              traceabilityFlow.variancePercentage
                            )}
                          </span>
                        </p>
                        <p className="seperator">|</p>
                        <p>
                          Status{" : "}
                          <span
                            className={
                              traceabilityFlow.status
                                ? traceabilityFlow.status.toLowerCase() ==
                                  "failed"
                                  ? "failedText"
                                  : "successText"
                                : ""
                            }
                          >
                            {traceabilityFlow.status}
                          </span>
                        </p>
                      </div>
                      <div className="summary-action-right">
                        <span
                          onClick={() => {
                            setSummaryAccShow(!summaryAccShow);
                          }}
                        >
                          <img
                            className={!summaryAccShow ? "active" : ""}
                            alt=""
                            src={Accordian}
                          />
                        </span>
                      </div>
                    </div>

                    <div
                      className={
                        summaryAccShow
                          ? "section-accordian active"
                          : "section-accordian"
                      }
                    >
                      <div className="section-accordian-chart">
                        {summaryAccShow && (
                          <TraceChart data={breakdown} colors={colors} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        {!errors && !loading && !stages.length ? (
          <p className={"error"}>No Data Found!</p>
        ) : (
          ""
        )}
        {loading && <div className="loader">Loading...</div>}
        {!loading && errors && <p className={"error"}>{errors}</p>}
      </div>
    </Main>
  );
};

export default Home;
