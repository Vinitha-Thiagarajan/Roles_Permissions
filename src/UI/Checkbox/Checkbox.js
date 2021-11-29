import './checkBox.css'
import React, { Fragment, useState } from 'react';
const Checkbox = ({type}) => {
    const [checked, setChecked] = useState(true);
    return (
        <Fragment>
                {type=="grant"?<label class="control control--checkbox">
                    <input type="checkbox" defaultChecked={checked}
                        onChange={() => setChecked(!checked)} />
                    <div class="control__indicator"></div>
                </label>:type=="denied"?
                <label class="cont cont--checkbox">
                    <input type="checkbox" checked />
                    <div class="cont__indicator"></div>
                </label>:
                <label class="control control--checkbox">
                    <input type="checkbox" disabled />
                    <div class="control__indicator_disabled"></div>
                </label>}
        </Fragment>
    )

};
export default Checkbox;