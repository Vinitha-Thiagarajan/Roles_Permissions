import React, { useState } from "react";
import "./Tab.scss";
import Tab from "./Tab";

const Tabs = (props) => {
  const [activeTab, setActiveTab] = useState(props.label);

  const onClickTabItem = tab => {
    setActiveTab(tab);
    props.TabSelection(tab)
  };
  const { children } = props;
  return (
    <div className={`tabs ${props.className}`}>
      <ol className="tab-list">
        {children.map(child => {
          const { label } = child.props;

          return (
            <Tab
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={onClickTabItem}
            />
          );
        })}
      </ol>
      <div className="tab-content">
        {children.map(child => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

export default Tabs;
