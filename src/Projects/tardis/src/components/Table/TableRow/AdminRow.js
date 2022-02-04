import React, { Fragment } from "react";
import "../Table.scss";
import "./Row.scss";
import query from '../../../assets/constant/query'
import FieldHolder from "../../InputText/FieldHolder"
import Button from "../../Button/Button";
import { Images } from "../../../assets/images";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { showHide, ActionUpdate, fetch } from '../../../utils'
import { usePaginationControl, ClearForm ,UpdateData} from './ActionControls'
import TagInput from "../../TagInput/GroupTag"
import { ActionSource } from '../../../../../../reducers/admin/actions'
import { useDispatch } from 'react-redux';
import {  useSelector } from "react-redux";

const AdminRow = props => {
  const userdata = useSelector(state => state.user);
  const {user} = userdata;
  const dispatch = useDispatch();
  const { filterData, GroupList, page, size, updatecount } = props.dataSource;
  const list = usePaginationControl(page, size, filterData, updatecount);
  
  const showHideRow = (data, preview) => {
    let dataval = data;
    if (preview) {
      dataval = Object.assign({}, data);
      dataval.preview = preview;
    }
    showHide(dataval, "admin");
  };
  const Row = props => {
    return (
      <tr>
        <td className="rowarrow" onClick={() => {
          showHideRow(props, "preview");
        }}>
          <FontAwesomeIcon icon={faEye} id={`downimage${props.id}`} className={`downarr`} color={"#3976eb"} />
        </td>
        <td>{props.email}</td>
        <td>{props.groups.map((e,i)=>{
          return(
            <span key={`group-${i}`}>{e.name}{props.groups.length !== (i+1)?", ":""}</span>
          )
        })}</td>
        <td><div className="centeralign"><div className={props.isActive ? `greendot` : 'reddot'} />{props.isActive ? "Active" : "InActive"}</div></td>
        <td>
          <div id={`edittd-${props.id}`} className="actioncontainer">
            <div className="editholder" onClick={() => { showHideRow(props) }}>
              <img alt="" src={Images.RowEdit} className="editimg" />
            </div>
          </div>
        </td>
      </tr>
    );
  };
  const Update =(formid ,id)=>{
   
      UpdateData(formid ,id , async (data)=>{
        var response = await fetch(query.UpdateGroup(data))
        ActionUpdate(response,data,"Update",(e)=>{
          dispatch(ActionSource(e))
          if(data.email == user.email){
            window.location.reload();
          }
        })
      })
    
  }
  const RowDetails = props => {

  
    
    return (
      <tr id={`hidden_row${props.id}`} className="hidden_row editcontent">
        <td colSpan="5" className="paddzero">
          <table className="detailtable">
            <tbody>
              <tr>
                <td colSpan="5">
                  <form id={`formmadmin-${props.id}`}>
                    <div className="detailcontainer">
                      <FieldHolder lable="">
                        <span></span>
                      </FieldHolder>
                      <FieldHolder lable="Email">
                        <span>{props.email}</span>
                      </FieldHolder>
                      <input type="hidden"  value={props.email} name={`email-${props.id}`}/>
                      <input type="hidden"  value={props.id} name={`userId-${props.id}`}/>

                      
                      <FieldHolder lable="Groups">
                       <TagInput groups={props.groups} id={props.id} GroupList={GroupList} />
                      </FieldHolder>
                      <FieldHolder lable="Status">
                        
                        <input type="text" value={props.isActive?"Active":"InActive"} disabled/>
                      </FieldHolder>
                      <div className="detailbuttons fieldholder">
                        <Button class={`greenclr access-${props.id}`} label="Update" onClick={() => { Update(`formmadmin-${props.id}`, props.id) }} />
                        <Button class={`clearbtncolor access-${props.id}`} label="Clear" onClick={() => { ClearForm(props, "admin") }} />
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
            <Fragment key={`Admin-${index}`}>
              <Row {...item} />
              <RowDetails {...item} />
            </Fragment>
          );
        }) :
        <tr><td colSpan="5" className="norecord">No Data found!!</td></tr>
      }

    </tbody>
  );
};

export default AdminRow;
