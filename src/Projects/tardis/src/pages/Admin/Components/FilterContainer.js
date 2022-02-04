import React, { useState } from "react";
import { Images } from "../../../assets/images";
import { DropDown, Reset } from "../../../components";
import { useSelector } from "react-redux";

const FilterContainer = props => {
  const admin = useSelector(state => state.admin);
  const { data, GroupList } = admin;
  const [reset, setReset] = useState(false)
  const onReset =()=>{
    props.LoadRecord({ filter: false })
    setReset(true);
  }
  const onFilterChange = (type, value) => {
    let filter = admin.filter ? admin.filter : {};
    if (type === "username" || type === "groupsname") {
      let result = [];
      for (let x in value) {
        result.push(value[x][type === "groupsname"?"name":type])
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
        id={"userdd"}
        class={"options searchop"}
        label={"Select User"}
        search={true}
        multi={true}
        displaynode={"email"}
        reset={reset}
        onClick={() => setReset(false)}
        imguri={Images.dropdownarrow}
        onFilterselect={(list) => { onFilterChange("username", list) }}
        options={data}
      />
      <DropDown
        id={"groupdd"}
        class={"options searchop"}
        label={"Select Group"}
        search={true}
        multi={true}
        displaynode={"name"}
        reset={reset}
        onClick={() => setReset(false)}
        imguri={Images.dropdownarrow}
        onFilterselect={(list) => { onFilterChange("groupsname", list) }}
        options={GroupList}
      />
      <Reset onClick={() => onReset()} isactive={Object.keys(admin.filter).length > 0} />
    </div>
  );
};

export default FilterContainer;
