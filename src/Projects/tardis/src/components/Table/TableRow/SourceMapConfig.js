import React, { useState, Fragment, useEffect } from "react";
import Modal from "react-modal";
import "../Table.scss";
import "./Row.scss";
import Button from "../../Button/Button";
import FieldHolder from "../../InputText/FieldHolder"
import { Images } from "../../../assets/images";
import { useDispatch } from 'react-redux';
import { ActionSource } from '../../../../../../reducers/mapsource/actions'
import { customStyles } from '../../../assets/constant'
import { showHide, ActionUpdate, fetch, permissioncheck } from '../../../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import query from '../../../assets/constant/query'
import AddSource from '../../../pages/Configuration/SubPages/Source/Components/AddSource'
import { usePaginationControl, UpdateData, ClearForm } from './ActionControls'
import {  useSelector } from "react-redux";
Modal.setAppElement('#root')

const SourceConfig = props => {
  const dispatch = useDispatch();
  const [modalIsOpen, SetModal] = useState(false);
  const [modaldata, SetData] = useState();
  const userdata = useSelector(state => state.user);
  const {permission} = userdata;

  const { filterData, page, size, updatecount } = props.dataSource;
  const list = usePaginationControl(page, size, filterData, updatecount);
  const closeModal = () => {
    SetModal(false);
  };
  const openModal = () => {
    SetModal(true);
  };

  const Update = (formid, id) => {
    if(permissioncheck("sourcemap","change",permission)){
    UpdateData(formid, id, async(data) => {
      if (data.source !== "" && data.childSource !== "")
        var response = await fetch(query.updateSourceMap(data))
      ActionUpdate(response, data, "Update", (e) => {
        dispatch(ActionSource(e))
      })
    });
  }
  }

  const Delete = async (data) => {
    if(window.confirm("Are you sure want to delete?"))
    {
    let request = {
      source: data.source.source,
      childSource: data.childSource.source
    }
    var response = await fetch(query.deleteSourceMap(request))
    ActionUpdate(response, data, "Delete", (e) => { dispatch(ActionSource(e)); })
    }
  }

  const onOpenSource = (data) => {
    openModal();
    SetData(data);
  }

  const showHideRow = (data,preview) => {
    let dataval = data;
    if(preview){
      dataval = Object.assign({},data);
      dataval.preview = preview;
    }
    showHide(dataval,"sourceMap");
  };

  const Row = props => {
    const { source, childSource, isoptional } = props;
    return (
      <tr>
        <td className="rowarrow" onClick={() => {
          showHideRow(props,"preview");
        }}>
           <FontAwesomeIcon icon={faEye} id={`downimage${props.id}`}  className={`downarr`} color={"#3976eb"} />
        </td>
        <td className="foucscell" onClick={() => onOpenSource(source)}>{source.source}</td>
        <td className="foucscell" onClick={() => onOpenSource(childSource)}>{childSource.source}</td>
        <td>{isoptional ? "True" : "False"}</td>

        <td>
          <div className="action-td-container">
          <div id={`edittd-${props.id}`} className="actioncontainer">
          {permissioncheck("sourcemap","change",permission)?<div className="editholder" onClick={() => {showHideRow(props)}}>
              <img alt="" src={Images.RowEdit} className="editimg" />
            </div>:null}
            {permissioncheck("sourcemap","delete",permission)?<div className="deleteholder" onClick={() => { Delete(props) }}>
              <img alt="" src={Images.Delete} className="editimg" />
            </div>:null}
          </div>
          </div>
        </td>
      </tr>
    );
  };
  const RowDetails = props => {
    return (
      <tr id={`hidden_row${props.id}`} className="hidden_row editcontent">
        <td colSpan="5" className="paddzero">
          <table className="detailtable">
            <tbody>
              <tr>
                <td colSpan="5">
                  <form id={`formsourcemap-${props.id}`} autoComplete="off">
                    <div className="detailcontainer">
                      <div className="detailimg centeralign">
                        <img alt="" src={Images.addlist} />
                      </div>

                      <FieldHolder lable="Source">
                        <input
                          type="text"
                          id={`source-${props.id}`}
                          name={`source-${props.id}`}
                          className="sourceinput200"
                          disabled={true}
                        />
                      </FieldHolder>
                      <FieldHolder lable="Child Source">
                        <input
                          type="text"
                          id={`childSource-${props.id}`}
                          name={`childSource-${props.id}`}
                          className="sourceinput200"
                          disabled={true}
                        />
                      </FieldHolder>
                      <FieldHolder lable="Isoptional">
                        <select id={`isoptional-${props.id}`} name={`isoptional-${props.id}`} className="sourceinput120 customselect">
                          <option value={"true"}>True</option>
                          <option value={"false"}>False</option>
                        </select>
                      </FieldHolder>
                      <div className="detailbuttons fieldholder">
                        <Button class={`greenclr access-${props.id}`} label="Update" onClick={() => { Update(`formsourcemap-${props.id}`, props.id) }} />
                        <Button class={`clearbtncolor access-${props.id}`} label="Clear" onClick={() => { ClearForm(props,"sourceMap") }} />
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
    <Fragment>
      <tbody>
        {list && list.length > 0 ?
          list.map((item, index) => {
            return (
              <Fragment key={`SourceMapConfig-${index}`}>
                <Row {...item} />
                <RowDetails {...item} />
              </Fragment>
            );
          }) :
          <tr><td colSpan="5" className="norecord">No Data found!!</td></tr>
        }
      </tbody>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Source"
      >
        <AddSource
          closepop={() => {
            closeModal();
          }}
          data={modaldata}
        />
      </Modal>
    </Fragment>
  );
};

export default SourceConfig;
