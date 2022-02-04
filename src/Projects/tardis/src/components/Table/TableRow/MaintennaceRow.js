import React, {  Fragment } from "react";
import "../Table.scss";
import Button from "../../Button/Button";
import DatePicker from "../../InputText/DatePicker";
import { useDispatch } from 'react-redux';
import FieldHolder from "../../InputText/FieldHolder"
import query from '../../../assets/constant/query'
import { showHide, ActionUpdate, fetch, permissioncheck} from '../../../utils'
import { ActionSource } from '../../../../../../reducers/maintennace/actions'
import { usePaginationControl, UpdateData, ClearForm, StatusChange } from './ActionControls'
import { Images } from "../../../assets/images";
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import {  useSelector } from "react-redux";


const Maintennace = props => {
  const dispatch = useDispatch();
  const userdata = useSelector(state => state.user);
  const {permission} = userdata;
  const { filterData ,ReasonList, page, size, updatecount} = props.dataSource;
  const list = usePaginationControl(page, size, filterData, updatecount);
  const Update = (formid ,id) => {
    if(permissioncheck("maintenancereason","change",permission)){
      UpdateData(formid ,id , async (data)=>{
        data.logdate = moment(data.logdate).format("YYYY-MM-DD")
        var response = await fetch(query.updateMaintenance(data))
        ActionUpdate(response,data,"Update",(e)=>{
          dispatch(ActionSource(e))
        })
      })
    }
  }
  const Delete = async(data) => {
    if(window.confirm("Are you sure want to delete?"))
    {
    var response = await fetch(query.deleteMaintenance(data))
    ActionUpdate(response,data,"Delete",(e)=>{dispatch(ActionSource(e)); })
    }
  }
  const showHideRow = (data,preview) => {
    let dataval = data;
    if(preview){
      dataval = Object.assign({},data);
      dataval.preview = preview;
    }
     showHide(dataval,"maintenance");
  };
  
  const Row = props => {
    return (
      <tr>
        <td className="rowarrow" onClick={() => {
          showHideRow(props,"preview");
        }}>
          <FontAwesomeIcon icon={faEye} id={`downimage${props.id}`}  className={`downarr`} color={"#3976eb"} />
        </td>
        <td>{props.source.source}</td>
        <td>{moment(props.logdate).format("MM/DD/YYYY")}</td>
        <td className="textAlign detailstext">{props.status}</td>
        <td className="textAlign detailstext">{props.failureDelayReason.reason}</td>
        <td className="textAlign detailstext">
        {props.comments}
        </td>
        <td>
         <div id={`edittd-${props.id}`} className="actioncontainer">
            {permissioncheck("maintenancereason","change",permission)?<div className="editholder" onClick={() => {showHideRow(props)}}>
              <img alt="" src={Images.RowEdit} className="editimg" />
            </div>:null}
            {permissioncheck("maintenancereason","delete",permission)?<div className="deleteholder" onClick={() => { Delete(props) }}>
              <img alt="" src={Images.Delete} className="editimg" />
            </div>:null}
          </div>
        </td>
      </tr>
    );
  };
  const RowDetails = props => {
    return (
      <tr id={`hidden_row${props.id}`} className="hidden_row editcontent">
        <td colSpan="7" className="paddzero">
          <table className="detailtable">
            <tbody>
              <tr>
                <td colSpan="7">
                  <form id={`formmaintainence-${props.id}`}>
                    <div className="detailcontainer">
                      <div className="detailimg centeralign">
                        <img alt="" src={Images.addlist} />
                      </div>
                      <div className="detailname">
                        <span className="nametitle">Source Name</span>
                        <span>{props.source.source}</span>
                        <input type="hidden" name={`source-${props.id}`} id={`source-${props.id}`} />
                      </div>
                      <FieldHolder lable="Log Date">
                      <DatePicker name={`logdate-${props.id}`} />
                      </FieldHolder>
                      <FieldHolder lable="Status">
                      <select id={`status-${props.id}`} name={`status-${props.id}`} className="customselect select190" onChange={()=>{StatusChange(props.id)}}>
                        <option value={"Completed On Time"}>Completed On Time</option>
                        <option value={"Delayed"}>Delayed</option>
                        <option value={"Failed"}>Failed</option>
                      </select>
                      </FieldHolder>
                      <FieldHolder lable="Failure Reasons">
                      <select id={`failureDelayReason-${props.id}`} name={`failureDelayReason-${props.id}`} className="customselect select190">
                        {ReasonList.map((e,i)=>{
                          return <option key={i} value={e.reason}>{e.reason}</option>
                        })}
                      </select>
                      </FieldHolder>
                    
                      <FieldHolder lable="Comments">

                      <textarea rows="3" cols="22" name={`comments-${props.id}`} id={`comments-${props.id}`} className="sourceinput120" maxLength={255} />
                      </FieldHolder>
                      <div className="detailbuttons fieldholder">
                        <Button class={`greenclr access-${props.id}`}  label="Update" onClick={() => { Update(`formmaintainence-${props.id}`,props.id) }} />
                        <Button class={`clearbtncolor access-${props.id}`} label="Clear" onClick={() => { ClearForm(props,"maintenance") }} />
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
     {list && list.length > 0?
      list.map((item, index) => {
        return (
          <Fragment key={`Maintenance-${index}`}>
            <Row {...item}  />
            <RowDetails {...item} />
          </Fragment>
        );
      }):
        <tr><td colSpan="7" className="norecord">No Data found!!</td></tr>
        }

    </tbody>
  );
};

export default Maintennace;
