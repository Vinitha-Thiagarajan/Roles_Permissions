import React, { useState, useEffect, useRef, useCallback } from "react";
import { Images } from "../../../../../assets/images";
import { DropDown, Button } from "../../../../../components";
import { useSelector, useDispatch } from 'react-redux';
import { AddSourceHistory } from '../../../../../../../../reducers/testcase/actions';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import { fetchDV } from '../../../../../utils'
import query from '../../../../../assets/constant/query'
import { ToastContainer, toast } from 'react-toastify';
import Cron from 'react-js-cron'
import { Divider } from 'antd';
import 'antd/dist/antd.css';
import { isValidCron } from 'cron-validator'

const FilterContainer = props => {
  const [source, setSource] = useState("");
  const [sourcelist, setSourceList] = useState("");
  const [update, setUpdate] = useState(false);
  const [typesource, settypeSource] = useState("internal");
  const [idsource, setidsource] = useState();
  const [cronvalue, setCronValue] = useState("");

  const [onchangevalue, setonchangevalue] = useState(false);
  const inputRef = useRef(null)
  const customSetValue = useCallback(
    (newValue) => {
      setCronValue(newValue)
      setonchangevalue(true);
    },
    [inputRef]
  )
  const [error, onError] = useState()
  const dispatch = useDispatch();
  const data = useSelector(state => state.source);
  const testcase = useSelector(state => state.testcase);
  const [reset, setReset] = useState(false);
  useEffect(() => {
    if (data.data.length > 0 && !data.isLoading) {
      setSourceList(data.data)
      setUpdate(!update)
    }
    else {
      setSourceList([])
      setUpdate(!update)
    }
  }, [data.data])
  useEffect(() => {
    if (source && source != "") {
      let requestdata = query.PipelineSourceClassification(source);
      fetchDV(requestdata).then((res) => {
        if (res.status == 200) {
          if (res.data.errors) {
            settypeSource("internal");
            setCronValue("");
            setidsource();
            setonchangevalue(false);
            return false;
          }
          else {
            let currentval = res.data.data.pipelineSourceClassification;
            if (currentval != null) {
              settypeSource(currentval.sourceType);
              setCronValue(currentval.cron);
              setidsource(currentval.sourceId)
              setonchangevalue(false);
            }
            else {
              settypeSource("internal");
              setCronValue("");
              setidsource();
              setonchangevalue(false);
            }
          }
        }
        else {
        }
      }).catch((err) => {
        console.log(err)
      })
      let checkval = testcase.pipelinehistory.filter((e) => e.sourceName == source);
      if (checkval.length > 0) {
        let selectval = checkval[0].pipelineExpectations;
        if (selectval && selectval.length > 0) {
          let currentval = selectval[0].source ? selectval[0].source : false;
          if (currentval) {
            settypeSource(currentval.sourceType);
            setCronValue(currentval.cron);
            setidsource(currentval.sourceId)
          }
        }
      }

    }
  }, [source])
  const LoadRecord = (data) => {

    if (data.length > 0) {
      data = data[0].source
      setSource(data)
      let datalist = testcase.pipelinehistory ? testcase.pipelinehistory : [];
      // if (removeadd) {
      //   let newdatalist =[];
      //   for(var x in datalist){
      //     let pipelinelist = datalist[x].pipelineExpectations;
      //     let pipelinearr = pipelinelist.filter((e) => e.id != "add");
      //     datalist[x].pipelineExpectations= pipelinearr;
      //   }
      // }
      // let datacheck =true;
      // for(var x in datalist){
      //   let pipelinelist = datalist[x].pipelineExpectations;
      //   let pipelinearr = pipelinelist.findIndex((e) => e.id == "add");
      //   if (pipelinearr > -1) {
      //     datacheck=false;
      //     break;
      //   }
      // }
      //if (datacheck) {
      let adddata = {
        sourceName: data,
        add: true,
        pipelineExpectations: [{
          id: "add",
          sourceName: data,
          validationType: "",
          expectation: {
            expectationId: "",
            expectationName: ""
          },
          source: {
            sourceId: idsource
          },
          status: false,
          expectationValue: ""
        }]
      }
      let indexdata = datalist.findIndex((e) => e.sourceName == data)
      // if (datalist.length > 0) {
      //   let indexdata = datalist.findIndex((e) => e.sourceName == source)
      //   if (indexdata > -1) {
      //     let dataarr = datalist[indexdata].pipelineExpectations;
      //     dataarr.push(
      //       {
      //         id: "add",
      //         sourceName: source,
      //         validationType: "",
      //         expectation: {
      //           expectationId: "",
      //           expectationName: ""
      //         },
      //         status: false,
      //         expectationValue: ""
      //       }
      //     )
      //     datalist[indexdata].pipelineExpectations = dataarr;
      //   }
      //   else {
      //     datalist.unshift(adddata);
      //   }
      // }
      //else {
      if (indexdata == -1) {
        datalist.unshift(adddata);
      }
      //}
      dispatch(AddSourceHistory(datalist, data));
      // }
      // else {
      //   if (window.confirm("Existing unsaved change will be discard, do you want to continue?")) {
      //     LoadRecord(true)
      //   }
      // }
    }
    else {
      let datalist = testcase.pipelinehistory ? testcase.pipelinehistory : [];
      dispatch(AddSourceHistory(datalist, ""));
      setSource("")
    }
  }
  const onChangeRadio = (e) => {
    settypeSource(e);
    setonchangevalue(true)
  }
  const onSave = () => {
    let requestdata = false;
    let data = {
      sourceName: source,
      sourceType: typesource,
      cron: cronvalue
    }
    if (source == "") {
      toast.warn("Source name is required");
      return false;
    }
    if (typesource == "") {
      toast.warn("Source type is required");
      return false;
    }
    if (typesource == "internal") {
      data.cron = "";
      setCronValue("");
    }
    if (typesource == "external") {
      if (!cronvalue || cronvalue.trim() == "") {
        toast.warn("Cron expression is required");
        return false;
      }
    }
    if (cronvalue && cronvalue.trim() != "" && !isValidCron(cronvalue)) { // returns true
      toast.warn("Pleas enter the vaild cron expresssion");
      return false;
    }
    if (idsource) {
      data.sourceId = idsource;
      requestdata = query.UpdateSourceClassification(data);
    }
    else {
      requestdata = query.CreateSourceClassification(data);
    }
    if (requestdata) {
      fetchDV(requestdata).then((res) => {
        if (res.status == 200) {
          if (res.data.errors) {
            toast.warn(res.data.errors[0].message);
            return false;
          }
          else {
            if (res.data.data.createPipelineSourceClassification) {
              setidsource(res.data.data.createPipelineSourceClassification.pipelineSourceClassification.sourceId)
            }
            toast.success("Updated Successfully!!")
          }
        }
        else {
          toast.warn("Failed!!!");
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
  return (
    <div className="container-filter">
      {/* <DropDown
        id={"sourcedd"}
        class={"options searchop"}
        label={"Source"}
        search={true}
        imguri={Images.dropdownarrow}
        onChange={(data) => { LoadRecord(data) }}
        displaynode={"source"}
        options={data.data}
      /> */}
      <DropDown
        id={"sourcedd"}
        class={"options searchop"}
        label={"Source"}
        search={true}
        multi={true}
        reset={reset}
        singleSelect={true}
        displaynode={"source"}
        loading={data.isLoading}
        onClick={() => setReset(false)}
        imguri={Images.dropdownarrow}
        onFilterselect={(list) => { LoadRecord(list) }}
        options={sourcelist}
        selectedValues={false}
      />
      {/* <Button
        class="addbtn"
        label="Add Config"
        onClick={() => {
          LoadRecord()
        }}
      /> */}
      {source != "" && <div className="Classification">
        <div className="radiocontainer">

          <RadioGroup onChange={onChangeRadio} value={typesource} horizontal>
            <RadioButton value="internal" iconSize={21} iconInnerSize={15} pointColor={"#3976eb"} rootColor={"#3976eb"}>
              Internal
            </RadioButton>
            <RadioButton value="external" iconSize={21} iconInnerSize={15} pointColor={"#3976eb"} rootColor={"#3976eb"}>
              External
            </RadioButton>
          </RadioGroup>
        </div>
        {/* <input type="text" placeholder="Cron Expression" value={cron} className="crontxt" onChange={(e) => { setcron(e.target.value); setonchangevalue(true) }} /> */}

      </div> || ""}
      {typesource == "external" && <div className="crongenerate" >
        <input type="text" placeholder="Cron Expression" value={cronvalue} className="crontxt" onChange={(e) => { setCronValue(e.target.value); setonchangevalue(true) }} />
        <Divider>OR</Divider>
        <div className="cronholder">
          <Cron value={cronvalue} setValue={customSetValue} clearButton={false} />
          <div className="utctime">(UTC +00:00) UTC</div>
        </div>

        {error && <p style={{ marginTop: 20 }}>
          Error: {error ? error.description : 'undefined'}
        </p> || ""}
      </div> || ""}
      {onchangevalue && <div className="savebtn" onClick={() => { onSave() }}>
        Save
      </div> || ""}
      <ToastContainer
        position="top-right" role="warning"></ToastContainer>
    </div>
  );
};

export default FilterContainer;
