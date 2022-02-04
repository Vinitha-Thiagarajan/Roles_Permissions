import React, { useState, useEffect } from "react";
import AddSource from "./AddSource";
import Modal from "react-modal";
import { Images } from "../../../../../assets/images";
import { DropDown, Button, Reset } from "../../../../../components";
import { customStyles } from "../../../../../assets/constant";
import { useSelector, useDispatch } from 'react-redux';
import { ActionUpdate, fetch,permissioncheck } from '../../../../../utils'
import query from '../../../../../assets/constant/query'
import { ActionSource } from '../../../../../../../../reducers/configuration/actions'

Modal.setAppElement('#root')
const FilterContainer = props => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.source);
  const userdata = useSelector(state => state.user);
  const {permission} = userdata;
  const [modalIsOpen, SetModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [reset, setReset] = useState(false)
  const [resetDash, setResetDash] = useState(false)
  const [dashIds, SetDash] = useState([]);

  const closeModal = () => {
    SetModal(false);
  };
  const openModal = () => {
    SetModal(true);
  };
  const onSubmit = async (request) => {
    setLoading(true);
    var response = await fetch(query.addSource(request))
    ActionUpdate(response, request, "Add", (e) => {
      dispatch(ActionSource(e.createSource.source))
      closeModal();
    })
    setLoading(false);
  }
  useEffect(() => {
    if (data.data.length > 0) {
      let result = data.data.filter((e, i) => { return  e!=null && e.dashTriggerId !== null && e.dashTriggerId.toString().trim() !== "" });
      SetDash(result);
    }
  }, [data.data])
  const onReset = () => {
    props.LoadRecord({ filter: {} });
    setReset(true);
    setResetDash(true);
  }
  const onFilterChange = (type, value) => {
    let filter = data.filter ? data.filter : {};
    if (type === "source") {
      let result = [];
      for (let x in value) {
        result.push(value[x].source)
      }
      value = result;
      if (value.length > 0)
        filter[type] = value;
      else {
        if (filter.source)
          delete filter.source
      }
    }
    else if(type === "dashTriggerId"){
      let result = [];
      for (let x in value) {
        result.push(value[x].dashTriggerId)
      }
      value = result;
      if (value.length > 0)
        filter[type] = value;
      else {
        if (filter.dashTriggerId)
          delete filter.dashTriggerId
      }
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
        displaynode={"source"}
        reset={reset}
        onClick={() => setReset(false)}
        imguri={Images.dropdownarrow}
        onFilterselect={(list) => { onFilterChange("source", list) }}
        options={data.data}
      />
      <DropDown
        id={"typedd"}
        class={"options"}
        label={"Type"}
        value={data.filter.type ? data.filter.type : false}
        imguri={Images.dropdownarrow}
        onChange={(data) => { onFilterChange("type", data) }}
        displaynode={"type"}
        options={data.sourceType}
      />
      <DropDown
        id={"isactivedd"}
        class={"options"}
        label={"isActive"}
        value={data.filter.isactive !== undefined ? (data.filter.isactive ? "Active" : "Inactive") : false}
        radiobtn={true}
        imguri={Images.dropdownarrow}
        onChange={(data) => { onFilterChange("isactive", data === "Active") }}
        options={["Active", "Inactive"]}
      />
      <DropDown
        id={"Dashdd"}
        class={"options searchop"}
        label={"Dash Trigger ID"}
        onFilterselect={(data) => { onFilterChange("dashTriggerId", data) }}
        imguri={Images.dropdownarrow}
        displaynode={"dashTriggerId"}
        onClick={() => setResetDash(false)}
        search={true}
        multi={true}
        reset={resetDash}
        options={dashIds}
      />
      <Reset onClick={()=>onReset()} isactive={Object.keys(data.filter).length >0} />
      {permissioncheck("source","add",permission)?<Button
        class="greenclr addbtn"
        label="Add Source"
        onClick={() => {
          openModal();
        }}
      />:null}
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
          onSubmit={(data) => {
            onSubmit(data)
          }}
          isLoading={isLoading}
          Type={data.sourceType}
        />
      </Modal>
    </div>
  );
};

export default FilterContainer;
