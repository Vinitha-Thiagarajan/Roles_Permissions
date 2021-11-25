import React from "react";
import { Tabs, Tab, AppBar,Box } from "@material-ui/core";

import Table from './Components/Table/Table';
import projects from './datas/project';

const Home = props => {
  const [value, setValue] =React.useState(0)
  const handleTabs = (e,val) =>
  {
    console.warn(val)
  setValue (val)
  }

  return (
      <div>
        <h1>React material ui tabs</h1>
        <AppBar position="static" >
          <Tabs value={value} onChange = {handleTabs}>
          { projects.map((result) =>(<Tab label={result.name}/>))}
          </Tabs>
        </AppBar>
        
        <TabPanel value={value} index={0}><Table index={value}/></TabPanel>
        <TabPanel value={value} index={1}><Table index={value}/></TabPanel>
        </div>
    );
}

function TabPanel(props)

{
  const {children,value,index} =props
  return(
    <div>
      {value===index && <h1>
          {children}
        </h1>}
        
      
    </div>
  )
}

export default Home;
