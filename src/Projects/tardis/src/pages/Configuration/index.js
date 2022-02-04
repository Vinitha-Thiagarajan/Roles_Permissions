import React, { useEffect } from "react";
import { Images } from "../../assets/images";
import { TitleContainer, FolderWrapper } from "../../components";
import "./Configuration.scss";
import { useHistory } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { SourceType } from '../../../../../reducers/configuration/actions'
import Layout from '../../Layout';

const Configuration = ({ SourceType }) => {
  let history = useHistory();
  const userdata = useSelector(state => state.user);
  const {permission} = userdata;
  useEffect(() => {
    SourceType()
  }, [SourceType])

  const onPagenavigation = (page) => {
    if (page === "Source" && (permission.view && permission.view.indexOf("source")>-1)) {
      history.push("/tardis/source-configurations");
    }
    if (page === "SourceMap" && (permission.view && permission.view.indexOf("sourcemap")>-1)) {
      history.push("/tardis/source-map-configurations");
    }
    if (page === "Slack" && (permission.view && permission.view.indexOf("slacksubscription")>-1)) {
      history.push("/tardis/slack-integration");
    }
    if (page === "TestCase" && (permission.view && permission.view.indexOf("slacksubscription")>-1)) {
      history.push("/tardis/test-case-configurations")
    }
  }

  return (
    <Layout>
      <div className="Configuration-page page">
        <TitleContainer name="Configurations" img={Images.Settings} onSearch={(text) => {

        }} />
        <div className="quickaccess">
          <div className="titlequick">
            <span>Quick Access</span>
          </div>
          <div className={`folder-wrapper`}>
            <FolderWrapper
              titlename="Source Configuration"
              subname="Configuration"
              selection={permission.view ? permission.view.indexOf("source")>-1:true}
              img={Images.Settings}
              OnClick={() => { onPagenavigation("Source") }}
            />
            <FolderWrapper
              titlename="Map Configuration"
              subname="Configuration"
              selection={permission.view ? permission.view.indexOf("sourcemap")>-1:true}
              img={Images.map}
              OnClick={() => { onPagenavigation("SourceMap") }}
            />
            <FolderWrapper
              titlename="Slack Intergration"
              subname="Configuration"
              selection={permission.view ? permission.view.indexOf("slacksubscription")>-1:true}
              img={Images.slack}
              OnClick={() => { onPagenavigation("Slack") }}
            />
            <FolderWrapper
              titlename="Test Case Configuration"
              subname="Configuration"
              selection={true}
              img={Images.Settings}
              OnClick={() => { onPagenavigation("TestCase") }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default connect(
  null, { SourceType }
)(Configuration);