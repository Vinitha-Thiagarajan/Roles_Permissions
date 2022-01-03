import React from "react";
import './Settings.css';
import { useHistory } from "react-router-dom";
import Tabs from "../Components/Tabs"
import ProjectsTab from "./SubPages/Projects"
import RolesTab from "./SubPages/Roles"
import CustomTab from "./SubPages/CustomisedTheme"

var tablist = [
    {
        name: "Projects"
    },
    {
        name: "Roles"
    },
    {
        name: "Customised Themes"
    }
]
const checkComponent ={
    0:<ProjectsTab />,
    1:<RolesTab/>,
    2:<CustomTab/>
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
