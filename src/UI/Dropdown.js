
import { getThemeProps } from "@material-ui/styles";
import * as React  from "react";
import ProjectPermission from "../Components/Table/ProjectPermission";
import SelectedElement from "../Components/Table/SelectedElement";
import '../Components/Table/Table.css';
import roles from "../inputs";
import Checkbox from "./Checkbox/Checkbox";
import CrossCheck from "./Checkbox/CrossCheck";

const Dropdown = props => {
    const [selected , setSelected] = React.useState('');

    const EventHandler = (event) =>{
        setSelected(event.target.value);
    };
    
  

    return(
        <><td>
        <select onChange={EventHandler}>
            <ProjectPermission name={props.project}/>
          { roles.map((result) =>(<option text={result.id}>{result.name}</option>))}
        </select>
        </td>
        <SelectedElement name={selected}/>
        
        
        
    </>
    );

}

export default Dropdown;