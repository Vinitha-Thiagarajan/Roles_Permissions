import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import AddMapSource from "./AddMapSource"
import { Images } from "../../../../../assets/images";
import { DropDown, Button, Reset } from "../../../../../components";
import { customStyles } from "../../../../../assets/constant";
import { useSelector, useDispatch } from 'react-redux';
import { ActionUpdate, fetch, permissioncheck } from '../../../../../utils'
import query from '../../../../../assets/constant/query'
import { ActionSource } from '../../../../../../../../reducers/mapsource/actions'

Modal.setAppElement('#root')
const FilterContainer = props => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.map);
  const userdata = useSelector(state => state.user);
  const {permission} = userdata;
  const [modalIsOpen, SetModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);
  const [sourcelist, setSource] = useState([]);
  const [childsourcelist, setChild] = useState([]);
  const [sourceChild, setSourceChild] = useState([]);
  
  const closeModal = () => {
    SetModal(false);
  };
  const openModal = () => {
    SetModal(true);
  };

  useEffect(() => {
    if(data.data.length > 0){
    let source = data.data.filter((e, i) => { return e.source.type && e.source.type.isgroup });
    let sourceList = [], childSourceList = [], unique =[];
    source.forEach((e) => { 
      if (unique.indexOf(e.source.source) === -1) {
        sourceList.push(e.source) 
        unique.push(e.source.source);
      }
    })
    unique =[]
    data.data.forEach((e) => {
      if (unique.indexOf(e.childSource.source) === -1) {
        childSourceList.push(e.childSource);
        unique.push(e.childSource.source);
      }
    })
    setSource(sourceList);
    setChild(childSourceList);
  }
  }, [data])

  const onSubmit = async (request) => {
    setLoading(true);
    var response = await fetch(query.addSourceMap(request))
    ActionUpdate(response, request, "Add", (e) => {
      dispatch(ActionSource(e.createSourceMap.sourceMap))
      closeModal();
    })
    setLoading(false);
  }

  const onReset = () => {
    props.LoadRecord({ filter: {} });
    setReset(true);
  }
  const onFilterChange = (type, value) => {
    let filter = data.filter ? data.filter : {};
    if (type === "source" || type === "childSource") {
      let result = [];
      for (let x in value) {
        result.push(value[x].source)
      }
      value = result;
      if (value.length > 0){
        filter[type] = value;
        if (type === "source")
        {
          let filterResult = data.data.filter(function (e) {
            return value.indexOf(e["source"]["source"]) > -1;
          })
          let unique =[],childSourceList=[];
          filterResult.forEach((e) => {
            if (unique.indexOf(e.childSource.source) === -1) {
              childSourceList.push(e.childSource);
              unique.push(e.childSource.source);
            }
          })
          setSourceChild(childSourceList);
        }
      }
      else {
        if (filter.source)
          delete filter.source
        if (filter.childSource)
          delete filter.childSource 
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
        options={sourcelist}
      />
      <DropDown
        id={"childsourcedd"}
        class={"options searchop"}
        label={"Child Source"}
        search={true}
        multi={true}
        displaynode={"source"}
        reset={reset}
        onClick={() => setReset(false)}
        imguri={Images.dropdownarrow}
        onFilterselect={(list) => { onFilterChange("childSource", list) }}
        options={childsourcelist}
      />
      <DropDown
        id={"isoptionaldd"}
        class={"options"}
        label={"Isoptional"}
        value={data.filter.isoptional !== undefined ? (data.filter.isoptional ? "True":"False") : false}
        onChange={(data) => { onFilterChange("isoptional", data === "True") }}
        radiobtn={true}
        imguri={Images.dropdownarrow}
        options={["True", "False"]}
      />
      <Reset onClick={()=>onReset()} isactive={Object.keys(data.filter).length >0} />
      {permissioncheck("sourcemap","add",permission)?<Button
        class="greenclr addbtn"
        label="Add New Mapping"
        onClick={() => {
          openModal();
        }}
      />:null}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Map Source"
      >
        <AddMapSource
          closepop={() => {
            closeModal();
          }}
          onSubmit={(data) => {
            onSubmit(data)
          }}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  );
};

export default FilterContainer;
