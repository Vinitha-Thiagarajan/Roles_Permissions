import { useState, useEffect } from "react";
import moment from 'moment'

export function usePaginationControl(page, size, filterData, updatecount) {
    const [list, setList] = useState([]);
  
    useEffect(()=>{
      let sizecheck = page * size;
      let pagecheck = (sizecheck - size)
      let resultdata = filterData.slice(pagecheck, sizecheck); 
      setList(resultdata);
    },[page, size, filterData, updatecount])
  
    return list;
}

export const UpdateData = (formid ,id, cb) => {
    const form = document.getElementById(formid)
    var data = Object.values(form).reduce((obj, field) => { obj[field.name ? field.name.replace(`-${id}`,""): "unnamed"] = field.value; return obj }, {});
    delete data.unnamed;
    cb(data);
}

export const ClearForm = (data,page) => {
    for (var x of Object.keys(data)) {
        try {
            let name = `${x}-${data.id}`;
            if (page === "source")
            document.getElementById(name).value = x === "type" ? data[x].type : data[x];
            else if (page === "sourceMap" || page === "slack")
            document.getElementById(name).value = typeof data[x] == "object" && data[x] != null ? data[x].source : data[x] == null ? false : data[x];
            else if(page === "maintenance"){
                if(x === "logdate")
                document.getElementById(name).value = moment(data[x]).format("MM/DD/YYYY");
                else
                document.getElementById(name).value = typeof data[x] == "object" && data[x] != null ? data[x].reason : data[x] == null ? false : data[x]; 
            } 
        }
        catch (e) { }
    }
}

export const StatusChange = (id) =>{
    try{
        let val = document.getElementById(`status-${id}`).value;
        if(val === "Completed On Time"){
        document.getElementById(`failureDelayReason-${id}`).setAttribute("disabled","disabled");
        document.getElementById(`failureDelayReason-${id}`).value = "NA"
        }
        else
        document.getElementById(`failureDelayReason-${id}`).removeAttribute("disabled");
    }
    catch(e){

    }
}