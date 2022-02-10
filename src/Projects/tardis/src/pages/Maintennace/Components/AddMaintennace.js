import React, { useState, useEffect } from "react";
import { Images } from "../../../assets/images";
import { DropDown, Button, DatePicker,SelectSearch } from "../../../components"
import moment from 'moment';
import { alert } from '../../../utils'

const AddMaintennace = props => {
  const [sourcelist, setSource] = useState([]);
  const [statuscheck, setStatus] = useState();
  const [reasoncheck, setReason] = useState();
  const {source, reason} = props;
  const submit = () => {
    const form = document.getElementById("addmaintennace")
    var data = Object.values(form).reduce((obj,field) => { obj[field.name ? field.name: "unnamed"] = field.value; return obj }, {});
    delete data.unnamed;
    if(data.failureDelayReason === "NA")
    {
      if(data.status !== "Completed On Time")
      {
        alert("error","Please select the vaild failureDelayReason")
        return false;
      }
    }
    data.logdate = data.logdate ?  moment(data.logdate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
    data.failureDelayReason =  data.failureDelayReason === "Please Select" ? "" :data.failureDelayReason;
    data.status =  data.status === "Please Select" ? "" :data.status;
    props.onSubmit(data)
  }
  useEffect(() => {
    if(source && reason)
    {
      let result=[];
      source.forEach((e)=>{
        result.push({name:e.source,value:e.source})
      })
      setSource(result);

    }
  }, [source, reason])
  return (
    <div className="modal-main1">
      <div className="modal-title">
        <div className="title-left centeralign">
          <div className="detailimg centeralign">
            <img alt="" src={Images.addlist} />
          </div>
          <span>Add Item</span>
        </div>
        <div
          className="title-close"
          onClick={() => {
            props.closepop();
          }}
        >
          <img alt="" src={Images.close} />
        </div>
      </div>
      <form id="addmaintennace">
        <div className="modal-content">

          <div className="controls">
            <div className="c1">
              <div>
                <span>VARIOUS SOURCES</span>
                <SelectSearch
                  options={sourcelist}
                  value="1"
                  name="source"
                />
              </div>
              <div>
                <span>LOG DATE</span>
                <div className="logdate">
                  <DatePicker name="logdate" />
                </div>
              </div>

              <div>
                <span>STATUS</span>
                <DropDown
                  id={"status"}
                  class={"ddfailure status"}
                  imguri={Images.arrowblack}
                  label={"Please Select"}
                  onChange={(data) => {setStatus(data)}}
                  options={["Completed On Time", "Delayed", "Failed"]}

                />
              </div>
            </div>
            <div className="c2">
              <span>COMMENTS</span>
              <textarea rows="8" cols="22" name="comments" maxLength="255"/>
              <div style={{marginTop: 10}}>

                <span>FAILURE REASONS</span>
                <DropDown
                  id={"failureDelayReason"}
                  class={"ddfailure"}
                  value={statuscheck ? statuscheck === "Completed On Time"? "NA":false : false}
                  imguri={Images.arrowblack}
                  disabled={statuscheck === "Completed On Time"}
                  onChange={(data) => {setReason(data)}}
                  label={"Please Select"}
                  options={reason}

                />
              </div>
            </div>
          </div>

        </div>
      </form>
      <Button class="modaladdbtn" label="Add Item" loading={props.isLoading} onClick={() => { submit() }} />
    </div>
  );
};

export default AddMaintennace;
