import React, { Fragment, useEffect, useState } from "react";
import "./style.scss";
import moment from "moment";
import CircleTick from "../../../resources/images/CircleTick.svg";
import CircleClose from "../../../resources/images/CircleClose.svg";
import CircleDelay from "../../../resources/images/CircleDelay.svg";
import Pagination from "./pagination";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function comp(a, b) {
  return new Date(b.runTime).getTime() - new Date(a.runTime).getTime();
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 5,
    padding: theme.spacing(2, 4, 3),
  },
  paper2: {
    position: "absolute",
    width: 700,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 5,
    padding: theme.spacing(2, 4, 3),
  },
}));
const StatusTable = (props) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [dataview, setDataview] = useState(false);
  const [title, setTitle] = useState("");
  const [dates, setDates] = useState([]);
  const [openselection, setOpenselection] = useState(false);
  const [selectTrace , setselectTrace] = useState("")
  const handleOpen = (item, title) => {
    setOpen(true);
    setDataview(item);
    setTitle(title);
  };

  const handleClose = () => {
    setOpen(false);
    setDataview(false);
    setTitle("");
  };
  const handleOpenSelection = (item, title) => {
    setOpenselection(true);
    setDataview(item);
    setTitle(title);
  };
  
   const handleCloseSelection = () => {
    setOpenselection(false);
  };
  const dataReset = () => {};
  const body = (
    <div style={modalStyle} className={classes.paper2}>
      <h2 id="simple-modal-title" style={{ marginBottom: 20 }}>
        {title}
      </h2>
      {dataview &&
        dataview.map((t, i) => {
          return (
            <div className="traceholder" key={i}>
             
                <div
                  style={
                    t.status === "Success"
                      ? { backgroundColor: "#0c8559" }
                      : t.status === "Failed"
                      ? { backgroundColor: "#f6726e" }
                      : {}
                  }
                  className="tracedetail"
                >
                  <span>{t.traceId}</span>
                  <span>{t.runTime}</span>
                   <div className="tracenewholder">
                <Link
                to={"/dart/traceability_flow/" + t.traceId}
                onClick={() => {
                  dataReset();
                }}
              ><div className="buttontrace" style={{marginRight:20}}><span>Traceability Flows</span></div></Link>
                <Link
                to={"/dart/traceability_charts/" + t.traceId}
                onClick={() => {
                  dataReset();
                }}
              ><div className="buttontrace"><span>Traceability Charts</span></div></Link>
              </div>
                </div>
               
            </div>
          );
        })}
    </div>
  );
  const bodySelection = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title" style={{ marginBottom: 20 }}>
        {title}
      </h2>
      {dataview && <div className="tracenewholder">
          <Link
          to={"/dart/traceability_flow/" + dataview[0].traceId}
          onClick={() => {
            dataReset();
          }}
        ><div className="buttontrace" ><span>Traceability Flows</span></div></Link>
        <Link
          to={"/dart/traceability_charts/" + dataview[0].traceId}
          onClick={() => {
            dataReset();
          }}
        ><div className="buttontrace"><span>Traceability Charts</span></div></Link>
      </div>}
    </div>
  );
  const { fulldata } = props;

  const getDates = (startDate, stopDate) => {
    var dateArray = [];
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format("MMM DD"));
      currentDate = currentDate.add(1, "days");
    }
    return dateArray;
  };
  const checkDates = (header, item) => {
    return header === moment(item).format("MMM DD");
  };

  useEffect(() => {
    let datesData = props.data.startDate
      ? getDates(moment(props.data.startDate), moment(props.data.endDate))
      : [];

    if (props.dateSort == "ASC") {
      datesData = datesData.sort(function (a, b) {
        return new Date(a) - new Date(b);
      });
      setDates(datesData);
    } else {
      datesData = datesData.sort(function (a, b) {
        return new Date(b) - new Date(a);
      });
      setDates(datesData);
    }
  }, [props.data, props.dateSort]);

  return props.data && props.data.pipeline.length > 0 ? (
    <Fragment>
      <div className="table-container">
        <div className="leftheader">
          <div className="space"></div>
          {props.data.pipeline &&
            props.data.pipeline.map((e, i) => {
              return (
                <div className="headerleft" key={`leftheader-${i}`}>
                  {e.name}
                </div>
              );
            })}
        </div>
        <section className="tablescroll">
          <div className="table">
            <div className="header">
              {props.data.pipeline.length > 0 &&
                dates &&
                dates.map((e, i) => {
                  return (
                    <div key={`header-${i}`} className="dataholder">
                      <div className="date">
                        {e}
                        {dates.length - 1 === i ? null : (
                          <div className="line" />
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="containerstatus">
              <div className="content">
                {props.data.pipeline &&
                  props.data.pipeline.map((e, i) => {
                    return (
                      <div
                        key={`statusrow-${i}`}
                        className={`statusrow ${
                          e.data.length === 0 ? "emptyrow" : ""
                        }`}
                      >
                        {dates &&
                          dates.map((f, j) => {
                            let matchedrec = e.data.filter((r) => {
                              return checkDates(f, r.date);
                            });
                            let count = matchedrec.length;
                            matchedrec = matchedrec.sort(comp);
                            let orignal = matchedrec;

                            matchedrec =
                              matchedrec.length > 0 ? matchedrec[0] : false;
                            if (!matchedrec)
                              return (
                                <div key={j} className={`emptycol`}>
                                  <div className="na">
                                    <span>NA</span>
                                  </div>
                                </div>
                              );
                            let status = matchedrec.status;
                            return (
                              <div
                                key={j}
                                className={`status ${
                                  e.data.length - 1 === j ? "" : "rightspace"
                                }`}
                              >
                                {count === 1 ? (
                                  <div
                                    onClick={() => {
                                      handleOpenSelection(orignal, e.name);
                                    }}>
                                    <img
                                      alt=""
                                      //className={e.data.length>1 ? (status === "Success" ? "complete" : status === "Failed" ? "failed" : "delay") : ""}
                                      src={
                                        status === "Success"
                                          ? CircleTick
                                          : status === "Failed"
                                          ? CircleClose
                                          : CircleDelay
                                      }
                                    />
                                  </div>
                                ) : (
                                  <div
                                    onClick={() => {
                                      handleOpen(orignal, e.name);
                                    }}
                                    className={
                                      (status === "Success"
                                        ? "complete"
                                        : status === "Failed"
                                        ? "failed"
                                        : "delay") + " count"
                                    }
                                  >
                                    <span>{count}</span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Pagination
        dataSource={props.fulldata}
        total={true}
        LoadRecord={(data) => {
          props.LoadRecord(data);
        }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <Modal
        open={openselection}
        onClose={handleCloseSelection}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {bodySelection}
      </Modal>
    </Fragment>
  ) : (
    <div className="emptytable">No Data found!!</div>
  );
};

export default StatusTable;
