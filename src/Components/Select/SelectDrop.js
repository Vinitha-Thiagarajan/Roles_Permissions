import * as React from 'react';
import { Select,MenuItem,InputLabel,FormControl,Box } from '@material-ui/core';
import '../../Pages/Settings.css';
import { projects } from '../../utils/mockdata';
import SelectedRoles from './SelectedRoles';


export default function SelectDrop() {
  const [selected, setSelected] = React.useState('');

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <div className="margin">
       
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Projects</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={selected}
          onChange={handleChange}
          autoWidth
          label="Projects"
        >
          <MenuItem value="None">
            <em>None</em>
          </MenuItem>
          {projects.map((result)=>( <MenuItem value={result.name}>{result.name}</MenuItem>))}
         
        </Select>
        </FormControl>
        <SelectedRoles name ={selected}/>
    </div>
  );
}