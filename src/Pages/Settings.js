import React from "react";
import { Tabs, Tab, AppBar, Box ,Select, MenuItem} from "@material-ui/core";
import Dropdown from "../UI/Dropdown";
import SelectedRoles from "../Components/Select/SelectedRoles";
import { faCogs, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './Settings.css';
import '../Components/Table/Table.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faWrench, faTrash, faFilter } from '@fortawesome/free-solid-svg-icons'
import Table from '../Components/Table/Table';
import { projects } from '../utils/mockdata';
import { useHistory } from "react-router-dom";
import CheckSwitch from "../UI/Switch/CheckSwitch";
import UnCheckSwitch from "../UI/Switch/UncheckSwitch";
import SelectDrop from "../Components/Select/SelectDrop";
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

            <AppBar position="static" className="TabBar">
                <Tabs value={value} onChange={handleTabs} >
                    <Tab label={"Projects"} />
                    <Tab label={"Roles"} />
                    <Tab label={"Permissions"} />
                </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}>{<>
                <table className='myTable myTable-horizontal'>
                    <thead>
                        <tr>
                            <th>Name </th>
                            <th>Status</th>
                            <th>Actions</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((result) => {
                            return (<>
                            <tr>
                                <td>{result.name}</td>
                                <td>
                                  <CheckSwitch/>
                                </td>
                                <td>
                                    <div className="min-container">
                                    <FontAwesomeIcon icon={faEdit} className="facursorPoint" />
                                    <FontAwesomeIcon icon={faTrashAlt} color={"#e70707"} className="facursorPoint" />
                                    </div>
                                </td>
                              </tr></>
                            )
                        })}
                    </tbody>
                </table>
            </>}
            </TabPanel>

            <TabPanel value={value} index={1}>
              {
                    <SelectDrop/>
                }
                </TabPanel>

            <TabPanel value={value} index={2}>{<><table className='myTable myTable-horizontal'>
                <thead>
                    <tr>
                        <th>Icon </th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><FontAwesomeIcon icon={faEye} /></td>
                        <td>View</td>
                        <td>
                         
                          <UnCheckSwitch/>
                          
                        </td>
                        <td>
                            
                            <div className="align">
                            <FontAwesomeIcon icon={faEdit} className="facursorPoint" />
                            <FontAwesomeIcon icon={faTrashAlt} color={"#e70707"} className="facursorPoint" />
                            </div>
                            
                        </td>
                        
                       
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faEdit} /></td>
                        <td>Edit</td>
                        <td>
                          
                          <CheckSwitch/>
                         
                        </td>
                        <td>
                        <div className="align">
                            <FontAwesomeIcon icon={faEdit} className="facursorPoint" />
                            <FontAwesomeIcon icon={faTrashAlt} color={"#e70707"} className="facursorPoint" />
                            </div>
                        </td>
                        
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faWrench} /></td>
                        <td>Settings</td>
                        <td>
                          
                          <UnCheckSwitch/>
                          
                        </td>
                        <td>
                            <div className="align">
                            <FontAwesomeIcon icon={faEdit} className="facursorPoint" />
                            <FontAwesomeIcon icon={faTrashAlt} color={"#e70707"} className="facursorPoint" />
                            </div>
                            
                        </td>
                        
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faTrash} /></td>
                        <td>Delete</td>
                        <td>
                          
                          <CheckSwitch/>
                        
                        </td>
                        <td>
                            <div className="align">
                            <FontAwesomeIcon icon={faEdit} className="facursorPoint" />
                            <FontAwesomeIcon icon={faTrashAlt} color={"#e70707"} className="facursorPoint" />
                            </div>
                        </td>
                        
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faFilter} /></td>
                        <td>Filter</td>
                        <td>
                         
                          <UnCheckSwitch/>
                         
                        </td>
                        <td>
                            <div className="align">
                            <FontAwesomeIcon icon={faEdit} className="facursorPoint" />
                            <FontAwesomeIcon icon={faTrashAlt} color={"#e70707"} className="facursorPoint" />
                            </div>
                        </td>
                        
                    </tr>


                </tbody>
            </table>
            </>}
            </TabPanel>
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