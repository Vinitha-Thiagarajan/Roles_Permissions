
import './checkBox.css'
import { Fragment , useState } from 'react';
import React from "react";
const Checkbox = () =>{
    const [checked, setChecked] = useState(true);
return(
    <Fragment>
    <td>
    <label class="control control--checkbox">
<input type="checkbox" defaultChecked={checked}
    onChange={() => setChecked(!checked)}/>
<div class="control__indicator"></div>
</label>

   </td>
   
   </Fragment>
)

};
export default Checkbox;