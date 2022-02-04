import React from "react";
import "./SelectSearch.scss";
import SelectSearch from "react-select-search";
const CustomSelectSearch = (props) => {
    return (
    <SelectSearch
        options={props.options}
        value={props.value}
        search={true}
        placeholder="Search"
        renderValue={(valueProps) => <input disabled={props.disabled} name={props.name}className="select-search__input" {...valueProps} autoComplete={"off"} />} 
    />
    )
}
export default CustomSelectSearch;