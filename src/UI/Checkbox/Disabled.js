
import './checkBox.css'
import { Fragment } from 'react';
import React from "react";
const Disabled = () =>{
    return(
        <Fragment>
        <td>
        <label class="control control--checkbox">
    <input type="checkbox" disabled/>
    <div class="control__indicator_disabled"></div>
       
       </label>
       </td>
       
       </Fragment>
    )
    
};
export default Disabled;








