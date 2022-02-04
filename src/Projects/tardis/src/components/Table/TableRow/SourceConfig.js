import React, { Fragment, useEffect, useState } from "react";
import "../Table.scss";
import "./Row.scss"
import Button from "../../Button/Button";
import TimePicker from "../../TimePicker";
import { Images } from "../../../assets/images";
import { useDispatch } from 'react-redux';
import FieldHolder from "../../InputText/FieldHolder"
import query from '../../../assets/constant/query'
import { showHide, ActionUpdate, fetch, permissioncheck, TzChecker } from '../../../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { ActionSource } from '../../../../../../reducers/configuration/actions'
import { usePaginationControl, UpdateData, ClearForm } from './ActionControls'
import {  useSelector } from "react-redux";
import moment from 'moment'

const SourceConfig = props => {
  const dispatch = useDispatch();
  const userdata = useSelector(state => state.user);
  const {permission, timeZone} = userdata;
  const { filterData, sourceType, page, size, updatecount } = props.dataSource;
  const list = usePaginationControl(page, size, filterData, updatecount);
  const Update = (formid, id) => {
    if(permissioncheck("source","change",permission)){
      UpdateData(formid, id, async (data) => {
        if(data.availabilitySchedule ){
          let hours = moment.tz(data.availabilitySchedule,"HH:mm:ss", timeZone).utc();
          data.availabilitySchedule = moment(hours).format("HH:mm:ss");
          }
        var response = await fetch(query.updateSource(data))
        ActionUpdate(response, data, "Update", (e) => {
          dispatch(ActionSource(e))
        })
      })
    }
  }
  const Delete = async (data) => {
    if(window.confirm("Are you sure want to delete?"))
    {
      var response = await fetch(query.deleteSource(data))
      ActionUpdate(response, data, "Delete", (e) => { dispatch(ActionSource(e)); })
    }
  }
  const showHideRow = (data,preview) => {
    let dataval = data;
    if(preview){
      dataval = Object.assign({},data);
      dataval.preview = preview;
    }
    showHide(dataval, "source",false,timeZone);
  };
  
  const Row = props => {
    const { source, description, alias, availabilitySchedule, numPrevDays, isactive, type, dashTriggerId } = props;
    return (
      <tr >
        <td className="rowarrow" onClick={() => {
          showHideRow(props,"preview");
        }}>
          <FontAwesomeIcon icon={faEye} id={`downimage${props.id}`} className={`downarr`} color={"#3976eb"} />
        </td>
        <td>{source}</td>
        <td>{description}</td>
        <td>{alias}</td>
        <td>
          {type && type.type}
        </td>
        <td><div className="centeralign"><div className={isactive ? `greendot` : 'reddot'} />{isactive ? "Active" : "InActive"}</div></td>
        <td className="textAlign">{numPrevDays}</td>
        <td>{dashTriggerId}</td>
        <td className="textAlign">{TzChecker(availabilitySchedule,timeZone)}</td>
        <td >
          <div id={`edittd-${props.id}`} className="actioncontainer">
           {permissioncheck("source","change",permission)? <div className="editholder" onClick={() => {showHideRow(props)}}>
              <img alt="" src={Images.RowEdit} className="editimg" />
            </div>:null}
            {permissioncheck("source","delete",permission)?<div className="deleteholder" onClick={() => { Delete({ source: props.source }) }}>
              <img alt="" src={Images.Delete} className="editimg" />
            </div>:null}
          </div>
        </td>
      </tr>
    );
  };
  const RowDetails = props => {
    const { source, availabilitySchedule } = props;
    return (
      <tr id={`hidden_row${props.id}`} className="hidden_row editcontent">
        <td colSpan="10" className="paddzero">
          <table className="detailtable">
            <tbody>
              <tr>
                <td colSpan="10">
                  <form id={`formsource-${props.id}`} autoComplete="off">
                    <div className="detailcontainer">
                      <div className="detailimg centeralign">
                        <img alt="" src={Images.addlist} />
                      </div>
                      <div className="detailname">
                        <span className="nametitle">Source Name</span>
                        <span>{source}</span>
                        <input type="hidden" name="source" value={source} />
                      </div>
                      <FieldHolder lable="Description">
                        <textarea rows="3" cols="22" id={`description-${props.id}`} name={`description-${props.id}`} className="sourceinput120" maxLength={255} />
                      </FieldHolder>
                      <FieldHolder lable="Alias">
                        <input type="text" id={`alias-${props.id}`} name={`alias-${props.id}`} className="sourceinput120" />
                      </FieldHolder>
                      <FieldHolder lable="Type">
                        <select id={`type-${props.id}`} name={`type-${props.id}`} className="customselect130" disabled>
                          {sourceType.map((e, i) => {
                            return <option key={i} value={e.type}>{e.type}</option>
                          })}
                        </select>
                      </FieldHolder>
                      <FieldHolder lable="IsActive">
                        <select id={`isactive-${props.id}`} name={`isactive-${props.id}`} className="sourceinput60 customselect">
                          <option value={"true"}>True</option>
                          <option value={"false"}>False</option>
                        </select>
                      </FieldHolder>
                      <FieldHolder lable="NumPrevDays">
                        <input type="number" id={`numPrevDays-${props.id}`} name={`numPrevDays-${props.id}`} className="sourceinput60" />
                      </FieldHolder>
                      <FieldHolder lable="DashTriggerId">
                        <input type="text" id={`dashTriggerId-${props.id}`} disabled={props.type && props.type.type === "Dashboard" ? false : true} name={`dashTriggerId-${props.id}`} className="sourceinput120" />
                      </FieldHolder>
                      <FieldHolder lable="AvailabilitySchedule">
                        <TimePicker time={TzChecker(availabilitySchedule,timeZone)} className="sourceinput120" name={`availabilitySchedule-${props.id}`} />
                      </FieldHolder>
                      <div className="detailbuttons fieldholder">
                        <Button class={`greenclr access-${props.id}`} label="Update" onClick={() => { Update(`formsource-${props.id}`, props.id) }} />
                        <Button class={`clearbtncolor access-${props.id}`} label="Clear" onClick={() => { ClearForm(props, "source") }} />
                        <Button
                          class="cancelbtn"
                          label="Cancel"
                          onClick={() => { showHideRow(props) }}
                        />
                      </div>
                    </div>
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    );
  };
  return (
    <tbody>
      {list && list.length > 0 ?
        list.map((item, index) => {
          return (
            <Fragment key={`SourceConfig-${index}`}>
              <Row {...item} id={index + 1} />
              <RowDetails {...item} id={index + 1} />
            </Fragment>
          );
        }) :
        <tr><td colSpan="10" className="norecord">No Data found!!</td></tr>
      }
    </tbody>
  );
};

export default SourceConfig;
