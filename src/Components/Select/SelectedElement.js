
import { useState, useEffect, Fragment } from "react";
import React from "react";
import Value from "./Value";
import {roles} from "../../utils/mockdata";

import '../Table/Table.css';

const SelectedElement = (props) => {
    const [permission, setPermission] = useState([]);

    useEffect(() => {
        if (props.name && props.name != '') {
            const SelectedValue = roles.filter((e) => e.name == props.name)
            setPermission(SelectedValue[0].permission)
        }
    }, [props.name])

    return (
        <Fragment>
            {permission && Object.values(permission).map((e, i) => {
                return <Value permissions={e}
                    key={i} />
            })}
        </Fragment>
    )


}
export default SelectedElement;