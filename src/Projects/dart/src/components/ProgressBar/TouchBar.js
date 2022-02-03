import React, { useState, useEffect, Fragment } from "react";
import "./touch.css";
import { Alert, AlertTitle } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';

const Progress = ({ data,onSelection, reset, selectionval }) => {
  const [selection, setSelection] = useState([]);
  const [update, setUpdate] = useState(false);
  const Selection = (val) => {
    if (selection.indexOf(val) > -1) {
      let records = selection.filter((e) => e != val);
      setSelection(records);
      onSelection(records);
    }
    else {
      let records = selection;
      if(records.length >=3){
        setOpen(true);
        return false;
      }
      records.push(val);
      setSelection(records);
      onSelection(records);
    }
    setUpdate(!update)
  }
  useEffect(()=>{
        setSelection([]);
  },[reset])
  useEffect(()=>{
    setSelection(selectionval?selectionval:[]);
},[selectionval])
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <Fragment>

      <ol style={data.length > 10?{display:"block"}:{display:"table"}} className="touchbar touchbar--medium">
        {data && data.map((item, i) => {
          let classVal = "";
          if (i === data.length - 1) {
            classVal = "touchbar__last";
          }
          if (selection.indexOf(item.stepDetail) > -1) {
            classVal = classVal + " active";
          }
          return (
            <li key={i} data-step={i + 1} className={classVal} onClick={() => { Selection(item.stepDetail) }}>
              <span className="touchbar-text">{item.stepDetail}</span>
            </li>
          );
        })}
      </ol>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          We can't select more <strong>3</strong> touch points.
        </Alert>
      </Snackbar>
    </Fragment>
  );
};
export default Progress;
