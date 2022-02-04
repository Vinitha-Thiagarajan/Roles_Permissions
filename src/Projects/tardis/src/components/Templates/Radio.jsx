import React, {useState} from "react"
import { slugToText } from "../../utils"
import "./Radio.scss"

const Radio = ({ data,dvalue }) => {
  const [check, setCheck] = useState(dvalue)
  let id = data.name,
    label = slugToText(data.name),
    required = data.required
  const onhandleChange = (e, i) => {
    let arrvalue = check.split(",");
    if(arrvalue.indexOf(e) > -1){
      arrvalue = arrvalue.filter((item)=>item != e);
      setCheck(arrvalue.join(","))
    }
    else{
      arrvalue.push(e)
      setCheck(arrvalue.join(","))
    }
  }
  return (
    <>
    {data.label &&<label for={id} className="textInput__label">
      {data.label}
    </label>}
    <div className="t-radioholder">
      <input type="hidden" name={id + "_addradio"} value={check} />
      {data.options.map((option, i) => (
        <div key={"radio"+i} className="t-radiocontainer">
          <input
            id={option+"radio"+i}
            name={id}
            className="radio"
            type="radio"
            disabled={!data.isedit}
            checked={check.indexOf(option) >-1}
            required={required}
            onChange={(e) => {
              onhandleChange(option, data.i)
            }}
          />
          <label for={option+"radio"+i}>{option}</label>
        </div>
      ))}

    </div>
    </>
  )
}
export default Radio
