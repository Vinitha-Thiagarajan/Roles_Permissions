import React, { useEffect, useState } from "react";
import { TitleContainer, ProfileInput, Loader, Button, Table, DropDown } from "../../components";
import { Images } from "../../assets/images";
import { customStyles } from "../../assets/constant";
import "./Profile.scss"
import Layout from '../../Layout';
import { connect, useSelector } from "react-redux";
import { DashDetails, SourceDashRecords } from "../../../../../reducers/user/actions"
import CreateDashboard from "../Dashboard/Components/CreateDashboard"
import Modal from "react-modal";
import query from '../../assets/constant/query'
import { ActionUpdate, fetch, IntialGen } from '../../utils'

const Profile = (props) => {
  const [data, setData] = useState()
  const [dashlist, setDash] = useState([])
  const [defalutActive, setDefault] = useState(false)
  const userdata = useSelector(state => state.user);
  const { dash, sourceList, user } = userdata;
  const [isLoading, setLoading] = useState(false);
  const [modalIsOpen, SetModal] = useState(false);
  const closeModal = () => {
    SetModal(false);
  };
  const openModal = () => {
    SetModal(true);
  };
  useEffect(() => {
    props.SourceDashRecords();
    props.DashDetails();
  }, [])
  useEffect(() => {
    if (dash) {

      let dashlist = dash;
      setDash(dashlist);
      let active = dash.filter((e) => { return e.isActive })
      if (active.length > 0)
        setDefault(false)
      else
        setDefault(true)
    }
  }, [dash])

  const onSubmit = async (request) => {
    setLoading(true);
    var response = await fetch(query.updateDashboard(request))
    ActionUpdate(response, request, "Update", (e) => {
      closeModal();
      props.DashDetails();
    })
    setLoading(false);
  }
  const Activation = async (e, data) => {
    let isActive = false;
    if (e === "Activate") {
      isActive = true;
    }
    data.isActive = isActive;
    let source = [];
    try {
      source = data.sources.length > 0 ? data.sources.map((e) => { return e.source }) : [];
    }
    catch (e) { }
    data.sources = JSON.stringify(source)
    if(data.dashboardTitle === "Default" && e === "Activate"){
      data.id =1;
    }
    if(data.dashboardTitle === "Default" && e === "Deactive"){
      return false;
    }
    var response = await fetch(query.updateDashboard(data))
    ActionUpdate(response, data, "Update", (e) => {
      props.DashDetails();
    })

  }
  const DeleteDash = async (e) => {
    if (window.confirm("Are you sure want to delete?")) {

      var response = await fetch(query.deleteDashboard(e))
      ActionUpdate(response, e, "Delete", (e) => {
        props.DashDetails();
      })

    }

  }
  const EditDash = (e) => {
    setData(e);
    openModal();
  }

  return (
    <Layout>
      <div className="ProfilePage page" >
        <TitleContainer
          name="User Profile"
          img={Images.Admin}
          onSearch={(text) => {

          }}
        />
        {userdata.isLoading ? <Loader /> :
          <div className="profiledetails">
            <div className="avatar">
              {IntialGen(user)}
            </div>
            <div className="profileinput-holder">
              <ProfileInput lable="User Name" img={Images.Admin} id="username"  value={user.username}/>
              <ProfileInput lable="Email address" img={Images.mail} id="email" value={user.email} />
            </div>

            <div className="themes">
              <div>
                <span>Permissions</span>
                <div className="permission">
                  <Table name="Permissions" />
                </div>
              </div>
              <span>Choose Your Dashboard Theme</span>
              <div className="DashHolder">
                <div className="DashList">
                  <div className="TitleContainer">
                    <div>Default</div>
                    <Button
                      class={`${defalutActive ? "addbtn btn deactive" : "addbtn btn"}`}
                      label={defalutActive ? "Deactive" : "Activate"}
                      onClick={() => {
                        Activation(defalutActive ? "Deactive" : "Activate", { dashboardTitle: "Default" })
                      }}
                    />
                  </div>
                </div>
                {dashlist.filter((dash)=> dash.dashboardTitle !== "Default").map((e, i) => {
                  return (
                    <div className="DashList" key={i}>
                      <div className="TitleContainer">
                        <div>{e.dashboardTitle}</div>
                        <Button
                          class={`${e.isActive ? "addbtn btn deactive" : "addbtn btn"}`}
                          label={e.isActive ? "Deactive" : "Activate"}
                          onClick={() => {
                            Activation(e.isActive ? "Deactive" : "Activate", e)
                          }}
                        />
                      </div>

                      <div className="Bottom" >
                        <img alt="" src={Images.RowEdit} onClick={() => { EditDash(e) }} />
                        <img alt="" src={Images.Delete} onClick={() => { DeleteDash(e) }} />
                      </div>
                    </div>
                  )
                })}
              </div>
             
            </div>

          </div>}

      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Create Dashboard"
      >
        <CreateDashboard
          closepop={() => {
            closeModal();
          }}
          onSubmit={(data) => {
            onSubmit(data)
          }}
          isLoading={isLoading}
          data={data}
          source={sourceList}
        />
      </Modal>
    </Layout>
  );
};

export default connect(
  null, { DashDetails, SourceDashRecords }
)(Profile);