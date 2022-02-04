import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import AddSlack from "./AddSlack";
import { Images } from "../../../../../assets/images";
import { DropDown, Button, Reset } from "../../../../../components";
import { useSelector, useDispatch } from 'react-redux';
import { customStyles } from "../../../../../assets/constant";
import { ActionUpdate, fetch ,permissioncheck} from '../../../../../utils'
import query from '../../../../../assets/constant/query'
import { ActionSource } from '../../../../../../../../reducers/slack/actions'

const FilterContainer = props => {
  const dispatch = useDispatch();
  const userdata = useSelector(state => state.user);
  const {permission} = userdata;
  const [modalIsOpen, SetModal] = useState(false);
  const [reset, setReset] = useState(false)
  const [isLoading, setLoading] = useState(false);
  const [sourcelist, setSource] = useState([]);
  const [slacklist, setSlack] = useState([]);
  const slack = useSelector(state => state.slack);
  const closeModal = () => {
    SetModal(false);
  };
  const openModal = () => {
    SetModal(true);
  };
  const onReset = () => {
    props.LoadRecord({ filter: false })
    setReset(true);
  }
  useEffect(() => {
    if (slack.data.length > 0) {
      let source = slack.data.filter((e, i) => { return e.source });
      let sourceList = [], slackchannels = [], unique = [];
      source.forEach((e) => {
        if (unique.indexOf(e.source.source) === -1) {
          sourceList.push(e.source)
          unique.push(e.source.source);
        }
      })
      unique = []
      slack.data.forEach((e) => {
        let arr = e.slackChannels.split(",");
        for (var x of arr) {
          if (unique.indexOf(x) === -1) {
            slackchannels.push(
              { slackChannels: x });
            unique.push(x);
          }
        }
      })
      setSource(sourceList);
      setSlack(slackchannels);
    }
  }, [slack])
  const onSubmit = async (request) => {
    setLoading(true);
    var response = await fetch(query.slackaddupdate(request))
    ActionUpdate(response, request, "Add", (e) => {
      dispatch(ActionSource(e.slackSubscription.slackSubscription))
      closeModal();
    })
    setLoading(false);
  }
  const onFilterChange = (type, value) => {
    let filter = slack.filter ? slack.filter : {};
    if (type === "source" || type === "slackChannels") {
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
        id={"alertdd"}
        class={"options"}
        label={"Alert level"}
        value={slack.filter.alertLevel ? slack.filter.alertLevel : false}
        imguri={Images.dropdownarrow}
        onChange={(data) => { onFilterChange("alertLevel", data) }}
        displaynode={"alertLevel"}
        options={slack.AlertList}
      />
      <DropDown
        id={"isactivedd"}
        class={"options"}
        label={"isActive"}
        value={slack.filter.isActive !== undefined ? (slack.filter.isActive ? "Active" : "InActive") : false}
        radiobtn={true}
        imguri={Images.dropdownarrow}
        onChange={(data) => { onFilterChange("isActive", data === "Active") }}
        options={["Active", "InActive"]}
      />
      <DropDown
        id={"slackdd"}
        class={"options searchop"}
        label={"Slack channel"}
        search={true}
        multi={true}
        reset={reset}
        displaynode={"slackChannels"}
        onClick={() => setReset(false)}
        imguri={Images.dropdownarrow}
        onFilterselect={(list) => { onFilterChange("slackChannels", list) }}
        options={slacklist}
      />
      <Reset onClick={() => onReset()} isactive={Object.keys(slack.filter).length > 0} />
      {permissioncheck("slacksubscription","add",permission)?<Button
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
        contentLabel="Add Slack"
      >
        <AddSlack
          closepop={() => {
            closeModal();
          }}
          onSubmit={(data) => {
            onSubmit(data)
          }}
          isLoading={isLoading}
          source={slack.sourceList}
          alertLevel={slack.AlertList}
        />
      </Modal>
    </div>
  );
};

export default FilterContainer;
