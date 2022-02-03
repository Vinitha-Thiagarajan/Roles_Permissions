import React, { useState, useEffect, Fragment } from "react";
import "./style.scss";
import StatusTable from "./StatusTable.js";
import Main from "../../layouts/Main";
import SearchImg from "../../../resources/images/search.svg";
import moment from "moment";
import { Loader, DateRange, DropDown } from "../../../components/common";
import { useOktaAuth } from "@okta/okta-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDashboard,
  UpdateList,
  UpdateSearch,
} from "../../../../../../reducers/Overview/overview.actions";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useParams, useLocation, useHistory } from "react-router-dom";

const InputSearch = (props) => {
  const overview = useSelector((state) => state.overview);

  let data = overview.pipelineSet;

  const { Search, Clear, setValue, value } = props;
  const dispatch = useDispatch();

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      Search(value);
    }
  };

  const _onChange = (e) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    if (overview.search) {
      setValue(overview.search);
    }
  }, []);
  useEffect(() => {
    dispatch(UpdateSearch(value));
  }, [value]);

  return (
    <Fragment>
      <Autocomplete
        id="custom-input-demo"
        options={
          value != ""
            ? data
              .filter(
                (e) => e.toLowerCase().indexOf(value.toLowerCase()) > -1
              )
              .map((e) => e)
            : data.map((e) => e)
        }
        onChange={(event, value) => {
          setValue(value);
          Search(value);
        }}
        value={value}
        renderInput={(params) => (
          <div className="search" ref={params.InputProps.ref}>
            <div className="searchbtn">
              <input
                type="text"
                {...params.inputProps}
                value={value}
                placeholder="Search"
                onKeyDown={(e) => _handleKeyDown(e)}
                onChange={(e) => _onChange(e)}
              />
              <div
                className="searchicon"
                onClick={() => {
                  Search(value);
                }}
              >
                <img alt="" src={SearchImg} />
              </div>
              <div
                className="clearIcon"
                onClick={() => {
                  setValue("");
                  Clear();
                }}
              >
                x
              </div>
            </div>
          </div>
        )}
      />
    </Fragment>
  );
};
const Dashboard = () => {
  const history = useHistory();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const { authState } = useOktaAuth();
  const dispatch = useDispatch();
  const overview = useSelector((state) => state.overview);
  const [data, setData] = useState(false);
  const [initial, setIntial] = useState(true);
  const [sdate, setSDate] = useState(
    urlParams.get("sdate") ? urlParams.get("sdate") : false
  );
  const [edate, setEDate] = useState(
    urlParams.get("edate") ? urlParams.get("edate") : false
  );
  const [auto, setAuto] = useState([]);
  const [value, setValue] = useState("");
  const [dateSort, setDateSort] = useState(
    urlParams.get("sort") ? urlParams.get("sort") : "ASC"
  );

  useEffect(() => {
    if (Object.keys(overview.dashboard).length === 0) {
      dispatch(getDashboard(sdate, edate, 1, 10, "", authState?.accessToken));
      setIntial(false);
    }
  }, []);
  useEffect(() => {
    if (overview && !overview.errors) {
      // setAuto(overview.pipelineSet);
      try {
        if (Object.keys(overview.dashboard).length > 0)
          setData(overview.dashboard);
        if (Object.keys(overview.dashboard).length > 0) {
          if (overview.dashboard.results.length > 0) {
            let result = overview.dashboard.results[0];
            setSDate(result.startDate);
            setEDate(result.endDate);
            setIntial(true);
          }
          if (!initial) {
            dispatch(UpdateList(overview.dashboard.results[0].pipeline));
            //setAuto(overview.dashboard.results[0].pipeline);
            setTimeout(() => {
              try {
                document.getElementById("custom-input-demo").value = "";
              }
              catch (e) {

              }
            },500);
          } else {
            //setAuto(overview.pipeline);
          }
        }
      } catch (e) { }
    }
  }, [overview]);
  const LoadRecord = (data) => {
    let searchval = document.getElementById("custom-input-demo").value;
    dispatch(
      getDashboard(
        sdate,
        edate,
        data.page,
        data.size,
        searchval,
        authState?.accessToken
      )
    );
  };
  const FilterRecord = (data) => {
    let searchval = document.getElementById("custom-input-demo").value;
    let sdate = moment(data.start).format("YYYY-MM-DD");
    let edate = moment(data.end).format("YYYY-MM-DD");
    urlParams.set("sdate", sdate);
    urlParams.set("edate", edate);
    history.push({
      search: "?" + urlParams.toString(),
    });
    setSDate(sdate);
    setEDate(edate);

    dispatch(
      getDashboard(
        sdate,
        edate,
        1,
        overview.dashboard.size ? overview.dashboard.size : 10,
        searchval,
        authState?.accessToken
      )
    );
  };
  const Search = (val) => {
    let searchval = val;
    if (val.length < 1) return false;
    dispatch(
      getDashboard(
        sdate,
        edate,
        1,
        overview.dashboard.size ? overview.dashboard.size : 10,
        searchval,
        authState?.accessToken
      )
    );
  };
  const Clear = () => {
    let searchval = "";

    dispatch(
      getDashboard(
        sdate,
        edate,
        1,
        overview.dashboard.size ? overview.dashboard.size : 10,
        searchval,
        authState?.accessToken
      )
    );
  };

  return (
    <Main>
      <div className="">
        <div className="section dashboard">
          <div className="row">
            <div className="container-title">
              <div className="titleleft">
                {auto && !overview.loading ? (
                  <InputSearch
                    data={auto}
                    value={value}
                    setValue={setValue}
                    Search={Search}
                    Clear={Clear}
                  />
                ) : null}
                <>
                  <DateRange
                    startDate={
                      data && data.results[0].startDate
                        ? data.results[0].startDate
                        : false
                    }
                    endDate={
                      data && data.results[0].endDate
                        ? data.results[0].endDate
                        : false
                    }
                    onChange={(data) => {
                      FilterRecord(data);
                    }}
                  />
                  <div className="DropDownDate">
                    <DropDown
                      value={dateSort}
                      data={[
                        {
                          label: "ASC",
                          value: "ASC",
                        },
                        {
                          label: "DESC",
                          value: "DESC",
                        },
                      ]}
                      sort={true}
                      sortVal={"Sort Date - "}
                      selected={false}
                      onChangeData={(e) => { }}
                      placeholder="Sort Date"
                      onChangeData={(e) => {
                        urlParams.set("sort", e);
                        history.push({
                          search: "?" + urlParams.toString(),
                        });
                        setDateSort(e);
                      }}
                    />
                  </div>
                </>
              </div>
              <div className="titleright">
                <StatusHolder
                  count={
                    data && data.results[0].successCount
                      ? data.results[0].successCount
                      : "0"
                  }
                  label={"Success"}
                  margin={"40"}
                />
                <StatusHolder
                  count={
                    data && data.results[0].failureCount
                      ? data.results[0].failureCount
                      : "0"
                  }
                  label={"Failure"}
                  margin={"40"}
                />
              </div>
            </div>
          </div>
          <div className="row">
            {overview.loading ? (
              <Loader />
            ) : (
              <StatusTable
                data={data && data.results[0]}
                fulldata={data}
                dateSort={dateSort}
                LoadRecord={(data) => {
                  LoadRecord(data);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </Main>
  );
};
const StatusHolder = (props) => {
  return (
    <div className={`holder margin${props.margin}`}>
      <div className={`statuscircle ${props.label.toLowerCase()}`}>
        <span>{props.count}</span>
      </div>
      <span className="statustxt">{props.label}</span>
    </div>
  );
};
export default Dashboard;
