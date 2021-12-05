import React from "react";
import PropTypes from "prop-types";
const Tab = ({ activeTab, label, onClick }) => {
   
    const onClickTab = (label) => {
        onClick(label);
    };
    let className = "tab-list-item";
    if (activeTab === label) {
        className += " tab-list-active";
    }
    return (
        <li className={className} onClick={()=>onClickTab(label)}>
            {label}
        </li>
    );

}
Tab.propTypes  = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};
export default Tab;