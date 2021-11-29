
import './checkBox.css'
import { Fragment, useState } from 'react';
import React from "react";
const Checkbox = () => {
    const [checked, setChecked] = useState(true);
    return (
        <Fragment>
            
                <label class="control control--checkbox">
                    <input type="checkbox" defaultChecked={checked}
                        onChange={() => setChecked(!checked)} />
                    <div class="control__indicator"></div>
                </label>


        </Fragment>
    )

};
export default Checkbox;