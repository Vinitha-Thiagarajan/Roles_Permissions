import React from "react";
import './Settings.css';
import { useHistory } from "react-router-dom";
import Tabs from "../Components/Tabs"
import ProjectsTab from "./SubPages/Projects"
import RolesTab from "./SubPages/Roles"
import PermissionsTab from "./SubPages/Permissions"

var tablist = [
    {
        name: "Projects"
    },
    {
        name: "Roles"
    }
]
const checkComponent ={
    0:<ProjectsTab />,
    1:<RolesTab/>,
    2:<PermissionsTab/>
}
const Settings = props => {
    let history = useHistory();
    const [value, setValue] = React.useState(0)
    const handleTabs = (e, val) => {
        setValue(val)
    }
    return (
        <div className="rolesContainer">
            <div className="heading">
                <h4>Settings</h4>
            </div>
            <Tabs>
                {tablist.map((result, index) => (
                    <div key={index} label={result.name}>
                        {checkComponent[index]}
                    </div>))}
            </Tabs>
        </div>
    );
}

export default Settings;
