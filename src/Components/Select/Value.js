import Checkbox from "../../UI/Checkbox/Checkbox"
import React from "react";
import '../Table/Table.css';

const Value = (props) => {
    if (props.permissions == 'true') {
        return <Checkbox type="grant"/>
    }
    else if (props.permissions == 'false') {
        return <Checkbox type="denied" />
    }
    else {
        return <Checkbox type="disable" />
    }

}
export default Value