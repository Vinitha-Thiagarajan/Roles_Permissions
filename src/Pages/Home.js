import React from "react";
import { Tabs, Tab, AppBar, Box } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import Table from '../Components/Table/Table';
import { projects } from '../utils/mockdata';
import {useHistory} from "react-router-dom";
const Home = props => {
  let history = useHistory();

  const [value, setValue] = React.useState(0)
  const handleTabs = (e, val) => {
    console.warn(val)
    setValue(val)
  }

  return (
    <div>
      <div className="heading">
        <h1>Roles and Permissions</h1>
        <div className="flexdisplay">
        <div className="addBtn" onClick={()=>{history.push("/settings");}}>
            <FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: 7 }} /> Add Roles & Permissions
          </div>
          <div className="addBtn" onClick={()=>{history.push("/settings");}}>
            <FontAwesomeIcon icon={faCogs} style={{ marginRight: 7 }} /> Settings
          </div>
          
        </div>
      </div>

      <AppBar position="static"  className="TabBar">
        <Tabs value={value} onChange={handleTabs}>
          {projects.map((result) => (<Tab label={result.name} />))}
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}><Table index={value} /></TabPanel>
      <TabPanel value={value} index={1}><Table index={value} /></TabPanel>
 
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

export default Home;
