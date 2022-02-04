import React from "react";

const Tab = props => {
  const onClick = () => {
    const { label, onClick } = props;
    onClick(label);
  };

  const { label, activeTab } = props;

  let className = "tab-list-item";

  if (activeTab === label) {
    className += " tab-list-active";
  }

  return (
    <li className={className} onClick={onClick}>
      {label}
    </li>
  );
};

export default Tab;
