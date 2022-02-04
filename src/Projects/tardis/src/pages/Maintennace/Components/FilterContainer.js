import React, { useState, useEffect } from "react";
import AddMaintennace from "./AddMaintennace";
import Modal from "react-modal";
import "../Maintennace.scss"
import {Images} from "../../../assets/images";
import { DropDown, Button, Reset , DateRanger } from "../../../components"
import { customStyles } from "../../../assets/constant";
import { ActionUpdate, fetch,permissioncheck } from '../../../utils'

import {useSelector, useDispatch } from 'react-redux';
import query from '../../../assets/constant/query';
import moment from 'moment';
import { ActionSource } from '../../../../../../reducers/maintennace/actions'

const FilterContainer = props => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.maintennace);
  const userdata = useSelector(state => state.user);
  const {permission} = userdata;
  const [modalIsOpen, SetModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);
  const [sourcelist, setSource] = useState([]);
  const [reasonlist, setReason] = useState([]);
  const closeModal = () => {
    SetModal(false);
  };
  const openModal = () => {
    SetModal(true);
  };
  useEffect(() => {
    if(data.data.length > 0){
    let source = data.data;
    let sourceList = [], ReasonList = [], unique =[];
    source.forEach((e) => { 
      if (unique.indexOf(e.source.source) === -1) {
        sourceList.push(e.source) 
        unique.push(e.source.source);
      }
    })
    unique =[]
    data.ReasonList && data.ReasonList.forEach((e) => {
      ReasonList.push(e.reason);
    })
    setSource(sourceList);
    setReason(ReasonList);
  }
  }, [data])
  const onSubmit = async (request) => {
    setLoading(true);
    var response = await fetch(query.addMaintenance(request))
    ActionUpdate(response, request, "Add", (e) => {
      dispatch(ActionSource(e.createMaintenanceReason.maintenanceReason))
      closeModal();
    })
    setLoading(false);
  }
  const onReset = () => {
    props.LoadRecord({ filter: false })
    setReset(true);
  }
  const onFilterChange = (type, value) => {
    let filter = data.filter ? data.filter : {};
    if (type === "source") {
      let result = [];
      for (let x in value) {
        result.push(value[x][type])
      }
      value = result;
      if (value.length > 0)
        filter[type] = value;
      else {
        if (filter[type])
          delete filter[type]
      }
    }
    else if (type === "logdate") {
      filter["startLogdate"] = moment(value.start).format("YYYY-MM-DD");
      filter["endLogdate"] = moment(value.end).format("YYYY-MM-DD");
    }
    else
      filter[type] = value;
    props.LoadRecord({ filter: filter })
  }
  return (
    <div className="container-filter">
      <DropDown
        id={"sourcedd"}
        class={"options searchop"}
        label={"Source"}
        search={true}
        multi={true}
        reset={reset}
        displaynode={"source"}
        onClick={() => setReset(false)}
        imguri={Images.dropdownarrow}
        onFilterselect={(list) => {onFilterChange("source", list) }}
        options={sourcelist}
      />
      <DateRanger range={true} onChange={(data)=>{onFilterChange("logdate", data)}} resetDate={reset}>
      <Button
        class={"options logdate"}
        label="Log Date"
        rightimg={Images.calendardetails}
        onClick={()=>{}}
      />
      </DateRanger>
      <DropDown
        id={"failturedd"}
        class={"options"}
        value={data.filter.failureDelayReason ? data.filter.failureDelayReason : false}
        label={"Failure Reasons"}
        reset={reset}
        imguri={Images.dropdownarrow}
        onChange={(data) => {onFilterChange("failureDelayReason", data) }}
        options={reasonlist}
      />
      <Reset onClick={() => { onReset()}} isactive={Object.keys(data.filter).length > 0} />

      {permissioncheck("maintenancereason","add",permission)?<Button

        class="greenclr addbtn"
        label="Add Item"
        onClick={() => {
          openModal();
        }}
      />:null}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Maintennace"
      >
        <AddMaintennace
          closepop={() => {
            closeModal();
          }}
          onSubmit={(data) => {
            onSubmit(data)
          }}
          isLoading={isLoading}
          source={data.sourceList}
          reason={reasonlist}
        />
      </Modal>
    </div>
  );
};

export default FilterContainer;
