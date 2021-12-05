import React, { useState } from "react";
import { Select, MenuItem, TextField, FormControl, InputLabel, Button } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { projects, roles } from '../../utils/mockdata';
import "./Roles.scss"
const Roles = props => {
    const [user, setUser] = useState("");
    const [project, setProject] = useState("")
    const [roles, setRoles] = useState("")

    return (
        <div>
            <div className="rolesheading">Create Roles</div>
            <div className="controlpopup">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Group/User</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={user}
                        label="Group/User"
                        onChange={(event) => { setUser(event.target.value) }}
                    >
                        <MenuItem value={"Vinoth"}>Vinoth</MenuItem>
                        <MenuItem value={"Vinitha"}>Vinitha</MenuItem>
                        <MenuItem value={"Priya"}>Priya</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="controlpopup">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Projects</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={project}
                        label="Group/User"
                        onChange={(event) => { setProject(event.target.value) }}
                    >
                        {projects && projects.map((rec, index) => {
                            return <MenuItem key={"projects" + index} value={rec.name}>{rec.name}</MenuItem>
                        })}

                    </Select>
                </FormControl>
            </div>
            <div className="controlpopup">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Roles</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={roles}
                        label="Group/User"
                        onChange={(event) => { setRoles(event.target.value) }}
                    >
                        {roles && roles.map((rec, index) => {
                            return <MenuItem key={"roles" + index} value={rec.name}>{rec.name}</MenuItem>
                        })}

                    </Select>
                </FormControl>
            </div>
            <div className="btncontainerpopup">
                <Button variant="contained" color="success">
                    Save
                </Button>
                <Button variant="outlined" onClick={()=>props.onClose()}>Cancel</Button>
            </div>
        </div>
    );
}

export default Roles;
