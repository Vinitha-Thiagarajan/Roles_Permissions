import React,{ useState, useEffect } from "react";
import "./Swap.scss";
import SVG from 'react-inlinesvg';
import { useHistory } from "react-router-dom";
const Swap = props => {
  const [selected, SetSelection] = useState();
  const [index, SetIndex] = useState(0);
  let history = useHistory();
  useEffect(()=>{
    SetSelection(props.options[0]);
  },[])
  const pages =[
    {
      page :"general",
      path:"/trend-chart-general",
    },
    {
      page :"failure",
      path:"/trend-chart-failure",
    },
    {
      page :"overall",
      path:"/trend-chart-overall",
    }
  ]
  const Swap = () =>{
    let currindex = index;
    if(currindex > 0)
      currindex = currindex -1;
    else{
      if(props.options.length > 1)
      currindex = 1;
      else
      currindex = 0;
    }
    let label = props.options[currindex];
    SetSelection(label);
    SetIndex(currindex);
    let curindex = pages.findIndex((e)=>{ return e.page === props.page});
    if(curindex === 2){
      curindex = 0;
    }
    else{
      curindex += 1;
    }
    let res =pages[curindex];
    history.push(res.path);
    props.onClick  && props.onClick(label)
    
  }
  return (
    <div
      className={`swap centeralign ${props.class?props.class:""}`}
      onClick={() => {
        Swap()
      }}
    >
      {props.leftimg ? props.svg ? <SVG src={props.leftimg} /> :<img alt="" src={props.leftimg} /> : null}
      <span>{selected}</span> 
    </div>
  );
};

export default Swap;