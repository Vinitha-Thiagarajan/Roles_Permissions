import React from "react";
import { Tabs, Tab, AppBar, Box } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs } from '@fortawesome/free-solid-svg-icons'

import Table from '../Components/Table/Table';
import { projects } from '../utils/mockdata';
import {useHistory} from "react-router-dom";
const Settings = props => {
  let history = useHistory();
  const [value, setValue] = React.useState(0)
  const handleTabs = (e, val) => {
    setValue(val)
  }
  return (
    <div>
      <div className="heading">
        <h1>Settings</h1>
      </div>

      <AppBar position="static" >
        <Tabs value={value} onChange={handleTabs}>
        <Tab label={"Projects"} />
        <Tab label={"Roles"} />
        <Tab label={"Permissions"} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}></TabPanel>
      <TabPanel value={value} index={1}></TabPanel>
      <TabPanel value={value} index={3}></TabPanel>
    </div>
  );
}
function TabPanel(props) {
    const { children, value, index } = props
    return (
      <div>
        {value === index && <h1>
          {children}
        </h1>}
      </div>
    )
  }
  
export default Settings;
