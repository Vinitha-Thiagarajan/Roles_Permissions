import * as React from 'react';
import { DropdownButton } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import '../../Pages/Settings.css';
import { projects } from '../../utils/mockdata';
import SelectedRoles from './SelectedRoles';


export default function SelectDrop() {
  const [selected, setSelected] = React.useState('Projects');

  const handleChange = (event) => {
    setSelected(event);
  };

  return (
    <div className="margin">
        <DropdownButton id="dropdown-basic-button" title={"---"+selected+"---"} onSelect={handleChange}>
  {projects.map((result)=>{
  return(
  <Dropdown.Item eventKey={result.name}>{result.name}</Dropdown.Item>);})}
  </DropdownButton>
  

        <SelectedRoles name ={selected}/>
    </div>
  );
}