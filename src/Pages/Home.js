import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Roles from "./Popup/Roles"
import Table from '../Components/Table/Table';
import { projects } from '../utils/mockdata';
import { useHistory } from "react-router-dom";
import Tabs from "../Components/Tabs"
import Modal from "../Components/Modal";
const Home = props => {
  let history = useHistory();
  const [open, setRoles] = React.useState(false);
  const [value, setValue] = React.useState(0)
  const handleTabs = (e, val) => {
    console.warn(val)
    setValue(val)
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
      <Modal show={open} handleClose={() => setRoles(false)}>
        <Roles />
      </Modal>
    </div>
  );
}


export default Home;
