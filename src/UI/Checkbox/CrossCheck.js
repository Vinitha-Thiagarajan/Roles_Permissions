
import './crosscheck.css'
import { Fragment } from 'react';
import React from "react";
const CrossCheck = () =>{
    return(
        <Fragment>
        <td>
        <label class="cont cont--checkbox">
    <input type="checkbox"checked/>
    <div class="cont__indicator"></div>
</label>
  
       </td>
       
       </Fragment>
    )
    
};
export default CrossCheck;