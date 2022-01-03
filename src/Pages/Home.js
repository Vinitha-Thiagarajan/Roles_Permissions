import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, faExchangeAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Roles from "./Popup/Roles"
import Table from '../Components/Table/Table';
import { projects } from '../utils/mockdata';
import { useHistory } from "react-router-dom";
import Tabs from "../Components/Tabs"
import Modal from "../Components/Modal";
import "../App.css";
import "../Components/Modal/styles.css";
import { colour } from "../utils/mockdata";
const Home = props => {
  let history = useHistory();
  const [open, setRoles] = React.useState(false);
  const handleClose= () => setRoles(false)

  const Title =() =>{
    return(<>
    <div className ="min-container">
      <h3 className="title">Assign Role</h3>
      <button className="button_change" onClick={handleClose}>X</button>
      </div>
      <hr></hr>
      </>
    )
  }
  const [prev, setPrev] = React.useState(false);
  useEffect (() => {
    const color = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
  },[]);
  useEffect (() => {
    const textcolor = getComputedStyle(document.documentElement).getPropertyValue('--color');
  },[]);


  const setColor=(color)=>{
    setPrev(!prev);
    document.documentElement.style.setProperty('--background-color',color)
    document.documentElement.style.setProperty('--fontstyle','italic')
    
  }

  const settextColor=(color)=>{
    setPrev(!prev);
    if(prev==false)
    {
    document.documentElement.style.setProperty('--color',color)
    }

  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
  };
  return (
    <div className="rolesContainer">
      <div className="heading">
        
        <h4>Roles and Permissions</h4>
       
        <div className="flexdisplay">
          <div className="addBtn" onClick={() => { setRoles(true) }}>
            <FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: 7 }} /> Add Roles & Permissions
          </div>
          <div className="addBtn" onClick={() => { history.push("/settings"); }}>
            <FontAwesomeIcon icon={faCogs} style={{ marginRight: 7 }} /> Configuration Settings
          </div>

        </div>
      </div>
      <Tabs>
        {projects.map((result, index) => (
          <div key={index} label={result.name}>
            <Table index={index} name={result.name} />
          </div>))}
      </Tabs>
      <Modal show={open} handleClose={handleClose} Title={Title}>
        <Roles />
      </Modal>
    </div>
  );
}


export default Home;
