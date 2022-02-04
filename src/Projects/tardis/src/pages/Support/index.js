import React, { useState } from "react";
import "./Support.scss";
import { TextInput, Textarea, Button, TitleContainer } from "../../components";
import { Images } from "../../assets/images";
import { alert, vaildateEmail, vaildatePhoneNo } from '../../utils'
import Layout from '../../Layout';

const Support = props => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    queries: "",
    info: ""
  });
  const bgimage = {
    width: "50%",
    marginTop: 60,
    height: 400,
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${Images.SupportBG})`
  };
  const Submit = () => {
    if (data.name.length == 0) {
      alert("error", "Full Name is required!")
      return false;
    }
    if (data.email.length == 0) {
      alert("error", "Email is required!")
      return false;
    }
    else {
      let isvaild = vaildateEmail(data.email);
      if (!isvaild) {
        alert("error", "Email is Invalid!")
        return false;
      }
    }
    if (data.phone.length == 0) {
      alert("error", "Phone is required!")
      return false;
    }
    else {
      let isvaild = vaildatePhoneNo(data.phone);
      if (!isvaild) {
        alert("error", "Phone is Invalid!")
        return false;
      }
    }
    if (data.queries.length == 0) {
      alert("error", "Queries is required!")
      return false;
    }
  };

  return (
    <Layout>
      <div className="Support-page page">
        <TitleContainer name="Support Link" img={Images.Support}
          onSearch={(text) => {

          }} />
        <div className="centeralign">
          <div style={bgimage} />
          <div className="formcontainer">
            <img alt="" src={Images.supportform} className="formdesign" />
            <div className="heading">
              <h3>Need a help? Don't worry just Contact us</h3>
              <span>
                Please Indicate the nature of your Inquiry and fill in the form
                below
            </span>
            </div>
            <form id="supportform" className="support-container" autoComplete="off" >
              <div className="inputcontainer">
                <TextInput
                  lable="Full Name"
                  required={true}
                  OnChange={e => {
                    setData({ ...data, name: e });
                  }}
                />
                <TextInput
                  lable="Email"
                  required={true}
                  OnChange={e => {
                    setData({ ...data, email: e });
                  }}
                />
                <TextInput
                  lable="Phone"
                  required={true}
                  OnChange={e => {
                    setData({ ...data, phone: e });
                  }}
                />
                <TextInput
                  lable="Queries"
                  required={true}
                  OnChange={e => {
                    setData({ ...data, queries: e });
                  }}
                />
                <Textarea
                  lable="Additional Information"
                  required={false}
                  rows={13}
                  cols={22}
                  OnChange={e => {
                    setData({ ...data, info: e });
                  }}
                />
              </div>
            </form>
            <div className="btncontainer centeralign">
              <Button
                class="supportbtn"
                label="Request Information"
                onClick={() => {
                  Submit();
                }}
              />
              <span className="content">
                This site is protected by reCAPTCHA and the Google <br /> Privacy
              Policy and Terms of Service apply
            </span>
            </div>
            <div className="usermanual"><a href={process.env.REACT_APP_USER_MANUAL} target="_blank">Click here to view the user manual</a></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Support;
