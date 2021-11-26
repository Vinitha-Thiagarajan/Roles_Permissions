
import { getThemeProps } from "@material-ui/styles";
import * as React  from "react";
import ProjectPermission from "../Components/Table/ProjectPermission";
import SelectedElement from "../Components/Select/SelectedElement";
import '../Components/Table/Table.css';

import roles from "../datas/roles";
import Checkbox from "./Checkbox/Checkbox";
import CrossCheck from "./Checkbox/CrossCheck";
import projects from "../datas/projects";

const Dropdown = props => {
    return(
        <>
        <option>Select roles--</option>
            {props.project.map((result) =>(<option>{result.name}</option>))} 
    </>
    );

}

export default Dropdown;