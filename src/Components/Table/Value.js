import Checkbox from "../../UI/Checkbox/Checkbox"
import CrossCheck from "../../UI/Checkbox/CrossCheck"
import Disabled from "../../UI/Checkbox/Disabled"
import React from "react";

import './Table.css';



const Value = (props) =>
{
    if(props.permissions=='true')
    {
        return <Checkbox/>
    }
    else if(props.permissions=='false')
    {
        return <CrossCheck/>
    }
    else
    {
        return <Disabled/>
    }

}
export default Value